/* Fit the real typeset bounds rather than concealing overflowing notation. */
let mathFitFrame;
function scheduleMathFit(){cancelAnimationFrame(mathFitFrame);mathFitFrame=requestAnimationFrame(fitEquations);}
function fitEquations(){
 document.querySelectorAll('.math-block,.math-inline').forEach(el=>{
  if(!el.offsetWidth||!el.querySelector('.katex'))return;
  el.style.fontSize='';
  const display=el.classList.contains('math-block'),parent=el.parentElement;
  const style=getComputedStyle(el),base=parseFloat(style.fontSize);
  const available=(display?el.clientWidth:parent.clientWidth)-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight)-4;
  const content=el.querySelector(display?'.katex-display>.katex':'.katex');if(!content||available<=0)return;
  const natural=content.getBoundingClientRect().width;
  if(natural>available)el.style.fontSize=(base*available/natural*.98)+'px';
 });
}
const fitObserver=new ResizeObserver(scheduleMathFit);fitObserver.observe(document.getElementById('main'));fitObserver.observe(document.getElementById('studyDock'));
document.fonts.ready.then(scheduleMathFit);window.addEventListener('resize',scheduleMathFit);document.addEventListener('toggle',scheduleMathFit,true);
new MutationObserver(scheduleMathFit).observe(document.getElementById('studyDock'),{childList:true,subtree:true});

// A compact section picker replaces long sideways lesson strips on small panes.
function addLessonPicker(){const list=document.querySelector('.lessonlist');if(!list||list.previousElementSibling?.classList.contains('lesson-picker'))return;const label=document.createElement('label');label.className='lesson-picker';label.textContent='Guided topic';const select=document.createElement('select');select.setAttribute('aria-label','Guided topic');const id=location.hash.split('/')[1]||'flux';COURSE.lessons.forEach(l=>{const option=document.createElement('option');option.value=l.id;option.textContent='Ch '+l.ch+' · '+l.title;option.selected=l.id===id;select.append(option);});select.onchange=()=>location.hash='learn/'+select.value;label.append(select);list.before(label);}
new MutationObserver(()=>{addLessonPicker();scheduleMathFit();}).observe(document.getElementById('main'),{childList:true});
