/* Display preferences keep the original TeX and numerical models untouched. */
const equationNames={c:'concentration',R:'gas_constant',T:'temperature',P:'pressure',D:'diffusivity',D_AB:'diffusivity',y:'y',y_star:'y_wall',y_1:'y_1',y_2:'y_2',d:'diameter',d_t:'diameter',u:'velocity',mu:'viscosity',rho:'density',n_B:'air_molar_flow',n_A:'solute_molar_flow',M_A:'solute_molar_mass',M_B:'carrier_molar_mass',M_bar:'mixture_molar_mass',delta:'film_thickness'};
// A deliberately limited algebra parser: no execution and no guessed calculus conversion.
function excelAlgebra(source){
 if(/\\frac\s*\{d(?:[A-Za-z]|\\)/.test(source))throw Error('Derivative requires discretization');
 const names=new Map();let s=source.trim().replace(/\\(?:left|right|displaystyle|quad|qquad)\b/g,'').replace(/\\[,!; ]/g,'').replace(/\\(?:cdot|times)/g,'*');
 if(s.includes('=')&&!/\\(?:begin|int|sum|lim|approx)/.test(s))s=s.split('=')[1];
 if(/\\(?:int|sum|lim|partial|begin|approx|text|mathrm|underbrace|overbrace)|[<>]|\\\\/.test(s))throw Error('This derivation needs a worksheet or a numerical method.');
 let i=0;const peek=()=>s[i],space=()=>{while(/\s/.test(s[i]||'')&&i<s.length)i++;};
 function group(){space();if(peek()!=='{')throw Error('Expected a grouped argument');i++;const v=expr();space();if(peek()!=='}')throw Error('Unbalanced expression');i++;return v;}
 function suffix(){space();if(peek()==='{'){const start=++i;let depth=1;while(i<s.length&&depth){if(s[i]==='{')depth++;if(s[i]==='}')depth--;if(depth)i++;}const v=s.slice(start,i++).replace(/\\mathrm\{([^}]+)\}/g,'$1');if(!/^[A-Za-z0-9]+$/.test(v))throw Error('Unsupported subscript');return v;}if(!/[A-Za-z0-9*]/.test(peek()||''))throw Error('Unsupported subscript');return s[i++];}
 function atom(){space();let out,symbol=null;if(peek()==='+'||peek()==='-'){const op=s[i++];return op+atom();}if(peek()==='{')out=group();else if(peek()==='('){i++;out='('+expr()+')';if(peek()!==')')throw Error('Unbalanced brackets');i++;}else if(/[0-9.]/.test(peek()||'')){const m=s.slice(i).match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/);if(!m)throw Error('Invalid number');out=m[0];i+=out.length;}else if(peek()==='\\'){const m=s.slice(i).match(/^\\([A-Za-z]+)/);if(!m)throw Error('Unsupported notation');i+=m[0].length;const c=m[1];if(c==='frac'){const a=group(),b=group();out='(('+a+')/('+b+'))';}else if(c==='sqrt')out='SQRT('+group()+')';else if(['ln','exp','log'].includes(c)){space();if(peek()!=='('&&peek()!=='{')throw Error('Function needs brackets');out=({ln:'LN',exp:'EXP',log:'LOG10'}[c])+'('+atom()+')';}else if(c==='pi')out='PI()';else if(c==='dot'||c==='bar'){space();symbol=(peek()==='{'?suffix():s[i++]);if(c==='bar')symbol+='_bar';}else if(['rho','mu','delta','epsilon','alpha','beta'].includes(c))symbol=c;else throw Error('Unsupported notation');}else if(/^(Re|Sc|Sh)/.test(s.slice(i))){symbol=s.slice(i,i+2);i+=2;}else if(/[A-Za-z]/.test(peek()||''))symbol=s[i++];else throw Error('Unsupported expression');
 if(symbol!==null){if(peek()==='_'){i++;symbol+='_'+suffix();}if(s.slice(i,i+2)==='^*'){i+=2;symbol+='_star';}if(peek()==='('&&['f','F','u','rho','N_A','n_A'].includes(symbol))throw Error('Define the composition dependent function in the worksheet');const name=equationNames[symbol]||('v_'+symbol);names.set(name,symbol);out=name;}
 space();if(peek()==='^'){i++;const power=peek()==='{'?group():atom();out='('+out+')^('+power+')';}return out;}
 function product(){let v=atom();space();while(i<s.length&&!/[+\-)}]/.test(peek())){let op='*';if(peek()==='*'||peek()==='/')op=s[i++];v='('+v+op+atom()+')';space();}return v;}
 function expr(){let v=product();space();while(peek()==='+'||peek()==='-'){const op=s[i++];v+=op+product();space();}return v;}
 const formula='='+expr();space();if(i!==s.length)throw Error('Unsupported remainder');return{formula,names:[...names].map(([name,symbol])=>`${name} = ${symbol}`).join('; ')};
}
const equationViewPanels=new WeakMap();
function refreshEquationViews(root=document){
 const mode=progress.equationView||'rendered';document.body.dataset.equationView=mode;
 root.querySelectorAll('.math-block[data-tex]').forEach(el=>{
  let panel=equationViewPanels.get(el);if(!panel?.isConnected){panel=document.createElement('div');panel.className='equation-source';el.after(panel);equationViewPanels.set(el,panel);}
  panel.hidden=mode==='rendered';el.hidden=mode!=='rendered';
  if(mode==='rendered'||panel.dataset.mode===mode&&panel.dataset.source===el.dataset.tex)return;
  panel.dataset.mode=mode;panel.dataset.source=el.dataset.tex;panel.replaceChildren();
  const label=document.createElement('strong'),code=document.createElement('pre'),note=document.createElement('p');label.textContent=mode==='latex'?'LaTeX source':'Excel expression';
  let copyable=true;if(mode==='latex')code.textContent=el.dataset.tex;else{try{const result=excelAlgebra(el.dataset.tex);code.textContent=result.formula;note.textContent=result.names?'Create these named cells in Excel, using the units in the question: '+result.names+'. The expression returns the right-hand side.':'Numerical expression; use the units and assumptions in the question.';}catch{copyable=false;code.textContent='A direct Excel expression is not available for this step.';note.textContent='For integrals, derivatives, multi-line systems or units in the arithmetic, use the classroom Excel worksheet. The original notation is below.';const original=document.createElement('pre');original.textContent=el.dataset.tex;panel.append(original);}}
  panel.prepend(label,code,note);if(copyable){const copy=document.createElement('button');copy.type='button';copy.textContent='Copy';copy.onclick=async()=>{try{await navigator.clipboard.writeText(code.textContent);copy.textContent='Copied';}catch{copy.textContent='Select the text above to copy';}};panel.append(copy);}else{const link=document.createElement('button');link.textContent='Open Excel walkthrough';link.onclick=()=>{caseTab='excel';if(location.hash==='#case')render();else location.hash='case';};panel.append(link);}
 });
}
function installReadingControls(){
 const controls=document.querySelector('.sidebar-controls');if(!controls||document.getElementById('readingSizes'))return;
 const sizes=document.createElement('div');sizes.id='readingSizes';sizes.className='reading-size-controls';sizes.setAttribute('role','group');sizes.setAttribute('aria-label','Text size');
 ['Compact','Standard','Large'].forEach((name,index)=>{const b=document.createElement('button');b.type='button';b.innerHTML=`<span aria-hidden="true" style="font-size:${11+index*3}px">A</span>`;b.title=name+' text';b.setAttribute('aria-label',name+' text');b.dataset.size=['compact','standard','large'][index];b.onclick=()=>{progress.textSize=b.dataset.size;saveProgress();applySizes();};sizes.append(b);});
 const label=document.createElement('label');label.className='equation-mode-control';label.innerHTML='<span>Equations</span><select id="equationView" aria-label="Equation view"><option value="rendered">ƒ Rendered</option><option value="latex">{ } LaTeX</option><option value="excel">▦ Excel</option></select>';
 controls.append(sizes,label);const select=label.querySelector('select');select.value=progress.equationView||'rendered';select.onchange=()=>{progress.equationView=select.value;saveProgress();refreshEquationViews();if(typeof scheduleMathFit==='function')scheduleMathFit();};
 function applySizes(){document.body.dataset.textSize=progress.textSize||'standard';sizes.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.size===document.body.dataset.textSize)));if(typeof scheduleMathFit==='function')scheduleMathFit();}applySizes();
 let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;refreshEquationViews();});}).observe(document.getElementById('main'),{childList:true,subtree:true});
 refreshEquationViews();
}
function polishStudyLayout(){
 document.getElementById('studyNavToggle')?.remove();
 const figure=document.querySelector('.master-diagram');if(figure&&!figure.querySelector('.enlarge-master')){const button=document.createElement('button');button.className='enlarge-master';button.textContent='Enlarge diagram ↗';button.onclick=()=>{const dialog=document.createElement('dialog');dialog.className='diagram-dialog';const close=document.createElement('button');close.textContent='Close ×';close.onclick=()=>dialog.close();const diagram=figure.querySelector('svg').cloneNode(true);diagram.querySelectorAll('[id]').forEach(e=>e.id+='-expanded');diagram.querySelectorAll('[marker-end]').forEach(e=>e.setAttribute('marker-end','url(#master-arrow-expanded)'));diagram.setAttribute('aria-labelledby','master-diagram-title-expanded master-diagram-desc-expanded');dialog.append(close,diagram);document.body.append(dialog);dialog.addEventListener('close',()=>dialog.remove());dialog.showModal();};figure.querySelector('svg').after(button);}
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.getElementById('main').animate([{opacity:.5,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'});
 refreshEquationViews();
}
installReadingControls();
