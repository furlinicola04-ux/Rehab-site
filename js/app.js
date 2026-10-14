// Fine della preparazione dati: svuota le schede di base, ormai fuse nelle schede finali.
OLD.length=0;

const DC={
Spalla:{c:'#2563eb',e:'💪',l:'Spalla',t:'Instabilità, cuffia, AC, capsulite, protesi e fratture'},
Gomito:{c:'#7c3aed',e:'🦾',l:'Gomito',t:'Traumi, rigidità, epicondilalgia ed epitrocleite'},
Mano:{c:'#0891b2',e:'✋',l:'Mano e polso',t:'Fratture, legamenti, TFCC, Dupuytren, rizoartrosi'},
Anca:{c:'#dc2626',e:'🦴',l:'Anca',t:'Coxartrosi e protesi, FAI, fratture di femore, dolore laterale'},
Ginocchio:{c:'#059669',e:'🦵',l:'Ginocchio',t:'LCA, collaterali, LCP, menischi, artrosi, femoro-rotulea'},
Caviglia:{c:'#d97706',e:'🦶',l:'Caviglia e piede',t:'Distorsioni, sindesmosi, Achille, fascite plantare'},
Colonna:{c:'#475569',e:'🧍',l:'Colonna',t:'Low back pain, radicolopatia, stenosi, scoliosi, cervicobrachialgia'},
Muscoli:{c:'#db2777',e:'🔥',l:'Lesioni muscolari',t:'Hamstring e polpaccio, fino al ritorno allo sprint'},
Principi:{c:'#65a30d',e:'🧭',l:'Principi',t:'Dolore, dosaggio della forza, AMI, edema e cicatrice'}};
const KN={i:'Isometrico',f:'Forza',p:'Pliometria / velocità',c:'Controllo',m:'Mobilità'};
const P=t=>'https://pubmed.ncbi.nlm.nih.gov/?term='+encodeURIComponent(t);
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const L=a=>'<ul>'+a.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>';
function tab(t){return `${t.t?`<div class='tt'>${esc(t.t)}</div>`:''}<div class='wrap'><table><tr>${t.h.map(x=>`<th>${esc(x)}</th>`).join('')}</tr>${t.r.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table></div>${t.n?`<p class='note'>${esc(t.n)}</p>`:''}`}
function exs(a){return `<div class='exg'>${a.map(e=>`<div class='ex k${e[1]}'><div class='eh'><b>${esc(e[0])}</b><span class='bd'>${KN[e[1]]}</span></div><div class='pl'>${e[2].split('·').map(x=>`<span>${esc(x.trim())}</span>`).join('')}</div><p><b>Come:</b> ${esc(e[3])}</p><p><b>Errore comune:</b> ${esc(e[4])}</p><p><b>Progressione:</b> ${esc(e[5])}</p></div>`).join('')}</div>`}
function tsts(a){return `<div class='crit two'>${a.map(t=>`<div class='cr'><b>${esc(t[0])}</b><dl><dt>Come</dt><dd>${esc(t[1])}</dd><dt>Cosa indica</dt><dd>${esc(t[2])}</dd></dl></div>`).join('')}</div>`}
function fasi(s){const F=s.fasi,E=s.ex||[];
const t=`<div class='wrap'><table><tr><th>Fase</th><th>Obiettivi e contenuti</th><th>Criteri per avanzare</th><th>Esercizi</th></tr>${F.map((f,i)=>`<tr><td><span class='fn'>F${i+1} ${esc(f.n)}</span>${f.w?`<span class='fw'>${esc(f.w)}</span>`:''}</td><td>${f.o?`<b>${esc(f.o)}</b>`:''}${f.k?`<span class='fw' style='color:var(--tx);font-size:.84rem;margin-top:3px'>${esc(f.k)}</span>`:''}</td><td>${esc(f.c||'—')}</td><td>${(f.e||[]).map(j=>E[j]?`<span class='ch k${E[j][1]}'>${esc(E[j][0])}</span>`:'').join(' ')||'—'}</td></tr>`).join('')}</table></div>`;
if(!E.length)return t;
const lg=`<div class='lg'>${Object.keys(KN).map(k=>`<span><i class='dt k${k}'></i>${KN[k]}</span>`).join('')}</div>`;
const m=`<div class='wrap'><table class='mx'><tr><th>Esercizio × fase</th>${F.map((f,i)=>`<th>F${i+1}</th>`).join('')}</tr>${E.map((e,j)=>`<tr><td>${esc(e[0])}</td>${F.map(f=>`<td>${(f.e||[]).includes(j)?`<i class='dt k${e[1]}'></i>`:''}</td>`).join('')}</tr>`).join('')}</table></div>`;
return t+lg+m+`<p class='note'>Un esercizio può attraversare più fasi con dose e leva diverse. I tempi sono finestre orientative: si avanza per criteri, non per calendario.</p>`}
function rts(r){return `${r.intro?`<p>${esc(r.intro)}</p>`:''}<div class='crit two'>${r.c.map((c,i)=>`<div class='cr'><b>${i+1}. ${esc(c[0])}</b><dl><dt>Come</dt><dd>${esc(c[1])}</dd><dt>Target</dt><dd>${esc(c[2])}</dd><dt>Perché conta</dt><dd>${esc(c[3])}</dd></dl></div>`).join('')}</div>${r.pre&&r.pre.length?`<div class='pre'><b>Prima del contatto / della partita</b>${L(r.pre)}</div>`:''}${r.nota?`<p class='note'>${esc(r.nota)}</p>`:''}`}
function ev(a){const cl={Centrale:'r-c',Supporto:'r-s',Evitare:'r-e'};return `<div class='wrap'><table class='ev-c'><tr><th>Intervento</th><th>Ruolo</th><th>Certezza e limite</th></tr>${a.map(r=>`<tr><td>${esc(r[0])}</td><td class='${cl[r[1]]||''}'>${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join('')}</table></div>`}
function fonti(s){return s.f.map((f,i)=>{const k='v:'+s.id+i,on=ls(k)==='1';const u=f[2]?(f[2].startsWith('PMID')?'https://pubmed.ncbi.nlm.nih.gov/'+f[2].slice(4).trim()+'/':'https://doi.org/'+f[2]):P(f[1]);return `<div class='src'><input type='checkbox' id='${k}' data-k='${k}' ${on?'checked':''}><div><a href='${u}' target='_blank' rel='noopener'>${esc(f[0])}</a>${f[2]?` <span class='cm'>· ${f[2].startsWith('PMID')?esc(f[2]):'DOI'} dal materiale</span>`:''}<br><label for='${k}'>${on?'✓ verificata su PubMed':'da verificare su PubMed'}</label></div></div>`}).join('')}
function sec(h,b){return b?`<h3>${h}</h3>${b}`:''}
function card(s,open,tg){const dc=DC[s.d].c;
const fl=(s.red||[]).map(x=>`<div class='fl r'><b>Red flag</b>${esc(x)}</div>`).join('')+(s.yel||[]).map(x=>`<div class='fl y'><b>Yellow flag</b>${esc(x)}</div>`).join('');
let b='';
if(s.key)b+=`<div class='keyb'><b>Punti chiave</b>${L(s.key)}</div>`;
if(s.mat)b+=`<div class='mat'>${s.mat.map(m=>`<span>📚 ${esc(m)}</span>`).join('')}</div>`;
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
return `<details class='sc' id='c-${s.id}' style='--dc:${dc}' ${open?'open':''}><summary><span class='st'><b>${esc(s.t)}${s.nw?`<span class='nw'>NUOVA</span>`:''}</b>${s.sub?`<small>${esc(s.sub)}</small>`:''}</span>${tg?`<span class='tag'>${esc(DC[s.d].l)}</span>`:''}</summary><div class='body'>${b}</div></details>`}
// Chi ha attivato "riduci movimento" salta allo scorrimento senza animazione
const SM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';
const flat=s=>JSON.stringify(s).toLowerCase();
const q=document.getElementById('q'),list=document.getElementById('list');
let dist='Tutti';
function draw(){const t=q.value.trim().toLowerCase();const home=dist==='Tutti'&&!t;
document.getElementById('tiles').style.display=home?'':'none';
const r=S.filter(s=>(dist==='Tutti'||s.d===dist)&&(!t||flat(s).includes(t)));
list.innerHTML=home?'':(r.length?r.map(s=>card(s,false,dist==='Tutti')).join(''):"<p class='empty'>Nessuna scheda trovata.</p>");
list.querySelectorAll('input[data-k]').forEach(c=>c.onchange=()=>{ls(c.dataset.k,c.checked?'1':'0');c.parentElement.querySelector('label').textContent=c.checked?'✓ verificata su PubMed':'da verificare su PubMed';prog()})}
function prog(){let tot=0,ok=0;S.forEach(s=>(s.f||[]).forEach((f,i)=>{tot++;if(ls('v:'+s.id+i)==='1')ok++}));const p=document.querySelector('.pg div'),m=document.getElementById('pgt');if(p)p.style.width=(tot?Math.round(ok/tot*100):0)+'%';if(m)m.textContent=`Fonti verificate su PubMed: ${ok} di ${tot}`}
function render(){const n=d=>S.filter(s=>s.d===d).length;
document.getElementById('nav').innerHTML=`<a class='nv ${dist==='Tutti'?'on':''}' data-go='Tutti'>🏠 Home</a>`+Object.keys(DC).map(k=>`<a class='nv ${dist===k?'on':''}' style='--dc:${DC[k].c}' data-go='${k}'>${DC[k].e} ${DC[k].l}</a>`).join('');
const hero=document.getElementById('hero'),tl=document.getElementById('tiles');
if(dist==='Tutti'){hero.innerHTML=`<div class='hero'><h1>Schede cliniche</h1><p>Ortopedia e sport per studio, ripasso e pratica clinica: ${S.length} schede in ${Object.keys(DC).length} sezioni, integrate con il materiale del corso di Riabilitazione ortopedica (UNIBS).</p><div class='pg'><div></div></div><small id='pgt'></small></div>`;
tl.innerHTML=`<div class='tiles'>${Object.keys(DC).map(k=>`<a class='tile' style='background:linear-gradient(135deg,${DC[k].c},${DC[k].c}bb)' data-go='${k}'><span class='ic'>${DC[k].e}</span><b>${DC[k].l}</b><span>${n(k)} schede</span><small>${DC[k].t}</small></a>`).join('')}</div>`;prog()}
else{hero.innerHTML=`<div class='ph' style='background:linear-gradient(135deg,${DC[dist].c},${DC[dist].c}99)'><span class='ic'>${DC[dist].e}</span><h1>${DC[dist].l}</h1><p>${DC[dist].t} · ${n(dist)} schede</p><div class='idx'>${S.filter(s=>s.d===dist).map(s=>`<a data-jump='${s.id}'>${esc(s.t)}</a>`).join('')}</div></div>`;tl.innerHTML=''}
const nav=document.getElementById('nav'),on=nav.querySelector('.nv.on');if(on)nav.scrollLeft=on.offsetLeft-(nav.clientWidth-on.offsetWidth)/2;
q.placeholder=dist==='Tutti'?'Cerca in tutte le schede…':'Cerca in '+DC[dist].l;q.value='';draw();window.scrollTo(0,0)}
function go(d){try{history.pushState(null,'','#/'+(d==='Tutti'?'':d))}catch(e){}dist=d;render()}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(a){e.preventDefault();go(a.dataset.go);return}
const j=e.target.closest('[data-jump]');if(j){const el=document.getElementById('c-'+j.dataset.jump);if(el){el.open=true;el.scrollIntoView({behavior:SM(),block:'start'})}}});
window.addEventListener('popstate',()=>{try{const h=decodeURIComponent(location.hash.replace('#/',''));dist=DC[h]?h:'Tutti';render()}catch(e){}});
const tb=document.getElementById('top');window.addEventListener('scroll',()=>{tb.style.display=window.scrollY>600?'block':'none'});tb.onclick=()=>window.scrollTo({top:0,behavior:SM()});
q.oninput=draw;
try{const h0=decodeURIComponent(location.hash.replace('#/',''));if(DC[h0])dist=h0}catch(e){}
render();
