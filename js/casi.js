// Casi clinici simulati. I dati sono in js/casi-dati.js (CASI). Ogni caso ha quattro passaggi:
// Caso (presentazione) → Esame (valutazione scritta libera nei nove aspetti, reperti rivelati solo alla fine)
// → Piano (diagnosi, obiettivi, fasi con esercizi e dosaggi, criteri di rientro) → Revisione (lacune + testo da incollare in chat).
// Le risposte restano salvate solo in questo browser (localStorage), una chiave per caso.
const CATS=["Anamnesi","Ispezione","Sensibilità","Dolore","Mobilità","Forza","Funzione","Test specifici","Imaging"];
// Colori e nomi delle sezioni: gli stessi di DC in js/app.js
const SEZ={Spalla:['#2563eb','Spalla'],Gomito:['#7c3aed','Gomito'],Mano:['#0e7490','Mano e polso'],Anca:['#dc2626','Anca'],Ginocchio:['#047857','Ginocchio'],Caviglia:['#b45309','Caviglia e piede'],Testa:['#0f766e','Testa e collo'],Colonna:['#475569','Colonna'],Muscoli:['#db2777','Lesioni muscolari']};
const OB=[["b","Breve termine"],["m","Medio termine"],["l","Lungo termine"]];
const EXF=[["n","Esercizio"],["dos","Serie × ripetizioni o tempo"],["int","Intensità (carico, RPE, dolore max)"],["freq","Frequenza e recupero"],["prog","Progressione"]];
const TABS=[["caso","Caso"],["esame","Esame"],["piano","Piano"],["revisione","Revisione"]];
const STOP="della,delle,dello,degli,sulla,sullo,dopo,prima,test,altro,esame,voci,caso,palpazione,misurazione,forza,movimento,destra,sinistra".split(",");
const nav=document.getElementById('nav'),hero=document.getElementById('hero'),view=document.getElementById('view');
let C=null,S=null,conf=false;

function h(tag,a,kids){const e=document.createElement(tag);if(a)for(const k in a){const v=a[k];if(k==='class')e.className=v;else if(k==='text')e.textContent=v;else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),v);else if(v!==false&&v!=null)e.setAttribute(k,v===true?'':v)}(kids||[]).forEach(c=>{if(c!=null)e.appendChild(typeof c==='string'?document.createTextNode(c):c)});return e}
const norm=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function toast(m){document.querySelectorAll('.toast').forEach(x=>x.remove());const t=h('div',{class:'toast',role:'status',text:m});document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
const newEx=()=>({n:'',dos:'',int:'',freq:'',prog:''});
const newFase=()=>({nome:'',dur:'',obj:'',crit:'',ex:[newEx()]});
const blank=()=>({tab:'caso',ev:{},rev:false,done:false,plan:{diag:'',ob:{},fasi:[newFase(),newFase(),newFase()],rtp:[{c:'',t:'',s:''},{c:'',t:'',s:''},{c:'',t:'',s:''}]}});
function load(id){let o=null;try{o=JSON.parse(localStorage.getItem('caso:'+id))}catch(e){}const b=blank();if(!o||typeof o!=='object'){if(fatto(id)){b.done=true;b.rev=true}return b}
const p=o.plan&&typeof o.plan==='object'?o.plan:{};
return {tab:o.tab||'caso',ev:o.ev&&typeof o.ev==='object'?o.ev:{},rev:!!o.rev||fatto(id),done:!!o.done||fatto(id),plan:{diag:p.diag||'',ob:p.ob||{},fasi:Array.isArray(p.fasi)&&p.fasi.length?p.fasi:b.plan.fasi,rtp:Array.isArray(p.rtp)&&p.rtp.length?p.rtp:b.plan.rtp}}}
function save(){try{localStorage.setItem('caso:'+C.id,JSON.stringify(S))}catch(e){}}
function fatto(id){const c=CASI.find(x=>x.id===id);return !!(c&&c.fatto)}
function stato(id){let o=null;try{o=JSON.parse(localStorage.getItem('caso:'+id))}catch(e){}if(fatto(id)||(o&&o.done))return['concluso','fin'];if(!o)return['da fare',''];return['in corso','on']}
// Una voce risulta "citata" se il testo dell'aspetto contiene una parola lunga del nome o dei sinonimi: controllo approssimativo
function cited(it){const t=norm(S.ev[it.c]);if(!t.trim())return false;return norm(it.l+' '+(it.a||'')).split(/[^a-z0-9]+/).filter(x=>x.length>=5&&!STOP.includes(x)).some(x=>t.includes(x))}

// ---- Elenco dei casi
function elenco(){C=null;document.body.classList.remove('home');document.title='Casi clinici · Schede cliniche';
nav.innerHTML='';nav.appendChild(h('a',{class:'back',href:'index.html','aria-label':'Torna alla home'},[h('i',{class:'bk'}),h('span',{class:'bl',text:'Home'})]));
hero.innerHTML=`<div class='ph' style='--dc:#6d28d9'><h1>Casi clinici</h1><p>${CASI.length} casi simulati · valutazione, piano e rientro</p></div>`;
view.innerHTML='';const w=h('div',{class:'cv'});
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Come funziona'}),
 h('p',{class:'hint',text:"Leggi la presentazione, scrivi la tua valutazione nei nove aspetti senza vedere nulla, poi l'app rivela i reperti. Scrivi il piano e, nella Revisione, vedi le voci importanti che non hai citato e copi il testo da incollare in chat per la correzione."})]));
