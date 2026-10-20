// Note personali: appunti liberi (titolo + testo), salvati solo in questo browser (localStorage, chiave "note").
// Nessun dato esce dal dispositivo: il sito è pubblico, le note no. Funzionano offline come il resto dell'app.
// Da un caso clinico si arriva con note.html?caso=<id>: si vedono solo le note di quel caso e le nuove vi restano collegate.
// Indirizzi: note.html (elenco), note.html#<id> (una nota aperta).
const KEY='note';
const nav=document.getElementById('nav'),hero=document.getElementById('hero'),view=document.getElementById('view');
let N=load(),conf=false,q='',daElenco=false;
const P=new URLSearchParams(location.search),CASO=typeof CASI!=='undefined'&&CASI.find(c=>c.id===P.get('caso'))||null;
let soloCaso=!!CASO;

function h(tag,a,kids){const e=document.createElement(tag);if(a)for(const k in a){const v=a[k];if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)e.setAttribute(k,v===true?'':v)}(kids||[]).forEach(c=>{if(c!=null)e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function toast(m){document.querySelectorAll('.toast').forEach(x=>x.remove());const t=h('div',{class:'toast',role:'status',text:m});document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
function load(){let o=null;try{o=JSON.parse(localStorage.getItem(KEY))}catch(e){}return Array.isArray(o)?o.filter(n=>n&&typeof n==='object'&&n.id):[]}
function save(){try{localStorage.setItem(KEY,JSON.stringify(N))}catch(e){toast('Spazio pieno: nota non salvata')}}
const vuota=n=>!(n.t||'').trim()&&!(n.x||'').trim();
const titolo=n=>(n.t||'').trim()||(n.x||'').trim().split('\n')[0].slice(0,60)||'Nota vuota';
const quando=ms=>{const d=new Date(ms),o=new Date();return d.toDateString()===o.toDateString()?'oggi '+d.toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'}):d.toLocaleDateString('it-IT',{day:'numeric',month:'short',year:d.getFullYear()===o.getFullYear()?undefined:'numeric'})};
// Le note lasciate vuote non restano nell'elenco
function pulisci(){const k=N.length;N=N.filter(n=>!vuota(n));if(N.length!==k)save()}

// ---- Elenco
function elenco(){pulisci();conf=false;daElenco=true;document.title='Note · Schede cliniche';
nav.innerHTML='';nav.appendChild(CASO?h('a',{class:'back',href:'casi.html#'+encodeURIComponent(CASO.id),'aria-label':'Torna al caso'},[h('i',{class:'bk'}),h('span',{class:'bl',text:'Caso'})])
 :h('a',{class:'back',href:'index.html','aria-label':'Torna alla home'},[h('i',{class:'bk'}),h('span',{class:'bl',text:'Home'})]));
hero.innerHTML='';hero.appendChild(h('div',{class:'ph',style:'--dc:#a16207'},[h('h1',{text:'Note'}),h('p',{text:N.length===1?'1 nota · salvata su questo dispositivo':N.length+' note · salvate su questo dispositivo'})]));
view.innerHTML='';const w=h('div',{class:'cv'});
const s=h('input',{type:'search',placeholder:'Cerca nelle note…','aria-label':'Cerca nelle note'});s.value=q;
s.addEventListener('input',()=>{q=s.value;righe()});w.appendChild(s);
if(CASO)w.appendChild(h('div',{class:'ccard nfil'},[h('span',{class:'hint',text:soloCaso?'Solo le note del caso «'+CASO.t+'».':'Tutte le note. Le nuove restano collegate al caso «'+CASO.t+'».'}),
 h('button',{class:'cbtn gs sm',type:'button',text:soloCaso?'Mostra tutte':'Solo questo caso',onclick:()=>{soloCaso=!soloCaso;elenco()}})]));
w.appendChild(h('button',{class:'cbtn',type:'button',text:'Nuova nota',onclick:nuova}));
const g=h('div',{class:'cv nl'});w.appendChild(g);
function righe(){g.innerHTML='';const t=norm(q).trim();
 const L=N.filter(n=>!soloCaso||(n.caso&&n.caso.id===CASO.id)).filter(n=>!t||norm(n.t+' '+n.x+' '+(n.caso?n.caso.t:'')).includes(t)).sort((a,b)=>b.m-a.m);
 if(!L.length){g.appendChild(h('p',{class:'hint',text:t?'Nessuna nota contiene «'+q.trim()+'».':N.length?'Nessuna nota per questo caso.':'Ancora nessuna nota. Tocca «Nuova nota» per scrivere un appunto: resta su questo dispositivo e funziona anche offline.'}));return}
 L.forEach(n=>{const anteprima=(n.t||'').trim()?(n.x||'').trim().replace(/\s+/g,' ').slice(0,140):(n.x||'').trim().split('\n').slice(1).join(' ').replace(/\s+/g,' ').slice(0,140);
  g.appendChild(h('a',{class:'ccard nr',href:'#'+encodeURIComponent(n.id)},[h('b',{text:titolo(n)}),anteprima?h('span',{class:'nx',text:anteprima}):null,
   h('span',{class:'hint',text:quando(n.m)+(n.caso?' · Caso: '+n.caso.t:'')})]))})}
righe();
if(N.length)w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Copia di sicurezza'}),
 h('p',{class:'hint',text:"Le note stanno solo in questo dispositivo: se cancelli i dati del sito o togli l'icona dalla schermata Home, si perdono. Ogni tanto copiale e incollale altrove (ad esempio in Note di iPhone o in una mail a te stesso)."}),
 h('button',{class:'cbtn gs',type:'button',text:'Copia tutte le note',onclick:copiaTutte})]));
view.appendChild(w)}

function nuova(){const n={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),t:'',x:'',m:Date.now()};
if(CASO)n.caso={id:CASO.id,t:CASO.t};N.push(n);save();
// pushState invece di cambiare l'hash: così la tastiera si apre subito anche su iPhone (il focus resta nel tocco)
try{history.pushState(null,'','#'+encodeURIComponent(n.id))}catch(e){}apri(n,true)}

