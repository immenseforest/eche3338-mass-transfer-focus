/* Keep the question and the solution sequence visible in separate scroll panes. */
function installMasterWorkspace(){
 const main=document.getElementById('main');if(!document.querySelector('.master-diagram')||main.querySelector('.master-workspace'))return;
 const brief=main.querySelector('.master-diagram').closest('section'),steps=[];for(let el=brief.nextElementSibling;el;el=el.nextElementSibling)steps.push(el);
 const workspace=document.createElement('div');workspace.className='master-workspace';
 const question=document.createElement('section');question.className='master-question-pane';question.setAttribute('aria-label','Question and given values');question.tabIndex=0;
 const sequence=document.createElement('section');sequence.className='master-steps-pane';sequence.setAttribute('aria-label','Scrollable derivation steps');sequence.tabIndex=0;
 question.innerHTML='<div class="master-pane-label">Question & given values</div>';sequence.innerHTML='<div class="master-pane-label">Worked steps · scroll this pane</div>';
 brief.before(workspace);workspace.append(question,sequence);question.append(brief);sequence.append(...steps);
 const actions=brief.querySelector('.master-actions');if(actions)sequence.querySelector('.master-pane-label').append(actions);
 if(typeof scheduleMathFit==='function')scheduleMathFit();
}
function installStudyNavigation(){
 const sidebar=document.querySelector('body > .sidebar');if(!sidebar||sidebar.dataset.organised)return;sidebar.dataset.organised='true';sidebar.id='studyNavigation';
 const nav=sidebar.querySelector('nav'),links=new Map([...nav.querySelectorAll('a')].map(a=>[a.hash.slice(1),a]));
 const groups=[['Study foundations',['today','case','learn','lab']],['After Oct 6 lecture',['oct6','judgment','masterproblem','mastery','fluxpractice','engineer']],['Reference & revision',['practice','quantitywiki','formulas','realworld']],['Sources & app',['evidence','source','changelog']]];
 nav.replaceChildren();nav.setAttribute('aria-label','Study index by category');
 for(const [title,routes] of groups){const group=document.createElement('details');group.className='sidebar-category';group.open=true;const summary=document.createElement('summary');summary.textContent=title;group.append(summary);for(const route of routes){const a=links.get(route);if(a){if(title==='After Oct 6 lecture'){a.classList.add('post-lecture');a.title='Added after the October 6 lecture';}group.append(a);links.delete(route);}}nav.append(group);}
 for(const a of links.values())nav.append(a);
 const controls=document.createElement('div');controls.className='sidebar-controls';controls.innerHTML='<button id="sidebarPin" type="button" title="Pinned keeps navigation visible. Unpinned opens it from Menu."></button><button id="sidebarClose" type="button" aria-label="Close navigation">Close ×</button>';sidebar.prepend(controls);
 const menu=document.createElement('button');menu.className='nav-menu-trigger';menu.type='button';menu.textContent='☰ Menu';menu.setAttribute('aria-controls','studyNavigation');document.body.append(menu);
 const shade=document.createElement('div');shade.className='nav-backdrop';shade.hidden=true;document.body.append(shade);
 const pin=controls.querySelector('#sidebarPin'),close=controls.querySelector('#sidebarClose'),desktop=matchMedia('(min-width:761px)');let drawer=false;
 function update(){const pinned=desktop.matches&&progress.sidebarPinned!==false;document.body.classList.toggle('nav-unpinned',!pinned);document.body.classList.toggle('nav-drawer-open',!pinned&&drawer);pin.textContent=progress.sidebarPinned===false?'Pin sidebar':'Unpin sidebar';pin.setAttribute('aria-pressed',String(progress.sidebarPinned!==false));menu.hidden=pinned;menu.setAttribute('aria-expanded',String(!pinned&&drawer));close.hidden=pinned;shade.hidden=pinned||!drawer;sidebar.inert=!pinned&&!drawer;}
 menu.onclick=()=>{drawer=!drawer;update();if(drawer)pin.focus();};pin.onclick=()=>{progress.sidebarPinned=progress.sidebarPinned===false;saveProgress();drawer=progress.sidebarPinned!==false;update();if(!drawer)menu.focus();};
 function dismiss(){drawer=false;update();menu.focus();}close.onclick=dismiss;shade.onclick=dismiss;
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer&&!menu.hidden)dismiss();});
 nav.addEventListener('click',e=>{if(e.target.closest('a')&&!menu.hidden){drawer=false;update();}});
 function revealActive(){const route=location.hash.slice(1).split('/')[0]||'today';nav.querySelector(`a[href="#${route}"]`)?.closest('details')?.setAttribute('open','');}
 window.addEventListener('hashchange',revealActive);desktop.addEventListener('change',()=>{drawer=false;update();});update();revealActive();
}
installStudyNavigation();
document.getElementById('studyNavToggle')?.remove();
document.querySelector('#studyNavigation nav')?.classList.add('nav-expanded');