const ds=[...new Set(CASI.map(c=>c.d))];
ds.forEach(d=>{const col=(SEZ[d]||['#6b7280',d]);w.appendChild(h('p',{class:'gh',text:col[1]}));
 const g=h('div',{class:'grp'});
 CASI.filter(c=>c.d===d).forEach(c=>{const st=stato(c.id);
  g.appendChild(h('a',{class:'row',href:'#'+c.id,style:'--dc:'+col[0]},[h('span',{class:'ri',style:'--dc:'+col[0],text:'C'+(CASI.indexOf(c)+1)}),
   h('span',{class:'rw'},[h('span',{class:'tx'},[h('b',{text:c.t}),h('span',{class:'sub',text:c.chips.slice(0,2).join(' · ')})]),h('span',{class:'st '+st[1],text:st[0]}),h('i',{class:'chev'})])]))});
 w.appendChild(g)});
view.appendChild(w)}

// ---- Caso
function apri(c){if(!C||C.id!==c.id){C=c;S=load(c.id);conf=false}
document.title=c.t+' · Casi clinici';
nav.innerHTML='';nav.appendChild(h('a',{class:'back',href:'#','aria-label':"Torna all'elenco dei casi"},[h('i',{class:'bk'}),h('span',{class:'bl',text:'Casi'})]));
const col=SEZ[c.d]||['#6b7280',c.d];
hero.innerHTML='';hero.appendChild(h('div',{class:'ph',style:'--dc:'+col[0]},[h('h1',{text:'Caso '+(CASI.indexOf(c)+1)}),h('p',{text:c.t})]));
const tb=h('div',{class:'ctabs',role:'tablist'});
TABS.forEach(t=>tb.appendChild(h('button',{role:'tab','aria-selected':S.tab===t[0]?'true':'false',disabled:t[0]==='revisione'&&!S.done,text:t[1],onclick:()=>{S.tab=t[0];conf=false;save();disegna();window.scrollTo(0,0)}})));
view.innerHTML='';view.appendChild(tb);
if(S.tab==='revisione'&&!S.done)S.tab='caso';
view.appendChild(S.tab==='esame'?esame():S.tab==='piano'?piano():S.tab==='revisione'?revisione():caso())}

function caso(){const w=h('div',{class:'cv'});
w.appendChild(h('div',{class:'ccard'},[h('div',{class:'chips'},C.chips.map(x=>h('span',{class:'chip',text:x}))),h('p',{class:'ctx',text:C.testo})]));
w.appendChild(h('div',{class:'ccard'},[h('p',{class:'hint',text:'Le risposte si salvano da sole in questo dispositivo.'}),
 h('div',{class:'crow'},[h('button',{class:'cbtn',text:"Inizia l'esame",onclick:()=>{S.tab='esame';save();disegna();window.scrollTo(0,0)}}),
  h('button',{class:'cbtn gs',text:'Ricomincia da zero',onclick:()=>{if(conf==='reset'){S=blank();conf=false;save();disegna();toast('Caso azzerato')}else{conf='reset';disegna()}}})]),
 conf==='reset'?h('p',{class:'hint',text:'Tocca di nuovo «Ricomincia da zero» per cancellare valutazione e piano di questo caso.'}):null]));
return w}

