// Biblioteca: archivio unico degli studi. Ogni studio compare una volta, con un codice (autore + anno).
// Le schede lo richiamano con il codice (campo `schede` qui sotto).
// Campi:
//   t: titolo originale · a: autori · y: anno · j: rivista e citazione
//   tipo: Linea guida | Revisione sistematica | RCT | Coorte | ... · ev: certezza delle prove (come dichiarata dallo studio)
//   pmid / doi / pmc: SOLO se verificati su PubMed · open: true se il testo completo è libero
//   sintesi: 1-2 frasi con parole nostre
//   dimostra: cosa dice lo studio (risultati e conclusioni) — "Dallo studio"
//   pratica: proposte operative per la clinica, non validate come soglie — "In pratica"
//   schede: id delle schede collegate · v: data della verifica dei dati su PubMed
const ST={
kotsifaki2023:{
t:`Aspetar clinical practice guideline on rehabilitation after anterior cruciate ligament reconstruction`,
a:`Kotsifaki R, Korakakis V, King E, et al.`,y:2023,j:`Br J Sports Med 2023;57(9):500-514`,
tipo:`Linea guida`,ev:`Molto bassa per la maggior parte delle componenti; molte raccomandazioni nascono dal consenso di esperti`,
pmid:`36731908`,doi:`10.1136/bjsports-2022-106158`,pmc:`PMC11785408`,open:true,v:`2026-10-15`,
sintesi:`Linea guida sulla riabilitazione dopo ricostruzione del LCA, costruita su RCT e revisioni sistematiche secondo AGREE II e GRADE.`,
dimostra:[
`L'esercizio è il cardine della riabilitazione dopo ricostruzione del LCA.`,
`Ci sono poche prove sul rapporto dose-risposta tra volume o intensità dell'esercizio ed esiti.`,
`Le terapie fisiche strumentali possono aiutare come complemento nella fase precoce, quando ci sono dolore, gonfiore e ROM limitato, e possono permettere di iniziare prima l'esercizio senza dolore.`,
`Ritorno alla corsa e ritorno all'allenamento sono tappe chiave, ma non ci sono prove su quali criteri di progressione o di dimissione usare.`],
pratica:[
`Fase precoce: priorità a estensione completa e alla lotta all'inibizione artrogena (AMI), con NMES e crioterapia associate all'esercizio.`,
`Si avanza per criteri, non per calendario: un sistema "a semafori" per avanzare o tornare indietro.`,
`Ritorno alla corsa: tra gli altri criteri, LSI del quadricipite >80%.`,
`Rientro allo sport: forza ≥95% come soglia operativa; negli sport con pivot ad alta richiesta Aspetar propone forza isocinetica prossima al 100%.`],
schede:[`lca-ricostruzione`]}
};
