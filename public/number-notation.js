/* Presentation only: never change source TeX, stored inputs, calculations or documents. */
if(progress.numberNotationDefaultVersion!==1){progress.numberNotation='scientific';progress.numberNotationDefaultVersion=1;saveProgress();}
function scientificNumbers(){return progress.numberNotation!=='decimal';}
function scientificLiteral(literal){
 const value=Number(literal);if(!Number.isFinite(value)||value===0)return literal;
 // Keep everyday operating values readable; scientific notation earns its space
 // only below 0.001 or at/above 10,000, irrespective of the physical unit.
 if(!needsScientificNotation(value))return literal;
 const sign=value<0?'-':'',parts=Math.abs(value).toExponential(4).split('e');
 return sign+parts[0].replace(/\.?0+$/,'')+String.raw`\times10^{${Number(parts[1])}}`;
}
function needsScientificNotation(value){const size=Math.abs(Number(value));return Number.isFinite(size)&&size!==0&&(size<.001||size>=10000);}
function isQuantitativeLiteral(literal){return needsScientificNotation(literal);}
function numberNotationTex(source){
 if(!scientificNumbers())return source;
 const held=[];const hold=x=>{held.push(x);return `NNHOLD${held.length-1}NN`;};
 // Protect unit/word bodies and annotation metadata. Preserve powers and indices.
 function groupEnd(s,start){let depth=0;for(let i=start;i<s.length;i++){if(s[i]==='{')depth++;if(s[i]==='}'&&!--depth)return i+1;}return s.length;}
 let protectedSource='';for(let i=0;i<source.length;){
  const command=source.slice(i).match(/^\\(?:mathrm|text|operatorname|htmlData|begin|end)\{/);
  if(command){const end=groupEnd(source,i+command[0].length-1);protectedSource+=hold(source.slice(i,end));i=end;continue;}
  if(source[i]==='^'||source[i]==='_'){let end=i+1;if(source[end]==='{')end=groupEnd(source,end);else if(source[end]==='\\'){const macro=source.slice(end).match(/^\\[A-Za-z]+/);end+=macro?.[0].length||1;if(source[end]==='{')end=groupEnd(source,end);}else end++;protectedSource+=hold(source.slice(i,end));i=end;continue;}
  protectedSource+=source[i++];
 }
 protectedSource=protectedSource.replace(/NNHOLD\d+NN|\d+(?:\.\d+)?/g,(literal,offset,s)=>{
  if(literal.startsWith('NNHOLD'))return literal;
  if(/[A-Za-z]/.test(s[offset-1]||'')||/^(?:pt|em|ex|px)/.test(s.slice(offset+literal.length)))return literal;
  // A pre-existing mantissa ×10^p is already scientific; never nest it.
  const before=s.slice(0,offset).replace(/NNHOLD\d+NN/g,'').replace(/[{}]/g,''),after=s.slice(offset+literal.length).replace(/NNHOLD\d+NN/g,'').replace(/[{}]/g,'');
  if(literal==='10'&&/\\times\s*$/.test(before))return literal;
  if(/^\s*\\times\s*10/.test(after))return Number(literal).toFixed(4).replace(/\.?0+$/,'');
  if(!isQuantitativeLiteral(literal))return literal;
  return '{'+scientificLiteral(literal)+'}';
 });
 return protectedSource.replace(/NNHOLD(\d+)NN/g,(_,i)=>held[Number(i)]);
}
const beforeNumberNotationFormat=formatEquationTex;
formatEquationTex=function(source,display){return beforeNumberNotationFormat(numberNotationTex(source),display);};

const tooltipSymbols={
 'ṅ_A,out':String.raw`\dot{n}_{A,\mathrm{out}}`,'ṅ_A,in':String.raw`\dot{n}_{A,\mathrm{in}}`,'ṅ_B':String.raw`\dot{n}_B`,'ṅ_A':String.raw`\dot{n}_A`,'ṅB':String.raw`\dot{n}_B`,'ṅA':String.raw`\dot{n}_A`,
 'ṅₐ,out':String.raw`\dot{n}_{A,\mathrm{out}}`,'ṅᵦ':String.raw`\dot{n}_B`,'ṅₐ':String.raw`\dot{n}_A`,
 'T_ref':String.raw`T_{\mathrm{ref}}`,'y_out':String.raw`y_{\mathrm{out}}`,'y_in':String.raw`y_{\mathrm{in}}`,'y*':'y^*','d_t':'d_t','u₀':'u_0','F₀':'F_0','M̄':String.raw`\bar{M}`,'M_A':'M_A','M_B':'M_B','D_AB':'D_{AB}','N_A':'N_A','N_B':'N_B','K_y':'K_y',
 'Re':String.raw`\mathrm{Re}`,'Sc':String.raw`\mathrm{Sc}`,'Sh':String.raw`\mathrm{Sh}`,'ρ':String.raw`\rho`,'μ':String.raw`\mu`,'π':String.raw`\pi`,'η':String.raw`\eta`,'Δz':String.raw`\Delta z`,'Δy':String.raw`\Delta y`
};
function hoverNotationText(note,prose=false){
 const held=[],hold=t=>{held.push('\\('+t+'\\)');return `HVTOKEN${held.length-1}HV`;};
 let s=String(note||'').replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g,(_,a,b)=>hold(a??b));
 const exact=[
  ['ṅ_B √29/(π d_t F₀)',String.raw`\frac{\dot{n}_B\sqrt{29}}{\pi d_tF_0}`],['ṅ_B/[π d_t N_A (1−y)²]',String.raw`\frac{\dot{n}_B}{\pi d_tN_A(1-y)^2}`],
  ['y/(1−y)',String.raw`\frac{y}{1-y}`],['y/(1-y)',String.raw`\frac{y}{1-y}`],['y_out P',String.raw`y_{\mathrm{out}}P`],
  ['32y/[32y+29(1−y)]',String.raw`\frac{32y}{32y+29(1-y)}`],['32y + 29(1−y)',String.raw`32y+29(1-y)`],
  ['ln[(1−y)/(1−y*)]',String.raw`\ln\left(\frac{1-y}{1-y^*}\right)`],['ln(1−η)',String.raw`\ln(1-\eta)`],
  ['ρ u d_t/μ',String.raw`\frac{\rho u d_t}{\mu}`],['μ/(ρ D_AB)',String.raw`\frac{\mu}{\rho D_{AB}}`],['F d_t/(c D_AB)',String.raw`\frac{Fd_t}{cD_{AB}}`],
  ['P/(RT)',String.raw`\frac{P}{RT}`],['dz/dy',String.raw`\frac{\mathrm{d}z}{\mathrm{d}y}`],['dy/dz',String.raw`\frac{\mathrm{d}y}{\mathrm{d}z}`],['dy/ds',String.raw`\frac{\mathrm{d}y}{\mathrm{d}s}`]
 ];
 for(const [plain,tex] of exact)s=s.split(plain).join(hold(tex));
 s=s.replace(/\b(ln|[fFq])\((y|t|0)\)/g,(_,fn,arg)=>hold(`${fn==='ln'?'\\ln':fn}(${arg})`));
 // Keep compound expressions together before extracting individual symbols.
 const compounds=[
  ['(T/T_ref)^1.5',String.raw`\left(\frac{T}{T_{\mathrm{ref}}}\right)^{1.5}`],
  ['(T/298 K)^1.5',String.raw`\left(\frac{T}{298\,\mathrm{K}}\right)^{1.5}`],
  ['T/T_ref',String.raw`\frac{T}{T_{\mathrm{ref}}}`],
  ['(PD)_ref',String.raw`(PD)_{\mathrm{ref}}`],['(P D_AB)_ref',String.raw`(PD_{AB})_{\mathrm{ref}}`],
  ['u₀^(1−0.8)',String.raw`u_0^{1-0.8}`],['u₀^1',String.raw`u_0^1`],['u₀^0.8',String.raw`u_0^{0.8}`],
  ['(1−y)^−0.8',String.raw`(1-y)^{-0.8}`],['(1−y)^2',String.raw`(1-y)^2`],
  ['u₀/u_ref',String.raw`\frac{u_0}{u_{\mathrm{ref}}}`],['L/L_ref',String.raw`\frac{L}{L_{\mathrm{ref}}}`]
 ];
 for(const [plain,tex] of compounds)s=s.split(plain).join(hold(tex));
 const subs={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₐ':'A','ᵦ':'B','ᵢ':'i','ⱼ':'j','ₜ':'t'};
 s=s.replace(/([A-Za-z])([₀₁₂₃₄₅₆₇₈₉ₐᵦᵢⱼₜ]+)/g,(_,letter,index)=>hold(`${letter}_{${[...index].map(c=>subs[c]).join('')}}`));
 s=s.replace(/\b(Re|Sc|Sh|[A-Za-z])\^([+−-]?\d+(?:\.\d+)?)/g,(_,symbol,power)=>hold(`${tooltipSymbols[symbol]||symbol}^{${power.replace('−','-')}}`));
 s=s.replace(/(?:×|x)\s*10\^\{?([+-]?\d+)\}?/g,(_,power)=>hold(String.raw`\times10^{${power}}`));
 s=s.replace(/(?:1[−-]y(?:_out|_in)?|1[−-]η)(?:[²³])?/g,literal=>hold(literal.replace(/−/g,'-').replace(/_out/g,'_{\\mathrm{out}}').replace(/_in/g,'_{\\mathrm{in}}').replace(/η/g,'\\eta').replace(/²/g,'^2').replace(/³/g,'^3')));
 const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),keys=Object.keys(tooltipSymbols).sort((a,b)=>b.length-a.length);
 s=s.replace(new RegExp('(?<![A-Za-z])('+keys.map(escape).join('|')+')(?![A-Za-z])','g'),literal=>hold(tooltipSymbols[literal]));
 s=s.replace(/\b([A-Za-z])\^([+-]?[0-9]+(?:\.[0-9]+)?)/g,(_,letter,power)=>hold(`${letter}^{${power}}`));
 s=s.replace(/\b([A-Za-z]{1,3})_([A-Za-z]+(?:,[A-Za-z]+)?)/g,(_,letter,sub)=>hold(`${letter}_{\\mathrm{${sub}}}`));
 s=s.replace(/\b(dy|dz|ds)\b/g,word=>hold('\\mathrm{d}'+word[1]));
 s=s.replace(/\b([yxcPTFL])\b/g,letter=>hold(letter));
 s=polishMathText(s);
 if(!prose&&scientificNumbers())s=s.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g).map(part=>part.startsWith('\\(')||part.startsWith('\\[')?part:part.replace(/HVTOKEN\d+HV|\d+(?:\.\d+)?/g,(literal,offset)=>{
  if(literal.startsWith('HVTOKEN')||/[A-Za-z]/.test(part[offset-1]||'')||/(?:p\.|page|Chapter|chapter)\s*$/.test(part.slice(0,offset)))return literal;
  const next=part.slice(offset+literal.length).match(/^\s*HVTOKEN(\d+)HV/);if(next&&held[Number(next[1])]?.startsWith('\\(\\times10'))return Number(literal).toFixed(4).replace(/\.?0+$/,'');
  if(!isQuantitativeLiteral(literal))return literal;
  return hold(scientificLiteral(literal));
 })).join('');
 return s.replace(/HVTOKEN(\d+)HV/g,(_,i)=>held[Number(i)]);
}
function renderHoverNotation(container,note){
 container.replaceChildren();const text=hoverNotationText(note),rx=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;let last=0,m;
 while((m=rx.exec(text))){container.append(text.slice(last,m.index));const span=document.createElement('span');span.className='hover-math';try{katex.render(formatEquationTex(m[1]??m[2],false),span,{throwOnError:true,strict:'ignore',trust:false,displayMode:false,output:'htmlAndMathml'});}catch{span.textContent=m[1]??m[2];span.classList.add('hover-math-error');}container.append(span);last=rx.lastIndex;}container.append(text.slice(last));
}