function esame(){const w=h('div',{class:'cv'});
if(!S.rev)w.appendChild(h('p',{class:'hint',text:'Scrivi, per ciascun aspetto, tutto ciò che chiederesti o valuteresti e come. Lascia vuoto ciò che non faresti. Nessun reperto finché non concludi.'}));
CATS.forEach((cn,ci)=>{const ta=h('textarea',{id:'ev'+ci,readonly:S.rev});ta.value=S.ev[ci]||'';ta.addEventListener('input',()=>{S.ev[ci]=ta.value;save()});
 w.appendChild(h('div',{class:'ccard'},[h('label',{for:'ev'+ci,class:'big',text:cn}),ta]))});
if(!S.rev){w.appendChild(h('div',{class:'ccard'},[conf==='rev'?h('div',{class:'crow'},[h('button',{class:'cbtn wn',text:'Sì, rivela',onclick:()=>{S.rev=true;conf=false;save();disegna();window.scrollTo(0,0)}}),h('button',{class:'cbtn gs',text:'Torna indietro',onclick:()=>{conf=false;disegna()}})]):h('button',{class:'cbtn',text:'Ho finito: rivela la valutazione',onclick:()=>{conf='rev';disegna()}}),
 conf==='rev'?h('p',{class:'hint',text:'Dopo la rivelazione il testo non si modifica più.'}):null]));return w}
w.appendChild(h('p',{class:'hint',text:"Reperti del caso. «Citato» vuol dire che il tuo testo di quell'aspetto contiene una parola legata alla voce: è un controllo automatico approssimativo, verificalo tu. ★ = voce importante per il caso."}));
CATS.forEach((cn,ci)=>{const L=C.items.filter(x=>x.c===ci);if(!L.length)return;
 const d=h('details',{class:'cat',open:true},[h('summary',{text:cn})]);
 L.forEach(it=>{const c=cited(it);d.appendChild(h('div',{class:'it'},[h('div',{class:'ith'},[h('span',{text:it.l+(it.k?' ★':'')}),h('span',{class:c?'ok':'no',text:c?'citato':'non citato'})]),h('div',{class:'find',text:it.t})]))});
 w.appendChild(d)});
return w}

