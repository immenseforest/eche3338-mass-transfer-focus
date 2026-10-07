// Cursor zoom is local to each rendered page; normal wheel scrolling is preserved.
for(const id of ['bookScroll','notesScroll']){
 const scroll=document.getElementById(id);
 const hint=document.createElement('p');hint.className='reader-zoom-hint';hint.textContent='Ctrl + wheel to zoom at cursor · Double-click to fit';scroll.before(hint);
 function zoomAt(event,reset=false){
  const media=event.target.closest('.reader-document > canvas,.reader-document > img');if(!media)return;
  const box=media.getBoundingClientRect(),area=scroll.getBoundingClientRect();
  if(!box.width||!box.height)return;
  event.preventDefault();
  const old=Number(media.dataset.cursorZoom||1),next=reset?1:Math.max(1,Math.min(4,old*Math.exp(-event.deltaY*.002)));
  const baseWidth=Number(media.dataset.baseWidth||box.width),baseHeight=Number(media.dataset.baseHeight||box.height);
  media.dataset.baseWidth=baseWidth;media.dataset.baseHeight=baseHeight;media.dataset.cursorZoom=next;
  const x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;
  media.style.width=baseWidth*next+'px';media.style.height=baseHeight*next+'px';media.style.marginLeft='0';media.style.marginRight='0';
  const moved=media.getBoundingClientRect();
  scroll.scrollLeft+=moved.left+x*moved.width-event.clientX;
  scroll.scrollTop+=moved.top+y*moved.height-event.clientY;
  if(reset){scroll.scrollLeft=0;scroll.scrollTop=0;}
 }
 scroll.addEventListener('wheel',e=>{if(e.ctrlKey)zoomAt(e);},{passive:false});
 scroll.addEventListener('dblclick',e=>zoomAt(e,true));
}
// Drive previews use Google's viewer, without importing files or requesting account access.
const drivePanel=document.createElement('details');drivePanel.className='drive-reader';
drivePanel.innerHTML='<summary>Google Drive file</summary><label>Drive file link<input type="url" placeholder="https://drive.google.com/file/d/…/view" aria-label="Google Drive file link"></label><button type="button">Preview Drive file</button><p role="status">Paste a PDF or image file link. Google controls access. For local page controls and cursor zoom, download the file from Drive and choose it above.</p><div class="drive-preview"></div>';
document.getElementById('bookUpload').closest('label').after(drivePanel);
drivePanel.querySelector('button').onclick=()=>{
 const status=drivePanel.querySelector('[role=status]'),preview=drivePanel.querySelector('.drive-preview');
 try{
  const url=new URL(drivePanel.querySelector('input').value.trim());
  if(url.protocol!=='https:'||url.hostname!=='drive.google.com')throw Error();
  const id=url.pathname.match(/^\/file\/d\/([\w-]+)/)?.[1]||url.searchParams.get('id');
  if(!id||! /^[\w-]{10,}$/.test(id))throw Error();
  const base=new URL('https://drive.google.com/file/d/'+id+'/');
  const key=url.searchParams.get('resourcekey');
  const frame=document.createElement('iframe');const embed=new URL('preview',base);if(key)embed.searchParams.set('resourcekey',key);
  frame.src=embed.href;frame.title='Google Drive document preview';frame.referrerPolicy='no-referrer';
  const link=document.createElement('a');const view=new URL('view',base);if(key)view.searchParams.set('resourcekey',key);link.href=view.href;link.target='_blank';link.rel='noopener';link.textContent='Open in Google Drive';
  const close=document.createElement('button');close.textContent='Close preview';close.onclick=()=>preview.replaceChildren();
  preview.replaceChildren(link,document.createTextNode(' '),close,frame);
  status.textContent='Use the Google viewer controls to zoom. If access or sign-in fails here, open in Google Drive. This preview does not use the textbook page mapping.';
 }catch{status.textContent='Enter a valid HTTPS drive.google.com file link.';preview.replaceChildren();}
};
