/* Keep navigation within reach and let each reference retain its own state. */
(()=>{
 const header=document.querySelector('.shell>header'),panes=dock.querySelector('.reader-panes');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const arrive=el=>{if(!motion.matches&&el)el.animate([{opacity:.65,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:160,easing:'ease-out'});};
 new ResizeObserver(()=>document.documentElement.style.setProperty('--pinned-toolbar-height',header.offsetHeight+'px')).observe(header);
 const visibility={book:progress.readerBookVisible!==false,notes:progress.readerNotesVisible!==false};
 const controls=document.createElement('div');controls.className='reader-visibility';controls.setAttribute('role','group');controls.setAttribute('aria-label','Reference panel visibility');
 controls.innerHTML='<button data-reader-visibility="book" aria-controls="readerBookPane"></button><button data-reader-visibility="notes" aria-controls="readerNotesPane"></button>';
 dock.querySelector('.reader-toolbar').append(controls);
 const empty=document.createElement('p');empty.className='reader-empty';empty.textContent='Both reference panels are hidden. Use Show textbook or Show notes above to bring one back.';panes.append(empty);
 const labels={book:'textbook',notes:'notes'};
 function applyVisibility(){
  for(const key of ['book','notes']){
   const pane=panes.querySelector(`[data-reader-pane="${key}"]`);pane.id=key==='book'?'readerBookPane':'readerNotesPane';pane.classList.toggle('reference-hidden',!visibility[key]);
   const button=controls.querySelector(`[data-reader-visibility="${key}"]`);button.textContent=(visibility[key]?'Hide ':'Show ')+labels[key];button.setAttribute('aria-expanded',String(visibility[key]));
  }
  const count=Number(visibility.book)+Number(visibility.notes);panes.dataset.visibleReferences=count;empty.hidden=count!==0||panes.classList.contains('show-calculation');
  if(!visibility[panes.dataset.mobilePane])panes.dataset.mobilePane=visibility.book?'book':'notes';
  if(typeof scheduleMathFit==='function')scheduleMathFit();
 }
 const originalSelect=selectReaderPane;
 selectReaderPane=function(key){if(key==='book'||key==='notes'){visibility[key]=true;progress[key==='book'?'readerBookVisible':'readerNotesVisible']=true;saveProgress();}originalSelect(key);applyVisibility();arrive(panes.querySelector(`[data-reader-pane="${key}"]`));};
 controls.addEventListener('click',e=>{const button=e.target.closest('[data-reader-visibility]');if(!button)return;const key=button.dataset.readerVisibility;visibility[key]=!visibility[key];progress[key==='book'?'readerBookVisible':'readerNotesVisible']=visibility[key];saveProgress();applyVisibility();if(visibility[key]){if(panes.classList.contains('show-calculation'))selectReaderPane(key);else{panes.dataset.mobilePane=key;arrive(panes.querySelector(`[data-reader-pane="${key}"]`));}}});
 applyVisibility();
 // Animate only deliberate navigation, never every math-render mutation.
 window.addEventListener('hashchange',()=>requestAnimationFrame(()=>arrive(document.getElementById('main'))));
 document.addEventListener('click',e=>{if(e.target.closest('[data-master-exercise]'))requestAnimationFrame(()=>arrive(document.getElementById('master-exercise-content')));});
 document.getElementById('studyToolbar').addEventListener('toggle',e=>{if(e.target.open)arrive(e.target.querySelector('.toolbar-controls'));});
})();