// ---- Una nota
function apri(n,focus){conf=false;document.title=titolo(n)+' · Note';
nav.innerHTML='';nav.appendChild(h('a',{class:'back',href:'#','aria-label':"Torna all'elenco delle note",onclick:e=>{e.preventDefault();indietro()}},[h('i',{class:'bk'}),h('span',{class:'bl',text:'Note'})]));
hero.innerHTML='';view.innerHTML='';
const w=h('div',{class:'cv'});
const ti=h('input',{type:'text',class:'nti',placeholder:'Titolo','aria-label':'Titolo della nota'});ti.value=n.t||'';
const tx=h('textarea',{class:'ntx',placeholder:'Scrivi qui il tuo appunto…','aria-label':'Testo della nota'});tx.value=n.x||'';
const info=h('span',{class:'hint'});const agg=()=>{info.textContent='Modificata '+quando(n.m)+' · salvata da sola'};agg();
const cresci=()=>{tx.style.height='auto';tx.style.height=Math.max(220,tx.scrollHeight+2)+'px'};
const salva=()=>{n.t=ti.value;n.x=tx.value;n.m=Date.now();save();agg();document.title=titolo(n)+' · Note'};
ti.addEventListener('input',salva);tx.addEventListener('input',()=>{salva();cresci()});
w.appendChild(h('div',{class:'ccard'},[ti,tx,info,
 n.caso?h('a',{class:'cbtn gs sm',href:'casi.html#'+encodeURIComponent(n.caso.id),text:'Caso: '+n.caso.t}):null]));
const del=h('div',{class:'ccard'});
(function bottoni(){del.innerHTML='';
 if(conf==='del'){del.appendChild(h('p',{class:'hint',text:'La nota verrà cancellata da questo dispositivo e non si potrà recuperare.'}));
  del.appendChild(h('div',{class:'crow'},[h('button',{class:'cbtn wn',type:'button',text:'Sì, elimina',onclick:()=>{N=N.filter(x=>x.id!==n.id);save();toast('Nota eliminata');indietro()}}),
   h('button',{class:'cbtn gs',type:'button',text:'Annulla',onclick:()=>{conf=false;bottoni()}})]))}
 else del.appendChild(h('div',{class:'crow'},[h('button',{class:'cbtn',type:'button',text:'Fatto',onclick:indietro}),
  h('button',{class:'cbtn gs',type:'button',text:'Copia',onclick:()=>copia(titolo(n)+'\n\n'+(n.x||''))}),
  h('button',{class:'xb',type:'button',text:'Elimina nota',onclick:()=>{conf='del';bottoni()}})]))})();
w.appendChild(del);view.appendChild(w);
requestAnimationFrame(cresci);
if(focus)ti.focus()}

// Se si è arrivati alla nota dall'elenco si torna indietro nella cronologia (così il tasto Indietro del telefono resta coerente)
function indietro(){if(daElenco){history.back();return}try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}elenco();window.scrollTo(0,0)}

function copia(t){const ok=()=>toast('Copiato'),fb=()=>{const ta=h('textarea',{readonly:true,class:'ntx'});ta.value=t;view.appendChild(ta);ta.focus();ta.select();ta.setSelectionRange(0,t.length);toast('Testo selezionato: copialo a mano')};
if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(ok,fb);else fb()}
function copiaTutte(){copia(N.slice().sort((a,b)=>b.m-a.m).map(n=>'## '+titolo(n)+'\n'+quando(n.m)+(n.caso?' · Caso: '+n.caso.t:'')+'\n\n'+(n.x||'').trim()).join('\n\n----------\n\n'))}

function disegna(){const id=decodeURIComponent(location.hash.slice(1));const n=N.find(x=>x.id===id);if(n){apri(n);window.scrollTo(0,0)}else elenco()}
window.addEventListener('hashchange',disegna);
// Se la stessa pagina è aperta in un'altra scheda, rileggi le note quando cambiano
window.addEventListener('storage',e=>{if(e.key===KEY){N=load();if(!location.hash)elenco()}});
disegna();
