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
function decorateMath(s){
 const tokens=[[/\\dot\{n\}_(?:A(?![A-Za-z0-9])|\{A(?:,j)?\})/g,'nA'],[/\\dot\{n\}_(?:B(?![A-Za-z0-9])|\{B\})/g,'nB'],[/\\bar\{M\}/g,'M'],[/N_(?:A(?![A-Za-z0-9])|\{A(?:,j)?\})/g,'N'],[/D_\{AB\}/g,'D'],[/y\^\*/g,'star'],[/\\mathrm\{(Re|Sc|Sh)\}/g,null],[/\\(rho|mu|delta|Delta|epsilon|tau|lambda|sigma|Omega|pi|partial|nabla|sum|int|ln)(?![A-Za-z])/g,null]];
 const held=[];
 if(typeof unitTexMap!=='undefined')s=s.replace(/\\mathrm\{((?:[^{}]|\{[^{}]*\})*)\}/g,(whole,body)=>{const key=unitTexMap[unitTexKey(body)];if(!key)return whole;held.push(`\\htmlData{unit=${key}}{${whole}}`);return `ZZTOKEN${held.length-1}ZZ`;});
 for(const [re,key] of tokens)s=s.replace(re,(whole,k)=>{let id=key||({int:'integral'}[k]||k);held.push(`\\htmlData{symbol=${id}}{${whole}}`);return `ZZTOKEN${held.length-1}ZZ`;});
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
 root.querySelectorAll('[data-tex]:not([data-typeset])').forEach(el=>{el.dataset.typeset='true';try{katex.render(decorateMath(el.dataset.tex),el,{displayMode:el.classList.contains('math-block'),throwOnError:true,strict:'ignore',trust:ctx=>ctx.command==='\\htmlData',output:'htmlAndMathml'});}catch(e){el.classList.add('math-error');el.textContent=el.dataset.tex;console.error('Equation typesetting failed',e.message);}});
 root.querySelectorAll('[data-symbol]:not([tabindex])').forEach(el=>{const d=mathDefinitions[el.dataset.symbol];if(d){el.tabIndex=0;el.classList.add('math-symbol');el.setAttribute('aria-label',d);el.dataset.tip=d;}});
 root.querySelectorAll('[data-unit]:not([tabindex])').forEach(el=>{const d=unitDefinitions[el.dataset.unit]?.[1];if(d){el.tabIndex=0;el.classList.add('math-symbol','unit-tip');el.setAttribute('aria-label',d);el.dataset.tip=d;}});
}
let mathTip;
function showMathTip(el){if(!el)return;if(!mathTip){mathTip=document.createElement('div');mathTip.id='math-tooltip';mathTip.setAttribute('role','tooltip');document.body.append(mathTip);}mathTip.textContent=el.dataset.tip;mathTip.hidden=false;el.setAttribute('aria-describedby','math-tooltip');}
function hideMathTip(){if(mathTip)mathTip.hidden=true;}
document.addEventListener('mouseover',e=>{const el=e.target.closest('.math-symbol');if(el)showMathTip(el);});
document.addEventListener('mouseout',e=>{if(e.target.closest('.math-symbol'))hideMathTip();});
document.addEventListener('focusin',e=>{if(e.target.matches('.math-symbol'))showMathTip(e.target);});
document.addEventListener('focusout',hideMathTip);
document.addEventListener('click',e=>{const el=e.target.closest('.math-symbol');if(el){el.focus();showMathTip(el);}else hideMathTip();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideMathTip();});
window.addEventListener('hashchange',hideMathTip);
let mathPending=false;
new MutationObserver(()=>{if(!mathPending){mathPending=true;queueMicrotask(()=>{mathPending=false;typesetMath();});}}).observe(document.getElementById('main'),{childList:true,subtree:true});