function fld(label,val,set,area){const id='p'+Math.random().toString(36).slice(2,8);const el=area?h('textarea',{id}):h('input',{type:'text',id});el.value=val||'';el.addEventListener('input',()=>{set(el.value);save()});return h('div',{class:'fld'},[h('label',{for:id,text:label}),el])}
const xb=(t,fn)=>h('button',{class:'xb',type:'button','aria-label':t,text:'Togli',onclick:fn});
function piano(){const P=S.plan,w=h('div',{class:'cv'});
w.appendChild(h('p',{class:'hint',text:'Scrivi con parole tue. Nella Revisione trovi tutto in un testo da copiare in chat.'}));
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Ipotesi diagnostica'}),fld('Diagnosi e diagnosi differenziali',P.diag,v=>{P.diag=v},1)]));
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Obiettivi'}),h('span',{class:'hint',text:'Per ognuno: cosa, entro quando, con quale misura.'})].concat(OB.map(o=>fld(o[1],P.ob[o[0]],v=>{P.ob[o[0]]=v},1)))));
w.appendChild(h('h3',{text:'Fasi, esercizi e dosaggi',style:'margin:8px 0 0'}));
w.appendChild(h('p',{class:'hint',text:'Ogni fase segue lo stesso schema: obiettivi della fase, esercizi con il loro dosaggio, criteri per passare alla fase successiva.'}));
P.fasi.forEach((f,fi)=>{const b=h('div',{class:'ccard fase'},[h('div',{class:'bar'},[h('span',{class:'eyb',text:'Fase '+(fi+1)}),P.fasi.length>1?xb('Togli la fase '+(fi+1),()=>{P.fasi.splice(fi,1);save();disegna()}):null]),
 h('div',{class:'g2'},[fld('Nome e scopo',f.nome,v=>{f.nome=v}),fld('Quando inizia e durata indicativa',f.dur,v=>{f.dur=v})]),
 fld('Obiettivi della fase (collegali a breve, medio, lungo)',f.obj,v=>{f.obj=v},1)]);
 f.ex.forEach((e,ei)=>b.appendChild(h('div',{class:'ex2'},[h('div',{class:'bar'},[h('span',{class:'sl',text:'Esercizio '+(ei+1)}),f.ex.length>1?xb("Togli l'esercizio "+(ei+1),()=>{f.ex.splice(ei,1);save();disegna()}):null]),
  fld(EXF[0][1],e.n,v=>{e.n=v}),h('div',{class:'g2'},EXF.slice(1).map(x=>fld(x[1],e[x[0]],v=>{e[x[0]]=v})))])));
 b.appendChild(h('button',{class:'cbtn gs sm',type:'button',text:'Aggiungi esercizio',onclick:()=>{f.ex.push(newEx());save();disegna()}}));
 b.appendChild(fld('Criteri per passare alla fase successiva',f.crit,v=>{f.crit=v},1));w.appendChild(b)});
w.appendChild(h('button',{class:'cbtn gs',type:'button',text:'Aggiungi fase',onclick:()=>{P.fasi.push(newFase());save();disegna()}}));
const r=h('div',{class:'ccard'},[h('h3',{text:'Criteri di rientro al rugby'}),h('span',{class:'hint',text:'Un criterio per blocco: cosa valuti, con quale test, quale soglia.'})]);
P.rtp.forEach((c,ci)=>r.appendChild(h('div',{class:'ex2'},[h('div',{class:'bar'},[h('span',{class:'sl',text:'Criterio '+(ci+1)}),P.rtp.length>1?xb('Togli il criterio '+(ci+1),()=>{P.rtp.splice(ci,1);save();disegna()}):null]),
 fld('Criterio',c.c,v=>{c.c=v}),h('div',{class:'g2'},[fld('Test',c.t,v=>{c.t=v}),fld('Soglia',c.s,v=>{c.s=v})])])));
r.appendChild(h('button',{class:'cbtn gs sm',type:'button',text:'Aggiungi criterio',onclick:()=>{P.rtp.push({c:'',t:'',s:''});save();disegna()}}));
w.appendChild(r);
if(!S.done)w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Hai finito?'}),h('p',{class:'hint',text:S.rev?'Concludere sblocca la Revisione: diagnosi del caso, voci importanti non citate e testo per la chat.':'Prima di concludere rivela la valutazione nella scheda Esame.'}),
 !S.rev?null:conf==='end'?h('div',{class:'crow'},[h('button',{class:'cbtn wn',text:'Sì, concludi',onclick:()=>{S.done=true;S.tab='revisione';conf=false;save();disegna();window.scrollTo(0,0)}}),h('button',{class:'cbtn gs',text:'Torna indietro',onclick:()=>{conf=false;disegna()}})]):h('button',{class:'cbtn',text:'Concludi e vedi le lacune',onclick:()=>{conf='end';disegna()}})]));
else w.appendChild(h('button',{class:'cbtn',text:'Vai alla Revisione',onclick:()=>{S.tab='revisione';save();disegna();window.scrollTo(0,0)}}));
return w}

