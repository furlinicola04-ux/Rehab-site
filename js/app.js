// Fine della preparazione dati: svuota le schede di base, ormai fuse nelle schede finali.
OLD.length=0;

const DC={
Spalla:{c:'#2563eb',e:'Sp',l:'Spalla',t:'Instabilità, cuffia, AC, capsulite, protesi e fratture'},
Gomito:{c:'#7c3aed',e:'Go',l:'Gomito',t:'Traumi, rigidità, epicondilalgia ed epitrocleite'},
Mano:{c:'#0e7490',e:'Ma',l:'Mano e polso',t:'Fratture, legamenti, TFCC, Dupuytren, rizoartrosi'},
Anca:{c:'#dc2626',e:'An',l:'Anca',t:'Coxartrosi e protesi, FAI, fratture di femore, dolore laterale'},
Ginocchio:{c:'#047857',e:'Gi',l:'Ginocchio',t:'LCA, collaterali, LCP, menischi, artrosi, femoro-rotulea'},
Caviglia:{c:'#b45309',e:'Ca',l:'Caviglia e piede',t:'Distorsioni, sindesmosi, Achille, fascite plantare'},
Colonna:{c:'#475569',e:'Co',l:'Colonna',t:'Low back pain, radicolopatia, stenosi, scoliosi, cervicobrachialgia'},
Muscoli:{c:'#db2777',e:'Mu',l:'Lesioni muscolari',t:'Hamstring e polpaccio, fino al ritorno allo sprint'},
Principi:{c:'#4d7c0f',e:'Pr',l:'Principi',t:'Dolore, dosaggio della forza, AMI, edema e cicatrice'}};
const KN={i:'Isometrico',f:'Forza',p:'Pliometria / velocità',c:'Controllo',m:'Mobilità'};
const P=t=>'https://pubmed.ncbi.nlm.nih.gov/?term='+encodeURIComponent(t);
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const L=a=>'<ul>'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
function tab(t){return `${t.t?`<div class='tt'>${esc(t.t)}</div>`:''}<div class='wrap'><table><tr>${t.h.map(x=>`<th>${esc(x)}</th>`).join('')}</tr>${t.r.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>${t.n?`<p class='note'>${esc(t.n)}</p>`:''}`}
function exs(a){return `<div class='exg'>${a.map(e=>`<div class='ex k${e[1]}'><div class='eh'><b>${esc(e[0])}</b><span class='bd'>${KN[e[1]]}</span></div><div class='pl'>${e[2].split('·').map(x=>`<span>${esc(x.trim())}</span>`).join('')}</div><p><b>Come:</b> ${esc(e[3])}</p><p><b>Errore comune:</b> ${esc(e[4])}</p><p><b>Progressione:</b> ${esc(e[5])}</p></div>`).join('')}</div>`}
function tsts(a){return `<div class='crit two'>${a.map(t=>`<div class='cr'><b>${esc(t[0])}</b><dl><dt>Come</dt><dd>${esc(t[1])}</dd><dt>Cosa indica</dt><dd>${esc(t[2])}</dd></dl></div>`).join('')}</div>`}
function fasi(s){const F=s.fasi,E=s.ex||[];
const t=`<div class='wrap'><table class='fz'><tr><th>Fase</th><th>Obiettivi e contenuti</th><th>Criteri per avanzare</th><th>Esercizi</th></tr>${F.map((f,i)=>`<tr><td><span class='fn'>F${i+1} ${esc(f.n)}</span>${f.w?`<span class='fw'>${esc(f.w)}</span>`:''}</td><td data-l='Obiettivi e contenuti'>${f.o?`<b>${esc(f.o)}</b>`:''}${f.k?`<span class='fw' style='color:var(--tx);font-size:.84rem;margin-top:3px'>${esc(f.k)}</span>`:''}</td><td data-l='Criteri per avanzare'>${esc(f.c||'—')}</td><td data-l='Esercizi'>${(f.e||[]).map(j=>E[j]?`<span class='ch k${E[j][1]}'>${esc(E[j][0])}</span>`:'').join(' ')||'—'}</td></tr>`).join('')}</table></div>`;
if(!E.length)return t;
const lg=`<div class='lg'>${Object.keys(KN).map(k=>`<span><i class='dt k${k}'></i>${KN[k]}</span>`).join('')}</div>`;
const m=`<div class='wrap'><table class='mx'><tr><th>Esercizio × fase</th>${F.map((f,i)=>`<th>F${i+1}</th>`).join('')}</tr>${E.map((e,j)=>`<tr><td>${esc(e[0])}</td>${F.map(f=>`<td>${(f.e||[]).includes(j)?`<i class='dt k${e[1]}'></i>`:''}</td>`).join('')}</tr>`).join('')}</table></div>`;
return t+lg+m+`<p class='note'>Un esercizio può attraversare più fasi con dose e leva diverse. I tempi sono finestre orientative: si avanza per criteri, non per calendario.</p>`}
function rts(r){return `${r.intro?`<p>${esc(r.intro)}</p>`:''}<div class='crit two'>${r.c.map((c,i)=>`<div class='cr'><b>${i+1}. ${esc(c[0])}</b><dl><dt>Come</dt><dd>${esc(c[1])}</dd><dt>Target</dt><dd>${esc(c[2])}</dd><dt>Perché conta</dt><dd>${esc(c[3])}</dd></dl></div>`).join('')}</div>${r.pre&&r.pre.length?`<div class='pre'><b>Prima del contatto / della partita</b>${L(r.pre)}</div>`:''}${r.nota?`<p class='note'>${esc(r.nota)}</p>`:''}`}
function ev(a){const cl={Centrale:'r-c',Supporto:'r-s',Evitare:'r-e'};return `<div class='wrap'><table class='ev-c'><tr><th>Intervento</th><th>Ruolo</th><th>Certezza e limite</th></tr>${a.map(r=>`<tr><td>${esc(r[0])}</td><td class='${cl[r[1]]||''}'>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</table></div>`}
function fonti(s){return s.f.map((f,i)=>{const k='v:'+s.id+i,on=ls(k)==='1';const u=f[2]?(f[2].startsWith('PMID')?'https://pubmed.ncbi.nlm.nih.gov/'+f[2].slice(4).trim()+'/':'https://doi.org/'+f[2]):P(f[1]);return `<div class='src'><input type='checkbox' id='${k}' data-k='${k}' ${on?'checked':''}><div><a href='${u}' target='_blank' rel='noopener'>${esc(f[0])}</a>${f[2]?` <span class='cm'>· ${f[2].startsWith('PMID')?esc(f[2]):'DOI'} dal materiale</span>`:''}<br><label for='${k}'>${on?'✓ verificata su PubMed':'da verificare su PubMed'}</label></div></div>`}).join('')}
function sec(h,b){return b?`<h3>${h}</h3>${b}`:''}
// Corpo completo della scheda (pagina della scheda)
function card(s){
const fl=(s.red||[]).map(x=>`<div class='fl r'><b>Red flag</b>${esc(x)}</div>`).join('')+(s.yel||[]).map(x=>`<div class='fl y'><b>Yellow flag</b>${esc(x)}</div>`).join('');
let b='';
if(s.key)b+=`<div class='keyb'><b>Punti chiave</b>${L(s.key)}</div>`;
if(s.mat)b+=`<div class='mat'>${s.mat.map(m=>`<span>${esc(m)}</span>`).join('')}</div>`;
b+=sec('Inquadramento',s.inq?L(s.inq):'');
b+=sec('Classificazioni e tabelle',s.tab?s.tab.map(tab).join(''):'');
(s.sez||[]).forEach(x=>{b+=sec(esc(x.h),(x.b?L(x.b):'')+(x.t?x.t.map(tab).join(''):''))});
b+=sec('Red e yellow flags',fl?`<div class='flg'>${fl}</div>`:'');
b+=sec('Test e valutazione',s.tst?tsts(s.tst):'');
b+=sec('Esercizi e carichi',s.ex&&s.ex.length?exs(s.ex):'');
b+=sec('Percorso per fasi',s.fasi?fasi(s):'');
b+=sec('Trattamenti ed evidenza',s.ev?ev(s.ev):'');
b+=sec('Criteri di rientro',s.rts?rts(s.rts):'');
b+=sec('Fonti',s.f&&s.f.length?fonti(s):'');
return b}
// Riga dell'elenco: tocco → pagina della scheda. Nella ricerca globale mostra anche la sezione.
function row(s,tg){return `<a class='row sr' href='#/${s.d}/${encodeURIComponent(s.id)}' data-open='${esc(s.id)}' style='--dc:${DC[s.d].c}'><span class='rw'><b>${esc(s.t)}${s.nw?`<span class='nw'>NUOVA</span>`:''}</b>${tg?`<span class='tag'>${esc(DC[s.d].l)}</span>`:''}<i class='chev'></i></span></a>`}
// Chi ha attivato "riduci movimento" salta allo scorrimento senza animazione
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches,SM=()=>RM()?'auto':'smooth';
const flat=s=>JSON.stringify(s).toLowerCase();
const q=document.getElementById('q'),list=document.getElementById('list'),nav=document.getElementById('nav'),cbar=document.getElementById('cbar');
let dist='Tutti',sid=null,cur=null,tick=false;
function bindSrc(root){root.querySelectorAll('input[data-k]').forEach(c=>c.onchange=()=>{ls(c.dataset.k,c.checked?'1':'0');c.parentElement.querySelector('label').textContent=c.checked?'✓ verificata su PubMed':'da verificare su PubMed';prog()})}
function draw(){const t=q.value.trim().toLowerCase();const home=dist==='Tutti'&&!t;
document.getElementById('tiles').style.display=home?'':'none';
const r=S.filter(s=>(dist==='Tutti'||s.d===dist)&&(!t||flat(s).includes(t)));
list.innerHTML=home?'':(r.length?`<div class='grp'>${r.map(s=>row(s,dist==='Tutti')).join('')}</div>`:"<p class='empty'>Nessuna scheda trovata.</p>")}
function prog(){let tot=0,ok=0;S.forEach(s=>(s.f||[]).forEach((f,i)=>{tot++;if(ls('v:'+s.id+i)==='1')ok++}));const p=document.querySelector('.pg div'),m=document.getElementById('pgt');if(p)p.style.width=(tot?Math.round(ok/tot*100):0)+'%';if(m)m.textContent=`${ok} di ${tot}`}
const SH={'Classificazioni e tabelle':'Tabelle','Red e yellow flags':'Flag','Test e valutazione':'Test','Esercizi e carichi':'Esercizi','Percorso per fasi':'Fasi','Trattamenti ed evidenza':'Evidenza','Criteri di rientro':'Rientro'};
// Pagina della scheda: barra con "‹ Indietro" e titolo piccolo, titolo grande, corpo; la fila dei capitoli compare quando il titolo grande esce dallo schermo
function detail(s,from){const back=from==='Tutti'?'Home':DC[from].l;
document.body.classList.add('det');
nav.innerHTML=`<button class='back' data-back aria-label='Torna a ${esc(back)}'><i class='bk'></i><span class='bl'>${esc(back)}</span></button><span class='nt'>${esc(s.t)}</span>`;
document.getElementById('hero').innerHTML=`<div class='dh' style='--dc:${DC[s.d].c}'><span class='dk'><span class='ri' style='--dc:${DC[s.d].c}'>${DC[s.d].e}</span>${esc(DC[s.d].l)}</span><h1>${esc(s.t)}${s.nw?` <span class='nw'>NUOVA</span>`:''}</h1></div>`;
document.getElementById('tiles').style.display='none';
list.innerHTML=`<article class='grp sc' id='c-${esc(s.id)}' style='--dc:${DC[s.d].c}'><div class='body'>${card(s)}</div></article>`;
cur=list.firstElementChild;bindSrc(cur);
cbar.style.setProperty('--dc',DC[s.d].c);
cbar.innerHTML=`<div class='cb-in'><div class='cb-s'>${[...cur.querySelectorAll('.body>h3')].map((h,i)=>`<a data-h='${i}'>${esc(SH[h.textContent]||h.textContent.replace(/\s*\([^)]*\)/g,'').trim())}</a>`).join('')}</div></div>`}
function lista(){const n=d=>S.filter(s=>s.d===d).length;
document.body.classList.remove('det');cur=null;cbar.classList.remove('on');nav.classList.remove('tt');
nav.innerHTML=`<a class='nv ${dist==='Tutti'?'on':''}' data-go='Tutti'>Home</a>`+Object.keys(DC).map(k=>`<a class='nv ${dist===k?'on':''}' data-go='${k}'>${DC[k].l}</a>`).join('');
const hero=document.getElementById('hero'),tl=document.getElementById('tiles');
if(dist==='Tutti'){hero.innerHTML=`<div class='hero'><h1>Schede cliniche</h1></div>`;
tl.innerHTML=`<p class='gh'>Sezioni</p><div class='grp'>${Object.keys(DC).map(k=>`<a class='row' data-go='${k}'><span class='ri' style='--dc:${DC[k].c}'>${DC[k].e}</span><span class='rw'><b>${DC[k].l}</b><span class='rc'>${n(k)}</span><i class='chev'></i></span></a>`).join('')}</div><p class='gh'>Studio</p><div class='grp'><div class='pgc'><div class='pgr'><span>Fonti verificate su PubMed</span><span id='pgt'></span></div><div class='pg'><div></div></div></div></div>`;prog()}
else{hero.innerHTML=`<div class='ph'><span class='ri lg' style='--dc:${DC[dist].c}'>${DC[dist].e}</span><h1>${DC[dist].l}</h1><p>${DC[dist].t} · ${n(dist)} schede</p></div>`;tl.innerHTML=''}
const on=nav.querySelector('.nv.on');if(on)nav.scrollLeft=on.offsetLeft-(nav.clientWidth-on.offsetWidth)/2;
q.placeholder=dist==='Tutti'?'Cerca in tutte le schede…':'Cerca in '+DC[dist].l}
// Transizione da app: la scheda entra da destra ed esce verso destra (stesso percorso); con "riduci movimento" solo dissolvenza
function slide(dir){if(!dir||!document.body.animate)return;const k=RM()?[{opacity:0},{opacity:1}]:[{transform:`translateX(${dir*28}%)`,opacity:0},{transform:'none',opacity:1}];
['hero','main'].forEach(x=>{const e=x==='main'?document.querySelector('main'):document.getElementById(x);e.animate(k,{duration:RM()?150:320,easing:'cubic-bezier(.32,.72,0,1)'})})}
// Stato dalla URL: #/Sezione oppure #/Sezione/id-scheda
function parse(){const p=location.hash.replace(/^#\/?/,'').split('/').map(x=>{try{return decodeURIComponent(x)}catch(e){return ''}});
const s=p[1]&&S.find(x=>x.id===p[1]);sid=s?s.id:null;dist=s?(history.state&&history.state.from)||s.d:(DC[p[0]]?p[0]:'Tutti')}
function render(dir,st){if(sid){detail(S.find(x=>x.id===sid),dist);window.scrollTo(0,0)}else{lista();q.value=st&&st.q||'';draw();window.scrollTo(0,st&&st.y||0)}slide(dir);cb()}
function go(d){try{history.pushState(null,'','#/'+(d==='Tutti'?'':d))}catch(e){}dist=d;sid=null;render(0)}
function apri(id){const s=S.find(x=>x.id===id);try{history.replaceState({q:q.value,y:scrollY},'');history.pushState({from:dist,pushed:1},'','#/'+s.d+'/'+encodeURIComponent(id))}catch(e){}sid=id;render(1)}
function back(){if(history.state&&history.state.pushed)history.back();else{const s=S.find(x=>x.id===sid);try{history.pushState(null,'','#/'+s.d)}catch(e){}dist=s.d;sid=null;render(-1)}}
document.addEventListener('click',e=>{const o=e.target.closest('[data-open]');if(o){e.preventDefault();apri(o.dataset.open);return}
if(e.target.closest('[data-back]')){back();return}
const a=e.target.closest('[data-go]');if(a){e.preventDefault();go(a.dataset.go)}});
window.addEventListener('popstate',()=>{const was=!!sid;parse();render(was&&!sid?-1:!was&&sid?1:0,history.state)});
// Mentre scorri la scheda: titolo piccolo nella barra e fila dei capitoli, con il capitolo in corso evidenziato
const navH=()=>nav.offsetHeight;
function cb(){tick=false;if(!cur)return;const y=navH(),h1=document.querySelector('.dh h1'),up=!!h1&&h1.getBoundingClientRect().bottom<y;
nav.classList.toggle('tt',up);if(up!==cbar.classList.contains('on')){cbar.classList.toggle('on',up);cbar.style.top=y+'px'}
if(!up)return;const lim=y+cbar.offsetHeight+12;let a=-1;cur.querySelectorAll('.body>h3').forEach((h,i)=>{if(h.getBoundingClientRect().top<lim)a=i});
const row=cbar.querySelector('.cb-s'),was=row.querySelector('.on'),now=row.children[a];if(was!==now){if(was)was.classList.remove('on');if(now){now.classList.add('on');row.scrollLeft=now.offsetLeft-16}}}
const cbq=()=>{if(!tick){tick=true;requestAnimationFrame(cb)}};
window.addEventListener('scroll',cbq,{passive:true});
cbar.addEventListener('click',e=>{const h=e.target.closest('[data-h]');if(!h||!cur)return;const t=cur.querySelectorAll('.body>h3')[h.dataset.h];window.scrollTo({top:t.getBoundingClientRect().top+scrollY-navH()-cbar.offsetHeight-8,behavior:SM()})});
const tb=document.getElementById('top');window.addEventListener('scroll',()=>{tb.style.display=window.scrollY>600?'block':'none'},{passive:true});tb.onclick=()=>window.scrollTo({top:0,behavior:SM()});
q.oninput=draw;
parse();render(0,history.state);
