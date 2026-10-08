/* Local KaTeX assets keep every equation available offline. */
const mathEscape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const math=(tex,display=false)=>`<span class="${display?'math-block':'math-inline'}" data-tex="${mathEscape(tex)}"></span>`;
const tex=String.raw;
const mathDefinitions={
 rho:'ρ (rho): mass density of the mixture; mass per unit volume.',
 mu:'μ (mu): dynamic viscosity; resistance to shearing motion.',
 delta:'δ (lowercase delta): thickness of the diffusion film.',
 Delta:'Δ (capital delta): a finite difference or change, such as the spreadsheet step Δz.',
 epsilon:'ε (epsilon): porosity, the fraction of material volume occupied by pores.',
 tau:'τ (tau): tortuosity factor; accounts for the winding diffusion path.',
 lambda:'λ (lambda): mean free path between molecular collisions.',
 sigma:'σ (sigma): molecular collision diameter in the diffusivity correlation.',
 Omega:'Ω (omega): dimensionless collision integral in the gas-diffusivity correlation.',
 pi:'π (pi): circumference divided by diameter, approximately 3.14159.',
 partial:'∂ (partial): a derivative with respect to one variable while holding the others fixed.',
 nabla:'∇ (nabla): spatial derivative operator. Its dot product with flux measures net outward transport per volume.',
 sum:'Σ (sigma): add the terms over all listed species.',
 integral:'∫ (integral): add infinitesimally small contributions between the lower and upper limits.',
 ln:'ln: natural logarithm, base e. Its argument must be positive and dimensionless. Excel uses LN().',
 nA:'Methanol (or species A) molar flow rate. The dot above n means amount per unit time, not multiplication.',
 nB:'Carrier B molar flow rate. It remains constant when B neither transfers nor reacts.',
 N:'N with subscript A: total molar flux of A through a stationary surface; amount per area per time.',
 D:'D with subscript AB: binary molecular diffusivity of species A and B; area per time.',
 Re:'Reynolds number: inertia relative to viscous effects; dimensionless.',
 Sc:'Schmidt number: momentum diffusivity relative to molecular diffusivity; dimensionless.',
 Sh:'Sherwood number: transfer coefficient relative to the molecular-diffusion scale; dimensionless.',
 M:'M with an overbar: mixture-average molecular weight.',
 star:'The star marks a composition in equilibrium with the other phase. In the wetted-tube example, it is the saturation ceiling.'
};
Object.assign(mathDefinitions,{
 varB:'B: species B, the second component. B is the non-transferring dry-air carrier in the classroom tube model, but it may move or transfer in other models.',
 varw:'w: mass fraction. Mass of one component divided by total mixture mass; dimensionless.',
 vary:'y: gas-phase mole fraction. Moles of the named component divided by total gas moles; dimensionless.',
 varx:'x: liquid-phase mole fraction. Moles of the named component divided by total liquid moles; dimensionless.',
 varQ:'Q: volumetric flow rate at the stated pressure and temperature; volume per unit time.',
 varG:'G: gas carrier molar flow rate when subscripted s; amount of carrier per time.',
 varc:'c: total molar concentration, amount of substance per volume. With a species subscript, c A means concentration of that species.',
 varP:'P: total pressure. Match its units to the gas constant or correlation; kPa and Pa differ by a factor of 1000.',
 varR:'R: universal gas constant. Its numerical value depends on the pressure, volume and mole units used.',
 varT:'T: absolute temperature in kelvin. Convert degrees Celsius by adding 273.15.',
 varM:'M: molar mass (molecular weight). With a species subscript, use that species; with a bar, use the mixture average.',
 varu:'u: bulk flow speed, usually metres per second. It is not the molecular diffusivity.',
 varF:'F: the molar coefficient multiplying the logarithmic driving force for stagnant carrier B here. Units: amount per area per time.',
 vard:'d: a differential when attached to a changing variable (dy, dz, dt); diameter when used as the geometric variable d. The equation determines which.',
 varz:'z: position along the tube or diffusion direction, in metres.',
 varY:'Y: gas solute-to-carrier mole ratio, y/(1−y). The denominator excludes the solute.',
 varX:'X: liquid solute-to-carrier mole ratio, x/(1−x). It differs from mole fraction x.',
 varL:'L: liquid molar flow in the balance; subscript s specifies carrier-only flow. Check the stream definition.',
 varN:'N: number of ideal stages in the Kremser relation; with a species subscript such as N A, total molar flux. These are different quantities.',
 varA:'A: absorption factor Ls/(m Vs) in the stage equation; an area when explicitly labelled as a surface. As a subscript, A identifies a species.',
 varD:'D: molecular diffusivity, area per time; the subscript identifies the diffusing species pair.',
 varr:'r: radius in spherical geometry; with a species subscript in the continuity equation, net generation per volume per time. A labelled balance residual is a separate use.',
 vart:'t: elapsed time, usually seconds.',
 varm:'m: equilibrium slope in y*=mx; dimensionless when both axes are mole fractions. Upright m in a unit means metre instead.',
 varp:'p: partial pressure of a component. A species subscript identifies which component.',
 vark:'k: individual mass-transfer coefficient. Its subscript specifies the driving-force basis; units must match that definition.',
 varK:'K: overall transfer coefficient when used as a variable. Upright K in units means kelvin.',
 varH:'H: Henry constant in the stated convention. In p=Hx it has pressure units.',
 varV:'V: gas molar flow in the balance; subscript s specifies carrier-only flow.',
 vari:'i: component or interface label, depending on the equation. In a composition sum it identifies the selected species.',
 varj:'j: summation index over components, or row index in a spreadsheet recurrence.',
 varJ:'J: diffusive molar flux relative to the molar-average motion of the mixture.',
 vare:'e: base of the natural exponential, approximately 2.71828.'
});
function decorateMath(s,element){
 const tokens=[[/\\dot\{n\}_(?:A(?![A-Za-z0-9])|\{A(?:,j)?\})/g,'nA'],[/\\dot\{n\}_(?:B(?![A-Za-z0-9])|\{B\})/g,'nB'],[/\\bar\{M\}/g,'M'],[/N_(?:A(?![A-Za-z0-9])|\{A(?:,j)?\})/g,'N'],[/D_\{AB\}/g,'D'],[/y\^\*/g,'star'],[/\\mathrm\{(Re|Sc|Sh)\}/g,null],[/\\(rho|mu|delta|Delta|epsilon|tau|lambda|sigma|Omega|pi|partial|nabla|sum|int|ln)(?![A-Za-z])/g,null]];
 const held=[];
 if(typeof unitTexMap!=='undefined')s=s.replace(/\\mathrm\{((?:[^{}]|\{[^{}]*\})*)\}/g,(whole,body)=>{const key=unitTexMap[unitTexKey(body)];if(!key)return whole;held.push(`\\htmlData{unit=${key}}{${whole}}`);return `ZZTOKEN${held.length-1}ZZ`;});
 for(const [re,key] of tokens)s=s.replace(re,(whole,k)=>{let id=key||({int:'integral'}[k]||k);held.push(`\\htmlData{symbol=${id}}{${whole}}`);return `ZZTOKEN${held.length-1}ZZ`;});
 s=s.replace(/\\begin\{array\}\{[^{}]*\}|\\(?:text|mathrm|operatorname)\{[^{}]*\}/g,whole=>{held.push(whole);return `ZZTOKEN${held.length-1}ZZ`;});
 if(typeof decorateMasterValues==='function')s=decorateMasterValues(s,element,held);
 s=s.replace(/([_^])(ZZTOKEN\d+ZZ)/g,'$1{$2}').replace(/([_^])(?!ZZTOKEN)([A-Za-z0-9])/g,'$1{$2}');
 s=s.replace(/ZZTOKEN\d+ZZ|\\[A-Za-z]+|[A-Za-z]+/g,word=>{
  if(word.startsWith('ZZTOKEN')||word.startsWith('\\')||['pt','em','ex'].includes(word)||word.length>3||![...word].every(c=>mathDefinitions['var'+c]))return word;
  return [...word].map(c=>{held.push(`\\htmlData{symbol=var${c}}{${c}}`);return `ZZTOKEN${held.length-1}ZZ`;}).join('');
 });
 return s.replace(/ZZTOKEN(\d+)ZZ/g,(_,i)=>held[+i]);
}
function typesetMath(root=document.getElementById('main')){
 if(!root)return;
 const nodes=[];const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){return n.parentElement?.closest('.katex,[data-tex],.lessonlist,code,pre,textarea,script,style,svg,option')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});
 while(walk.nextNode()){
  const n=walk.currentNode;
  if(typeof polishMathText==='function'){const next=polishMathText(n.nodeValue);if(next!==n.nodeValue)n.nodeValue=next;}
  if(/\\[([]/.test(n.nodeValue))nodes.push(n);
 }
 for(const n of nodes){const re=/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;let match,last=0,frag=document.createDocumentFragment();while((match=re.exec(n.nodeValue))){frag.append(n.nodeValue.slice(last,match.index));const e=document.createElement('span');e.className=match[2]!==undefined?'math-block':'math-inline';e.dataset.tex=match[1]??match[2];frag.append(e);last=re.lastIndex;}frag.append(n.nodeValue.slice(last));n.replaceWith(frag);}
 root.querySelectorAll('[data-tex]:not([data-typeset])').forEach(el=>{el.dataset.typeset='true';try{katex.render(typeof formatEquationTex==='function'?formatEquationTex(decorateMath(el.dataset.tex,el),el.classList.contains('math-block')):decorateMath(el.dataset.tex,el),el,{displayMode:el.classList.contains('math-block'),throwOnError:true,strict:'ignore',trust:ctx=>ctx.command==='\\htmlData',output:'htmlAndMathml'});}catch(e){el.classList.add('math-error');el.textContent=el.dataset.tex;console.error('Equation typesetting failed',e.message);}});
 // Some compound units are split across KaTeX atoms; label each upright unit too.
 root.querySelectorAll('.katex-html .mathrm').forEach(el=>{
  if(el.closest('[data-unit],[data-symbol]'))return;
  const key=unitTexMap[unitTexKey(el.textContent)]||({m:'m',s:'s',K:'K',mol:'mol',kmol:'kmol',kg:'kg',g:'g',kPa:'kPa',Pa:'Pa'}[el.textContent]);
  if(key){el.dataset.unit=key;}
 });
 // Label the actual subscript glyph, including glyphs inside whole-symbol annotations.
 root.querySelectorAll('.katex-html .msupsub .mord,sub').forEach(el=>{
  if(el.children.length||!['A','B','AB'].includes(el.textContent))return;
  const text=el.textContent;
  el.dataset.tip=text==='AB'?'Subscript AB: the pair of species A and B in a binary mixture.':text==='A'?'Subscript A: species A, the component being tracked. In the classroom tube, A is methanol. This is a label, not multiplication or the absorption factor.':'Subscript B: species B, the other component. In the classroom tube B is dry air, conserved because it does not transfer or react. B can transfer in other models.';
  el.tabIndex=0;el.classList.add('math-symbol');el.setAttribute('aria-label',el.dataset.tip);
 });
 root.querySelectorAll('abbr[title]').forEach(el=>{el.dataset.tip=el.title;el.removeAttribute('title');el.tabIndex=0;});
 root.querySelectorAll('.symbol[data-tip]').forEach(el=>{el.tabIndex=0;});
 root.querySelectorAll('[data-symbol]:not([tabindex])').forEach(el=>{let d=mathDefinitions[el.dataset.symbol];const expression=el.closest('[data-tex]')?.dataset.tex||'';
  if(el.dataset.symbol==='varm'&&/m_\{\\mathrm\{(?:CO|N|total)/.test(expression))d='m: mass of the labelled component or total mixture, in the mass units shown. Here m is mass, not an equilibrium slope.';
  if(el.dataset.symbol==='vari'&&/w_i|y_iM_i/.test(expression))d='i: the component being examined in this composition formula. The sum over j includes every component.';
  if(d){el.tabIndex=0;el.classList.add('math-symbol');el.setAttribute('aria-label',d);el.dataset.tip=d;}});
 root.querySelectorAll('[data-unit]:not([tabindex])').forEach(el=>{const d=unitDefinitions[el.dataset.unit]?.[1];if(d){el.tabIndex=0;el.classList.add('math-symbol','unit-tip');el.setAttribute('aria-label',d);el.dataset.tip=d;}});
 if(typeof installMasterValueTips==='function')installMasterValueTips(root);
}
let mathTip,mathTipAnchor,mathTipPinned=false;
const tipTarget=e=>e?.closest?.('[data-tip],abbr[title]');
function positionMathTip(el,point){if(!mathTip||mathTip.hidden)return;const rect=el.getBoundingClientRect(),x=point?.clientX??(rect.left+rect.width/2),y=point?.clientY??rect.top;const w=mathTip.offsetWidth,h=mathTip.offsetHeight;mathTip.style.left=Math.max(12,Math.min(innerWidth-w-12,x-w/2))+'px';mathTip.style.top=Math.max(12,y-h-16>=12?y-h-16:Math.min(innerHeight-h-12,(point?.clientY??rect.bottom)+20))+'px';}
function showMathTip(el,point){if(!el)return;if(!mathTip){mathTip=document.createElement('div');mathTip.id='math-tooltip';mathTip.setAttribute('role','tooltip');document.body.append(mathTip);}if(mathTipAnchor&&mathTipAnchor!==el)mathTipAnchor.removeAttribute('aria-describedby');mathTipAnchor=el;const note=el.dataset.tip||el.getAttribute('title');if(typeof renderHoverNotation==='function')renderHoverNotation(mathTip,note);else mathTip.textContent=note;mathTip.hidden=false;el.setAttribute('aria-describedby','math-tooltip');positionMathTip(el,point);}
function hideMathTip(){if(mathTip)mathTip.hidden=true;if(mathTipAnchor)mathTipAnchor.removeAttribute('aria-describedby');mathTipAnchor=null;mathTipPinned=false;}
document.addEventListener('pointerover',e=>{const el=tipTarget(e.target);if(el&&(!mathTipPinned||e.pointerType==='mouse')){mathTipPinned=false;showMathTip(el,e);}});
document.addEventListener('pointermove',e=>{const next=tipTarget(e.target);if(e.pointerType==='mouse'&&next&&next!==mathTipAnchor){mathTipPinned=false;showMathTip(next,e);}if(mathTipAnchor&&!mathTipPinned&&tipTarget(e.target)===mathTipAnchor)positionMathTip(mathTipAnchor,e);});
document.addEventListener('pointerout',e=>{if(!mathTipPinned&&tipTarget(e.target)&&tipTarget(e.relatedTarget)!==mathTipAnchor)hideMathTip();});
document.addEventListener('focusin',e=>{const el=tipTarget(e.target);if(el)showMathTip(el);});
document.addEventListener('focusout',()=>{if(!mathTipPinned)hideMathTip();});
document.addEventListener('click',e=>{const el=tipTarget(e.target);if(el){if(mathTipPinned&&mathTipAnchor===el){hideMathTip();return;}showMathTip(el,e.detail?e:undefined);mathTipPinned=true;}else hideMathTip();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideMathTip();if(['Enter',' '].includes(e.key)&&tipTarget(e.target)&&!e.target.closest('button,a,input,select,textarea')){e.preventDefault();showMathTip(tipTarget(e.target));mathTipPinned=true;}});
window.addEventListener('hashchange',hideMathTip);window.addEventListener('resize',hideMathTip);document.addEventListener('scroll',()=>{if(mathTipAnchor?.id==='presenceToggle'){hideMathTip();return;}if(!mathTipAnchor)return;const r=mathTipAnchor.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)hideMathTip();else positionMathTip(mathTipAnchor);},true);
let mathPending=false;
new MutationObserver(()=>{if(!mathPending){mathPending=true;queueMicrotask(()=>{mathPending=false;typesetMath();if(typeof scheduleMathFit==='function')scheduleMathFit();});}}).observe(document.getElementById('main'),{childList:true,subtree:true});
