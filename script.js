const toggle=document.querySelector('.menu-button'),panel=document.querySelector('.menu-panel');toggle?.addEventListener('click',()=>{let open=panel.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));toggle.querySelector('b').textContent=open?'×':'☰'});document.querySelectorAll('.menu-panel a').forEach(a=>a.addEventListener('click',()=>panel.classList.remove('open')));const tiles=[...document.querySelectorAll('[data-lightbox]')],lightbox=document.querySelector('.lightbox');let current=0;function show(n){current=(n+tiles.length)%tiles.length;const tile=tiles[current];lightbox.querySelector('img').src=tile.querySelector('img').src;lightbox.querySelector('img').alt=tile.querySelector('img').alt;lightbox.querySelector('figcaption').textContent=(tile.querySelector('.curated-caption')||tile.querySelector('span'))?.textContent.replace(' ↗','')||'';lightbox.classList.add('active');lightbox.setAttribute('aria-hidden','false')}function close(){lightbox.classList.remove('active');lightbox.setAttribute('aria-hidden','true')}tiles.forEach((t,i)=>t.addEventListener('click',()=>show(i)));lightbox?.querySelector('.lb-close').addEventListener('click',close);lightbox?.querySelector('.lb-prev').addEventListener('click',()=>show(current-1));lightbox?.querySelector('.lb-next').addEventListener('click',()=>show(current+1));lightbox?.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(!lightbox?.classList.contains('active'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1)});
/* Dismiss the side menu with Escape or an outside click. */
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&panel?.classList.contains('open')){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');toggle?.setAttribute('aria-expanded','false');toggle?.querySelector('b')&&(toggle.querySelector('b').textContent='☰');}});
document.addEventListener('click',event=>{if(panel?.classList.contains('open')&&!panel.contains(event.target)&&!toggle?.contains(event.target)){panel.classList.remove('open');panel.setAttribute('aria-hidden','true');toggle?.setAttribute('aria-expanded','false');toggle?.querySelector('b')&&(toggle.querySelector('b').textContent='☰');}});

/* Homepage three-photo coverflow, with clickable adjacent images */
(()=>{
 const stage=document.querySelector('.coverflow-stage');if(!stage)return;
 const photos=[
 ['unique_002.jpg','Walking together on the island'],
 ['unique_003.jpg','Spending time together outdoors'],
 ['unique_009.jpg','A lively evening with friends'],
 ['unique_012.jpg','Exploring Ikaria together'],
 ['unique_021.jpg','Sharing a meal'],
 ['unique_026.jpg','Enjoying food and conversation'],
 ['unique_029.jpg','A moment around the table'],
 ['unique_033.jpg','A shared meal in Ikaria'],
 ['unique_038.jpg','An afternoon together'],
 ['unique_042.jpg','Walking the trails'],
 ['unique_046.jpg','Preparing food together'],
 ['unique_048.jpg','Walking through the hills']
 ];
 let current=0;const cards=[...stage.querySelectorAll('.coverflow-card')];const caption=document.querySelector('.home-carousel-caption');
 function render(){
  [-1,0,1].forEach((offset,k)=>{
   const index=(current+offset+photos.length)%photos.length;const [file,desc]=photos[index];
   cards[k].querySelector('img').src='images/'+file;cards[k].querySelector('img').alt=desc;
   cards[k].setAttribute('aria-label',(offset===0?'Current photo: ':offset<0?'Previous photo: ':'Next photo: ')+desc);
   cards[k].setAttribute('aria-current',offset===0?'true':'false');
  });
  caption.textContent=String(current+1).padStart(2,'0')+' / '+photos.length+' · '+photos[current][1];
 }
 function move(delta){current=(current+delta+photos.length)%photos.length;render()}
 document.querySelector('.home-carousel-prev')?.addEventListener('click',()=>move(-1));
 document.querySelector('.home-carousel-next')?.addEventListener('click',()=>move(1));
 cards[0].addEventListener('click',()=>move(-1));cards[2].addEventListener('click',()=>move(1));
 cards[1].addEventListener('click',()=>move(1));
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}});
 render();
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let paused=motion.matches;
 const pause=document.createElement('button');pause.type='button';pause.className='carousel-autoplay-toggle';pause.textContent=paused?'Play slideshow':'Pause slideshow';pause.setAttribute('aria-label',pause.textContent);
 stage.parentElement.appendChild(pause);
 pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Play slideshow':'Pause slideshow';pause.setAttribute('aria-label',pause.textContent)});
 window.setInterval(()=>{if(!paused&&!document.hidden)move(1)},6000);
})();

// Automatic looping slideshows across all journal chapters.
document.querySelectorAll('.chapter-photo-carousel').forEach(carousel=>{
 const slides=[...carousel.querySelectorAll('.chapter-carousel-slide')];
 if(!slides.length)return;
 let current=0,paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const counter=carousel.querySelector('.chapter-carousel-counter');
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 function show(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.classList.toggle('is-active',n===current);s.setAttribute('aria-hidden',String(n!==current))});if(counter)counter.textContent=`${current+1} / ${slides.length}`;}
 carousel.querySelector('.prev')?.addEventListener('click',()=>show(current-1));
 carousel.querySelector('.next')?.addEventListener('click',()=>show(current+1));
 const toggle=document.createElement('button');toggle.type='button';toggle.className='carousel-autoplay-toggle';
 function label(){toggle.textContent=paused?'Play slideshow':'Pause slideshow';toggle.setAttribute('aria-label',toggle.textContent)}
 label();toggle.addEventListener('click',()=>{paused=!paused;label()});carousel.append(toggle);
 show(0);
 if(slides.length>1)window.setInterval(()=>{if(!paused&&!document.hidden)show(current+1)},6000);
});