function testo(){const P=S.plan,T=v=>(v||'').trim()||'(non compilato)';
const L=['CASO CLINICO dall\'app Schede cliniche: '+C.t,C.chips.join(', '),'',C.testo,'','DIAGNOSI DEL CASO (soluzione dell\'app)',C.diag,'','LA MIA VALUTAZIONE E I REPERTI'];
CATS.forEach((cn,ci)=>{L.push('',cn.toUpperCase(),'Cosa avevo scritto: '+T(S.ev[ci]));const it=C.items.filter(x=>x.c===ci);if(it.length){L.push('Reperti:');it.forEach(x=>L.push('- '+x.l+(x.k?' (importante)':'')+': '+x.t))}});
L.push('','IL MIO PIANO','','IPOTESI DIAGNOSTICA',T(P.diag),'','OBIETTIVI');OB.forEach(o=>L.push('- '+o[1]+': '+T(P.ob[o[0]])));
P.fasi.forEach((f,fi)=>{L.push('','FASE '+(fi+1)+': '+T(f.nome)+' | '+T(f.dur),'Obiettivi: '+T(f.obj),'Esercizi:');f.ex.forEach((e,ei)=>L.push('  '+(ei+1)+'. '+T(e.n)+' | dosaggio: '+T(e.dos)+' | intensità: '+T(e.int)+' | frequenza: '+T(e.freq)+' | progressione: '+T(e.prog)));L.push('Criteri per passare alla fase successiva: '+T(f.crit))});
L.push('','CRITERI DI RIENTRO AL RUGBY');P.rtp.forEach((c,i)=>L.push((i+1)+'. '+T(c.c)+' | test: '+T(c.t)+' | soglia: '+T(c.s)));
const miss=C.items.filter(x=>x.k&&!cited(x));L.push('','VOCI IMPORTANTI NON CITATE NELLA MIA VALUTAZIONE ('+miss.length+')');miss.forEach(x=>L.push('- '+CATS[x.c]+': '+x.l));
L.push('','Correggi il mio ragionamento: cosa è corretto, cosa manca, errori, e riferimenti in letteratura, distinguendo ciò che è dimostrato da ciò che è proposta operativa. Concentrati sugli aspetti biologici (valutazione, obiettivi, fasi, esercizi, rientro).');
return L.join('\n')}

function revisione(){const w=h('div',{class:'cv'}),K=C.items.filter(x=>x.k),got=K.filter(cited),miss=K.filter(x=>!cited(x));
const parole=Object.values(S.ev).join(' ').trim().split(/\s+/).filter(Boolean).length;
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Diagnosi del caso'}),h('p',{class:'diag',text:C.diag}),
 h('div',{class:'crow'},C.schede.map(([id,lab])=>h('a',{class:'cbtn gs sm',href:'index.html#/'+C.d+'/'+encodeURIComponent(id),text:'Scheda: '+lab})))]));
w.appendChild(h('div',{class:'ccard'},[h('div',{class:'stat'},[h('div',{},[h('strong',{text:got.length+'/'+K.length}),h('span',{text:'voci importanti citate'})]),h('div',{},[h('strong',{text:String(parole)}),h('span',{text:'parole nella valutazione'})])])]));
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Importanti non citate ('+miss.length+')'}),
 miss.length?h('ul',{class:'glist'},miss.map(x=>h('li',{class:'gap'},[h('b',{text:CATS[x.c]+' · '+x.l}),h('span',{text:x.w||''}),x.s?h('small',{text:'Fonte: '+x.s}):null]))):h('div',{class:'gap g'},[h('b',{text:'Hai citato tutte le voci importanti.'})])]));
if(got.length){const d=h('details',{class:'cat'},[h('summary',{text:'Importanti già citate ('+got.length+')'})]);got.forEach(x=>d.appendChild(h('div',{class:'it'},[h('b',{text:CATS[x.c]+' · '+x.l}),h('span',{class:'hint',text:x.w||''})])));w.appendChild(d)}
const ta=h('textarea',{class:'sum',readonly:true,'aria-label':'Testo da copiare in chat'});ta.value=testo();
w.appendChild(h('div',{class:'ccard'},[h('h3',{text:'Testo per la correzione in chat'}),h('p',{class:'hint',text:'Copialo e incollalo nella chat con Claude.'}),ta,
 h('button',{class:'cbtn',text:'Copia il testo',onclick:()=>{const fb=()=>{ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);toast('Testo selezionato: copialo a mano')};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(ta.value).then(()=>toast('Testo copiato'),fb);else fb()}})]));
return w}

function disegna(){const id=decodeURIComponent(location.hash.slice(1));const c=CASI.find(x=>x.id===id);if(c)apri(c);else elenco()}
window.addEventListener('hashchange',()=>{conf=false;disegna();window.scrollTo(0,0)});
disegna();