function installNumberNotationControl(){const sizes=document.getElementById('readingSizes');if(!sizes||document.getElementById('numberNotationToggle'))return;const button=document.createElement('button');button.id='numberNotationToggle';button.type='button';button.className='number-notation-control';button.setAttribute('aria-label','Switch between automatic engineering number format and decimal notation');button.title='Automatic: retain ordinary decimals; use scientific notation below 0.001 or from 10,000, rounded to at most four mantissa decimal places. Display rounding never changes calculations.';sizes.after(button);function label(){button.textContent='Numbers: '+(scientificNumbers()?'automatic':'decimal');button.setAttribute('aria-pressed',String(scientificNumbers()));document.body.dataset.numberNotation=scientificNumbers()?'scientific':'decimal';}label();button.onclick=()=>{progress.numberNotation=scientificNumbers()?'decimal':'scientific';saveProgress();label();document.querySelectorAll('[data-tex]').forEach(el=>{delete el.dataset.typeset;});typesetMath(main);typesetMath(document.getElementById('studyDock'));refreshScientificProse(main);refreshScientificProse(document.getElementById('studyDock'));if(mathTip&&!mathTip.hidden&&mathTipAnchor)showMathTip(mathTipAnchor);scheduleMathFit();};}
const proseNumberSources=new WeakMap();
function refreshScientificProse(root){
 if(!root)return;
 const mode=scientificNumbers()?'scientific':'decimal';
 root.querySelectorAll('svg text').forEach(el=>{const original=el.dataset.originalQuantity??el.textContent.trim();if(!/^[+-]?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(original)||!isQuantitativeLiteral(original)||el.dataset.numberRenderedMode===mode)return;el.dataset.originalQuantity=original;el.dataset.numberRenderedMode=mode;const powers={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};el.textContent=scientificNumbers()?scientificLiteral(original).replace(/\\times10\^\{([^}]+)\}/,(_,exponent)=>' × 10'+[...exponent].map(c=>powers[c]).join('')):original;});
 root.querySelectorAll('.scientific-prose-number').forEach(el=>{const original=proseNumberSources.get(el)||el.dataset.originalNumber;if(!original||el.dataset.numberRenderedMode===mode)return;el.dataset.numberRenderedMode=mode;el.replaceChildren();if(scientificNumbers())katex.render(scientificLiteral(original),el,{throwOnError:false,strict:'ignore',trust:false});else el.textContent=original;});
 root.querySelectorAll('[data-original-mantissa]').forEach(el=>{const n=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE);if(n)n.nodeValue=scientificNumbers()?Number(el.dataset.originalMantissa).toFixed(4).replace(/\.?0+$/,''):el.dataset.originalMantissa;});
 if(!scientificNumbers())return;
 const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){const p=n.parentElement;return p?.closest('p,li,td,figcaption,strong,output')&&!p.closest('.katex,[data-tex],.scientific-prose-number,.equation-source,svg,button,a,code,pre,select,textarea,time,.sidebar,.reading-legend,.master-reason-line,.eyebrow')&&/\d/.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}}),nodes=[];while(walk.nextNode())nodes.push(walk.currentNode);
 for(const n of nodes){const raw=n.nodeValue,origin=n.parentElement.closest('.value-origin'),previous=origin?.previousSibling?.textContent||'',following=(origin?.nextSibling?.textContent||'')+(origin?.nextSibling?.nextSibling?.textContent||'')+(origin?.nextSibling?.nextSibling?.nextSibling?.textContent||'');
  if(origin&&/^\s*[×x]\s*10[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/.test(following)){if(Number.isFinite(Number(raw))){origin.dataset.originalMantissa??=raw;n.nodeValue=Number(raw).toFixed(4).replace(/\.?0+$/,'');}continue;}if(origin&&raw==='10'&&/[×x]\s*$/.test(previous)&&/^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/.test(following))continue;
  const rx=/\d+\.\d+(?:e[+-]?\d+)?|\d{2,}/g,frag=document.createDocumentFragment();let last=0,m;
  while((m=rx.exec(raw))){const before=raw.slice(0,m.index),after=raw.slice(m.index+m[0].length);if(/(?:page|p\.|Step|step|Chapter|chapter|October|November|December|edition|intervals?\s*=?)\s*$/.test(before)||/^[/:–-]\d|^\s*(?:AM|PM|intervals|rows|points|exercise|questions|minutes|seconds|px)/.test(after)||/^\d{4}$/.test(m[0])&&Number(m[0])>=1900&&Number(m[0])<=2100||/^\s*[×x]\s*10/.test(after)||/[×x]\s*$/.test(before))continue;
   frag.append(raw.slice(last,m.index));const el=document.createElement('span');el.className='scientific-prose-number';el.dataset.originalNumber=m[0];el.dataset.numberRenderedMode=mode;proseNumberSources.set(el,m[0]);katex.render(scientificLiteral(m[0]),el,{throwOnError:false,strict:'ignore',trust:false});frag.append(el);last=rx.lastIndex;
  }if(last){frag.append(raw.slice(last));n.replaceWith(frag);}
 }
}
const beforeNotationTypeset=typesetMath;
typesetMath=function(root=document.getElementById('main')){beforeNotationTypeset(root);installNumberNotationControl();refreshScientificProse(root);};
installNumberNotationControl();
