// Fine della preparazione dati: svuota le schede di base, ormai fuse nelle schede finali.
OLD.length=0;

const DC={
Spalla:{c:'#2563eb',e:'Sp',l:'Spalla',t:'Instabilità, cuffia, AC, capsulite, protesi e fratture'},
Gomito:{c:'#7c3aed',e:'Go',l:'Gomito',t:'Traumi, rigidità, epicondilalgia ed epitrocleite'},
Mano:{c:'#0e7490',e:'Ma',l:'Mano e polso',t:'Fratture, legamenti, TFCC, Dupuytren, rizoartrosi'},
Anca:{c:'#dc2626',e:'An',l:'Anca',t:'Coxartrosi e protesi, FAI, fratture di femore, dolore laterale'},
Ginocchio:{c:'#047857',e:'Gi',l:'Ginocchio',t:'LCA, collaterali, LCP, menischi, artrosi, femoro-rotulea'},
Caviglia:{c:'#b45309',e:'Ca',l:'Caviglia e piede',t:'Distorsioni, sindesmosi, Achille, fascite plantare'},
Testa:{c:'#0f766e',e:'Tc',l:'Testa e collo',t:'Commozione cerebrale, stinger, trauma cervicale e colpo di frusta'},
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
// Questionari: nel sito c'è solo il collegamento alla pagina o al PDF di chi li pubblica (mai una copia: il sito è pubblico e i moduli hanno un titolare).
// Si mostrano nelle schede che li citano. Per aggiungerne uno: nome come scritto nelle schede, titolo esteso, indirizzo, nota sulla fonte.
const PT='https://www.physiotutors.com/it/wp-content/uploads/';
const FS='https://www.fisioscience.it/wp-content/uploads/';
const QS=[
['HAGOS','Hip and Groin Outcome Score (anca e inguine)',PT+'2023/04/hagos_hip_and_groin_questionnaire.pdf','PDF da Physiotutors (pagina italiana; il PDF potrebbe essere in inglese)'],
['KOOS','Knee injury and Osteoarthritis Outcome Score (ginocchio)',FS+'2023/04/Scala-KOOS-italiano.pdf','PDF in italiano da FisioScience (versione italiana di Monticone e colleghi)'],
['ACL-RSI','Prontezza psicologica al ritorno allo sport dopo LCA',PT+'2023/02/ACL-RSI.pdf','PDF da Physiotutors'],
['VISA-A','Tendinopatia di Achille',FS+'2021/06/VISAA_Italian.pdf','PDF in italiano da FisioScience'],
['VISA-P','Tendinopatia rotulea',FS+'2022/07/VISA_P_in_ITA.pdf','PDF in italiano da FisioScience (adattamento per i maschi)'],
['DASH','Disabilità di braccio, spalla e mano','https://dash.iwh.on.ca/sites/dash/files/Translations/DASH_Italian.pdf','PDF in italiano dal Institute for Work & Health (traduzione di Zanoli e GLOBE); l\'uso richiede di rispettare i loro termini'],
['SPADI','Dolore e disabilità di spalla',FS+'2022/07/SPADI-italiano-PDF.pdf','PDF in italiano da FisioScience'],
['WOSI','Instabilità di spalla (Western Ontario)',FS+'2022/09/Western_Ontario_Shoulder_Instability_Index_WOSI.pdf','PDF da FisioScience (validazione italiana di Cacchio e colleghi; non è indicato se il file sia in italiano)'],
['NDI','Disabilità del collo (Neck Disability Index)',FS+'2021/04/neck_disability_index.pdf','PDF in italiano da FisioScience'],
['WOMAC','Artrosi di anca e ginocchio',FS+'2021/02/womac-italiano-pdf.pdf','PDF in italiano da FisioScience'],
['PRWE','Valutazione del polso riferita dal paziente','https://www.fisioscience.it/scale-valutazioni/prwe-patient-rated-wrist-evaluation/','Pagina di FisioScience: non offre il modulo in PDF'],
['QuickDASH','Versione breve del DASH','https://dash.iwh.on.ca/sites/dash/files/Translations/QuickDASH_Italian.pdf','PDF in italiano dal Institute for Work & Health (traduzione di Zanoli e GLOBE); l\'uso richiede di rispettare i loro termini'],
['IKDC','Valutazione soggettiva del ginocchio (IKDC)',PT+'2023/02/IKDC_Subjective_Knee_Evaluation_Form.pdf','PDF da Physiotutors (pagina italiana)'],
['CAIT','Instabilità cronica di caviglia (Cumberland Ankle Instability Tool)','https://doi.org/10.1016/j.foot.2023.102043','Articolo di Contri e colleghi (The Foot 2023, PMID 37295293) con la versione italiana CAIT-I nell\'Appendice A; il PDF non è libero, quindi si apre dalla pagina dell\'editore'],
['SCAT6','Valutazione della commozione cerebrale (SCAT6, inglese)','https://pedsconcussion.com/scat6-3','Modulo SCAT6 in inglese (copia del file di BJSM 2023, ospitata da terzi: il testo dice che può essere copiato senza modifiche); articolo ufficiale: bjsm.bmj.com/content/57/11/619. Nessuna versione italiana verificata']
];
function quest(s){const {f,...r}=s,t=JSON.stringify(r);const m=QS.filter(q=>new RegExp('(^|[^A-Za-z0-9-])'+q[0]+'(?![A-Za-z0-9-])').test(t));
return m.length?m.map(q=>`<div class='qst'><a href='${q[2]}' target='_blank' rel='noopener'><b>${esc(q[0])}</b> · ${esc(q[1])}</a><span class='cm'>${esc(q[3])}</span></div>`).join(''):''}
function fonti(s){return s.f.map((f,i)=>{const k='v:'+s.id+i,on=ls(k)==='1';const u=f[2]?(f[2].startsWith('PMID')?'https://pubmed.ncbi.nlm.nih.gov/'+f[2].slice(4).trim()+'/':'https://doi.org/'+f[2]):P(f[1]);return `<div class='src'><input type='checkbox' id='${k}' data-k='${k}' ${on?'checked':''}><div><a href='${u}' target='_blank' rel='noopener'>${esc(f[0])}</a>${f[2]?` <span class='cm'>· ${f[2].startsWith('PMID')?esc(f[2]):'DOI'} dal materiale</span>`:''}<br><label for='${k}'>${on?'✓ verificata su PubMed':'da verificare su PubMed'}</label></div></div>`}).join('')}
function sec(h,b){return b?`<h3>${h}</h3>${b}`:''}
// Capitolo di ogni tabella o sezione extra (per titolo); una scheda nuova può indicarlo con il campo z.
// I Inquadramento · F Flag · V Valutazione · T Trattamento ed evidenza · P Fasi · E Esercizi · R Ritorno · X Prevenzione · C Caso clinico
const ZT={"Cuffia dei rotatori e innervazione": "I", "Patologie specifiche e non specifiche (lezione)": "I", "Classificazione (lezione)": "I", "Tipi di instabilità": "I", "Classificazione di Rockwood (sintesi)": "I", "Tipi di lesione di cuffia": "I", "Primaria vs secondaria (lezione)": "I", "Fasi cliniche": "I", "Fratture della base del I metacarpo": "I", "Stadiazione di Tubiana": "I", "Stadi di Eaton": "I", "Muscoli dell'anca (lezione)": "I", "Entità cliniche (Doha 2015)": "I", "Confronto": "I", "Classificazione clinica (lezione)": "I", "Fattori di rischio e prognosi (lezione)": "I", "Imaging nei asintomatici (Brinjikji 2015)": "I", "Tipi di dolore all'arto inferiore (lezione)": "I", "Definizioni (lezione)": "I", "Stadi alla RM/TC (classificazione di Sairyo, sintesi)": "I", "Gradi di Meyerding (spondilolistesi)": "I", "Sprint-type vs stretch-type (Askling, da Bisciotti)": "I", "Classificazioni": "I", "Hamstring syndrome (Bisciotti)": "I", "Meccanismi dell'analgesia da esercizio (Sluka 2018)": "I", "Apprendimento dell'evitamento (lezione LBP)": "I", "Fattori prognostici (lezione Spalla)": "I", "Red flags (lezione)": "F", "Ottawa knee rules (RX se almeno uno)": "F", "Frattura vertebrale (lezione)": "F", "Neoplasia (lezione)": "F", "Quando prudenza": "F", "ROM fisiologici (lezione)": "V", "Scale di valutazione": "V", "Esame clinico in sequenza (lezione)": "V", "Valutazione (lezione)": "V", "Screening coper (Fitzgerald 2000)": "V", "Cluster di Lowery (2006)": "V", "Deficit di estensione vs flessione (lezione)": "V", "Esame neurologico (lezione)": "V", "Valutazione soggettiva e fisica (lezione)": "V", "Claudicatio neurogena vs vascolare": "V", "Equilibrio sagittale con filo a piombo (Negrini)": "V", "Esame clinico (Hickey 2022, Bisciotti)": "V", "Strumenti per monitorare": "V", "Lesione acuta vs dolore riferito (Brukner e Khan, da Bisciotti)": "V", "Stroke test (versamento)": "V", "Anatomica vs inversa": "T", "Gesso vs tutore termoplastico (lezione)": "T", "Scelta del graft (lezione)": "T", "Dati KANON sulla guarigione (Filbay 2022, abstract)": "T", "Tipi di protesi": "T", "Raccomandazioni JOSPT (lezione)": "T", "Chirurgico vs conservativo (lezione)": "T", "Credenze che peggiorano disabilità e recupero (O'Sullivan 2014)": "T", "Gestione (lezione e linee guida)": "T", "Corsetto (lezione)": "T", "Chirurgia e adulto (lezione)": "T", "Tappe dopo stabilizzazione (lezione, esempio remplissage)": "P", "Precauzioni nei primi 3 mesi (lezione, accesso postero-laterale)": "P", "Protocollo post-operatorio grado III (Logan 2016, lezione)": "P", "Dopo sutura meniscale (Wedge 2021-2022, lezione)": "P", "LCA + sutura meniscale (Delaware, lezione)": "P", "Le 6 fasi riabilitative (lezione)": "P", "Concessione del carico post-chirurgica (lezione)": "P", "Fasi: chirurgico vs conservativo (lezione)": "P", "Dopo riparazione prossimale (Bisciotti)": "P", "Gonfiore": "E", "Cicatrice": "E", "Mobilità": "E", "Forza e presa": "E", "Tecniche manuali (lezione)": "E", "Inibizione artrogena (AMI) ed estensione": "E", "Dosaggio della forza (lezione)": "E", "Progressione per l'anca (lezione)": "E", "Autocorrezione SEAS: i 3 piani": "E", "Dosaggio SEAS (lezione)": "E", "Regole di monitoraggio del dolore": "E", "Attività fisica raccomandata (OMS, dalla lezione LBP)": "E", "Parametri (lezione Ginocchio)": "E", "Catena chiusa vs aperta": "E", "Isometrico (lezione Anca)": "E", "Progressioni di esempio (lezione Ginocchio)": "E", "Parametri NMES (Maffiuletti 2010, lezione)": "E", "Deficit di estensione: protocollo in 3 step (Delaloye 2018, SANTI)": "E", "Esempi di applicazione": "E", "Criteri per il ritorno alla corsa (lezione)": "R", "Batteria di ritorno allo sport (lezione)": "R", "Batteria RTS dopo sutura (Wedge)": "R", "Corsa progressiva in 3 stadi (Hickey 2022)": "R", "Prevenzione": "X", "Caso clinico della lezione": "C"};
// Corpo completo della scheda, nell'ordine del ragionamento clinico: le tabelle e le sezioni extra diventano sottotitoli dentro il loro capitolo
function card(s){
const fl=(s.red||[]).map(x=>`<div class='fl r'><b>Red flag</b>${esc(x)}</div>`).join('')+(s.yel||[]).map(x=>`<div class='fl y'><b>Yellow flag</b>${esc(x)}</div>`).join('');
const X={I:'',F:'',V:'',T:'',P:'',E:'',R:'',X:'',C:''},z=(o,t)=>o.z||ZT[t]||'I';
(s.tab||[]).forEach(t=>{X[z(t,t.t)]+=tab(t)});
(s.sez||[]).forEach(x=>{X[z(x,x.h)]+=(x.h==='Prevenzione'?'':`<div class='tt'>${esc(x.h)}</div>`)+(x.b?L(x.b):'')+(x.t?x.t.map(tab).join(''):'')});
const st=(t,h)=>h&&t?`<div class='tt'>${t}</div>`+h:h;
let b='';
if(s.key)b+=`<div class='keyb'><b>Punti chiave</b>${L(s.key)}</div>`;
if(s.mat)b+=`<div class='mat'>${s.mat.map(m=>`<span>${esc(m)}</span>`).join('')}</div>`;
b+=sec('Inquadramento',(s.inq?L(s.inq):'')+X.I);
b+=sec('Red e yellow flags',(fl?`<div class='flg'>${fl}</div>`:'')+X.F);
b+=sec('Valutazione',st(X.V&&'Test clinici',s.tst?tsts(s.tst):'')+X.V+st('Questionari (collegamento al modulo)',quest(s)));
b+=sec('Trattamento ed evidenza',X.T+st(X.T&&'Cosa funziona, cosa evitare',s.ev?ev(s.ev):''));
b+=sec('Percorso per fasi',X.P+st(X.P&&'Fasi',s.fasi?fasi(s):''));
b+=sec('Esercizi e carichi',X.E+st(X.E&&'Esercizi',s.ex&&s.ex.length?exs(s.ex):''));
b+=sec('Ritorno alla corsa e allo sport',X.R+st(X.R&&'Criteri di rientro',s.rts?rts(s.rts):''));
b+=sec('Prevenzione',X.X);
b+=sec('Caso clinico',X.C);
b+=sec('Fonti',s.f&&s.f.length?fonti(s):'');
return b}
// Valutazione del distretto (va:1): pagina a tappe come l'esame, non a capitoli come le patologie.
// Ogni test ha un'etichetta (a cosa serve) e le situazioni in cui è utile, che i filtri in cima usano per nascondere il resto.
const VE={e:['Esclude','Test sensibile: se è negativo la lesione è poco probabile'],c:['Conferma','Test specifico: se è positivo la lesione è probabile'],m:['Misura','Serve a misurare e seguire i progressi'],o:['Orienta','Studiato, ma da solo poco accurato'],n:['Non studiato','Test classico senza dati di accuratezza']};
const VS={a:'Trauma acuto',c:'Dolore che dura',r:'Rientro in campo'};
function vcard(s){const nt=s.tp.reduce((n,x)=>n+x.t.filter(t=>t.length>1).length,0);
let b='';
if(s.key)b+=`<div class='keyb'><b>Punti chiave</b>${L(s.key)}</div>`;
if(s.mat)b+=`<div class='mat'>${s.mat.map(m=>`<span>${esc(m)}</span>`).join('')}</div>`;
b+=`<div class='vf' role='group' aria-label='Mostra i test utili in una situazione'><button class='on' aria-pressed='true' data-vf=''>Tutti</button>${Object.keys(VS).map(k=>`<button aria-pressed='false' data-vf='${k}'>${VS[k]}</button>`).join('')}</div>`;
b+=`<div class='vl'>${Object.keys(VE).map(k=>`<span><i class='vt vt-${k}'>${VE[k][0]}</i>${esc(VE[k][1])}</span>`).join('')}</div>`;
const sq=(s.sez||[]).filter(x=>!/^Ritorno/.test(x.h)),rt=(s.sez||[]).filter(x=>/^Ritorno/.test(x.h));
// Tabelle di riferimento (anatomia, ROM, scale) non legate a un test: richiudibili sotto il metodo
const rq=sq.map(x=>`<details class='vq'><summary>${esc(x.h)}</summary>${L(x.b)}</details>`).join('')+(s.tab||[]).map(t=>`<details class='vq'><summary>${esc(t.t)}</summary>${tab({...t,t:''})}</details>`).join('');
if(rq)b+=`<h3>Come si procede</h3>`+rq;
b+=`<h3>Tappe dell'esame</h3><p class='note'>${nt} test. Tocca una tappa per aprirla.</p>`;
b+=s.tp.map((p,i)=>{const ts=p.t.map(t=>t.length===1?`<div class='tt vg'>${esc(t[0])}</div>`:`<div class='vc' data-s='${t[2]}'><div class='vh'><b>${esc(t[0])}</b><span>${[...t[1]].map(k=>`<i class='vt vt-${k}'>${VE[k][0]}</i>`).join('')}</span></div><dl><dt>Come si fa</dt><dd>${esc(t[3])}</dd><dt>Cosa dice la letteratura</dt><dd>${esc(t[4])}</dd></dl><div class='vsit'>${[...t[2]].map(k=>VS[k]).join(' · ')}</div></div>`).join('');
const fl=i===0&&s.red?`<div class='flg'>${s.red.map(x=>`<div class='fl r'><b>Red flag</b>${esc(x)}</div>`).join('')}</div>`:'';
const qq=i===s.tp.length-1?quest(s):'';
return `<details class='tp'${i===0?' open':''}><summary><span class='tn'>${i+1}</span><span class='tl'>${esc(p.n)}</span><span class='tc'>${p.t.filter(t=>t.length>1).length}</span></summary><div class='tb'>${fl}${ts}${p.nt?`<p class='note'>${esc(p.nt)}</p>`:''}${(p.tab||[]).map(tab).join('')}${qq?`<div class='tt'>Questionari (collegamento al modulo)</div>`+qq:''}</div></details>`}).join('');
b+=`<p class='empty vno' hidden>Nessun test per questa situazione.</p>`;
if(rt.length||s.yel)b+=`<h3>Ritorno allo sport</h3>`+rt.map(x=>`<div class='tt'>${esc(x.h)}</div>${L(x.b)}`).join('')+(s.yel?`<div class='flg'>${s.yel.map(x=>`<div class='fl y'><b>Yellow flag</b>${esc(x)}</div>`).join('')}</div>`:'');
b+=sec('Fonti',s.f&&s.f.length?fonti(s):'');
return b}
// Filtro delle situazioni: nasconde i test non utili e le tappe rimaste vuote, apre quelle con risultati
function vfiltro(root,k){root.querySelectorAll('[data-vf]').forEach(x=>{const on=x.dataset.vf===k;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});
let tot=0;root.querySelectorAll('details.tp').forEach((d,i)=>{let n=0;d.querySelectorAll('.vc').forEach(c=>{const ok=!k||c.dataset.s.includes(k);c.hidden=!ok;if(ok)n++});
d.querySelectorAll('.vg').forEach(g=>{let e=g.nextElementSibling,ok=false;while(e&&e.classList.contains('vc')){if(!e.hidden)ok=true;e=e.nextElementSibling}g.hidden=!ok});
d.hidden=!n;d.querySelector('.tc').textContent=n;if(k)d.open=!!n;else d.open=i===0;tot+=n});
root.querySelector('.vno').hidden=!!tot}
// Riga dell'elenco: tocco → pagina della scheda. Nella ricerca globale mostra anche la sezione.
function row(s,tg){return `<a class='row sr' href='#/${s.d}/${encodeURIComponent(s.id)}' data-open='${esc(s.id)}' style='--dc:${DC[s.d].c}'><span class='rw'><b>${esc(s.t)}</b>${tg?`<span class='tag'>${esc(DC[s.d].l)}</span>`:''}<i class='chev'></i></span></a>`}
// Chi ha attivato "riduci movimento" salta allo scorrimento senza animazione
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches,SM=()=>RM()?'auto':'smooth';
const flat=s=>JSON.stringify(s).toLowerCase();
const q=document.getElementById('q'),list=document.getElementById('list'),nav=document.getElementById('nav'),cbar=document.getElementById('cbar');
let dist='Tutti',sid=null,cur=null,tick=false;
function bindSrc(root){root.querySelectorAll('input[data-k]').forEach(c=>c.onchange=()=>{ls(c.dataset.k,c.checked?'1':'0');c.parentElement.querySelector('label').textContent=c.checked?'✓ verificata su PubMed':'da verificare su PubMed';prog()})}
function draw(){const t=q.value.trim().toLowerCase();const home=dist==='Tutti'&&!t;
document.getElementById('tiles').style.display=t?'none':'';
const r=S.filter(s=>(dist==='Tutti'||s.d===dist)&&(t?flat(s).includes(t):!s.va));
list.innerHTML=home?'':(r.length?`<div class='lst'>${r.map(s=>row(s,dist==='Tutti')).join('')}</div>`:"<p class='empty'>Nessuna scheda trovata.</p>")}
// Numero di note personali (salvate da note.html) accanto alla voce Note della home
function nnote(){let k=0;try{const o=JSON.parse(localStorage.getItem('note'));if(Array.isArray(o))k=o.length}catch(e){}const m=document.getElementById('nnum');if(m)m.textContent=k?String(k):''}
function prog(){let tot=0,ok=0;S.forEach(s=>(s.f||[]).forEach((f,i)=>{tot++;if(ls('v:'+s.id+i)==='1')ok++}));const p=document.querySelector('.pg div'),m=document.getElementById('pgt');if(p)p.style.width=(tot?Math.round(ok/tot*100):0)+'%';if(m)m.textContent=`${ok} di ${tot}`}
const SH={'Red e yellow flags':'Flag','Trattamento ed evidenza':'Trattamento','Percorso per fasi':'Fasi','Esercizi e carichi':'Esercizi','Ritorno alla corsa e allo sport':'Ritorno','Caso clinico':'Caso'};
// Pagina della scheda: barra con "‹ Indietro" e titolo piccolo, titolo grande, corpo; la fila dei capitoli compare quando il titolo grande esce dallo schermo
function detail(s,from){const back=from==='Tutti'?'Home':DC[from].l;
document.body.classList.add('det');
nav.innerHTML=`<button class='back' data-back aria-label='Torna a ${esc(back)}'><i class='bk'></i><span class='bl'>${esc(back)}</span></button><span class='nt'>${esc(s.t)}</span>`;
document.getElementById('hero').innerHTML=`<div class='dh' style='--dc:${DC[s.d].c}'><span class='dk'>${esc(DC[s.d].l)}</span><h1>${esc(s.t)}</h1></div>`;
document.getElementById('tiles').style.display='none';
list.innerHTML=`<article class='grp sc${s.va?' va':''}' id='c-${esc(s.id)}' style='--dc:${DC[s.d].c}'><div class='body'>${s.va?vcard(s):card(s)}</div></article>`;
cur=list.firstElementChild;bindSrc(cur);
cbar.style.setProperty('--dc',DC[s.d].c);
cbar.innerHTML=`<div class='cb-in'><div class='cb-s'>${[...cur.querySelectorAll('.body>h3')].map((h,i)=>`<a data-h='${i}'>${esc(SH[h.textContent]||h.textContent.replace(/\s*\([^)]*\)/g,'').trim())}</a>`).join('')}</div></div>`}
function lista(){const n=d=>S.filter(s=>s.d===d&&!s.va).length;
document.body.classList.remove('det');cur=null;cbar.classList.remove('on');nav.classList.remove('tt');
// Niente menu delle sezioni: in home la barra sparisce, in una sezione resta solo "‹ Home"
document.body.classList.toggle('home',dist==='Tutti');
nav.innerHTML=dist==='Tutti'?'':`<button class='back' data-back aria-label='Torna alla home'><i class='bk'></i><span class='bl'>Home</span></button><span class='nt'>${esc(DC[dist].l)}</span>`;
const hero=document.getElementById('hero'),tl=document.getElementById('tiles');
if(dist==='Tutti'){hero.innerHTML=`<div class='hero'><h1>Schede cliniche</h1></div>`;
tl.innerHTML=`<p class='gh'>Sezioni</p><div class='grp'>${Object.keys(DC).map(k=>`<a class='row' data-go='${k}'><span class='ri' style='--dc:${DC[k].c}'>${DC[k].e}</span><span class='rw'><b>${DC[k].l}</b><span class='rc'>${n(k)}</span><i class='chev'></i></span></a>`).join('')}<a class='row' href='casi.html'><span class='ri' style='--dc:#6d28d9'>Cc</span><span class='rw'><b>Casi clinici</b><span class='rc'>15</span><i class='chev'></i></span></a><a class='row' href='note.html'><span class='ri' style='--dc:#a16207'>No</span><span class='rw'><b>Note</b><span class='rc' id='nnum'></span><i class='chev'></i></span></a></div><p class='gh'>Studio</p><div class='grp'><div class='pgc'><div class='pgr'><span>Fonti verificate su PubMed</span><span id='pgt'></span></div><div class='pg'><div></div></div></div></div>`;prog();nnote()}
else{hero.innerHTML=`<div class='ph' style='--dc:${DC[dist].c}'><h1>${DC[dist].l}</h1><p>${DC[dist].t} · ${n(dist)} schede</p></div>`;
// Esame del distretto: riquadro a parte, nel colore della sezione, sopra l'elenco delle patologie
const v=S.find(s=>s.d===dist&&s.va);tl.innerHTML=v?`<a class='vb' href='#/${v.d}/${encodeURIComponent(v.id)}' data-open='${esc(v.id)}' style='--dc:${DC[dist].c}'><span class='vbk'>Esame del distretto</span><b>Test, scale e test funzionali</b><span class='vbs'>${v.tp.reduce((n,x)=>n+x.t.filter(t=>t.length>1).length,0)} test in ${v.tp.length} tappe, nell'ordine in cui li fai</span><i class='chev'></i></a><p class='gh'>Patologie</p>`:''}
q.placeholder=dist==='Tutti'?'Cerca in tutte le schede…':'Cerca in '+DC[dist].l}
// Transizione da app: la scheda entra da destra ed esce verso destra (stesso percorso); con "riduci movimento" solo dissolvenza
function slide(dir){if(!dir||!document.body.animate)return;const k=RM()?[{opacity:0},{opacity:1}]:[{transform:`translateX(${dir*28}%)`,opacity:0},{transform:'none',opacity:1}];
['hero','main'].forEach(x=>{const e=x==='main'?document.querySelector('main'):document.getElementById(x);e.animate(k,{duration:RM()?150:320,easing:'cubic-bezier(.32,.72,0,1)'})})}
// Stato dalla URL: #/Sezione oppure #/Sezione/id-scheda
function parse(){const p=location.hash.replace(/^#\/?/,'').split('/').map(x=>{try{return decodeURIComponent(x)}catch(e){return ''}});
const s=p[1]&&S.find(x=>x.id===p[1]);sid=s?s.id:null;dist=s?(history.state&&history.state.from)||s.d:(DC[p[0]]?p[0]:'Tutti')}
function render(dir,st){if(sid){detail(S.find(x=>x.id===sid),dist);window.scrollTo(0,0)}else{lista();q.value=st&&st.q||'';draw();window.scrollTo(0,st&&st.y||0)}slide(dir);cb()}
const dep=()=>sid?2:dist!=='Tutti'?1:0;
function go(d){const b=dep();try{history.pushState(d==='Tutti'?null:{pushed:1},'','#/'+(d==='Tutti'?'':d))}catch(e){}dist=d;sid=null;render(Math.sign(dep()-b))}
function apri(id){const s=S.find(x=>x.id===id);try{history.replaceState({...(history.state||{}),q:q.value,y:scrollY},'');history.pushState({from:dist,pushed:1},'','#/'+s.d+'/'+encodeURIComponent(id))}catch(e){}sid=id;render(1)}
function back(){if(history.state&&history.state.pushed)history.back();else if(!sid){dist='Tutti';try{history.pushState(null,'','#/')}catch(e){}render(-1)}else{const s=S.find(x=>x.id===sid);try{history.pushState(null,'','#/'+s.d)}catch(e){}dist=s.d;sid=null;render(-1)}}
document.addEventListener('click',e=>{const f=e.target.closest('[data-vf]');if(f&&cur){vfiltro(cur,f.dataset.vf);return}
const o=e.target.closest('[data-open]');if(o){e.preventDefault();apri(o.dataset.open);return}
if(e.target.closest('[data-back]')){back();return}
const a=e.target.closest('[data-go]');if(a){e.preventDefault();go(a.dataset.go)}});
window.addEventListener('popstate',()=>{const b=dep();parse();render(Math.sign(dep()-b),history.state)});
// Mentre scorri la scheda: titolo piccolo nella barra e fila dei capitoli, con il capitolo in corso evidenziato
const navH=()=>nav.offsetHeight;
function cb(){tick=false;const y=navH(),h1=document.querySelector('.dh h1,.ph h1'),up=!!h1&&h1.getBoundingClientRect().bottom<y;
nav.classList.toggle('tt',up);if(!cur)return;if(up!==cbar.classList.contains('on')){cbar.classList.toggle('on',up);cbar.style.top=y+'px'}
if(!up)return;const lim=y+cbar.offsetHeight+12;let a=-1;cur.querySelectorAll('.body>h3').forEach((h,i)=>{if(h.getBoundingClientRect().top<lim)a=i});
const row=cbar.querySelector('.cb-s'),was=row.querySelector('.on'),now=row.children[a];if(was!==now){if(was)was.classList.remove('on');if(now){now.classList.add('on');row.scrollLeft=now.offsetLeft-16}}}
const cbq=()=>{if(!tick){tick=true;requestAnimationFrame(cb)}};
window.addEventListener('scroll',cbq,{passive:true});
cbar.addEventListener('click',e=>{const h=e.target.closest('[data-h]');if(!h||!cur)return;const t=cur.querySelectorAll('.body>h3')[h.dataset.h];window.scrollTo({top:t.getBoundingClientRect().top+scrollY-navH()-cbar.offsetHeight-8,behavior:SM()})});
const tb=document.getElementById('top');window.addEventListener('scroll',()=>{tb.style.display=window.scrollY>600?'block':'none'},{passive:true});tb.onclick=()=>window.scrollTo({top:0,behavior:SM()});
q.oninput=draw;
parse();render(0,history.state);
