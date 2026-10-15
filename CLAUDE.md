# Schede cliniche · Ortopedia e sport

Sito statico personale (HTML/CSS/JS, nessun build) di schede di riabilitazione ortopedica e sportiva, per studio, ripasso e pratica clinica. Autore: studente di fisioterapia che gioca a rugby (serie A2). Rispondi sempre in italiano e spiega le scelte in modo approfondito.

## Struttura
- `index.html`: pagina unica. Home, sezioni e ricerca sono generate da `js/app.js`.
- `css/style.css`: grafica.
- `js/fonti-corso.js`: etichette delle fonti (lezioni UNIBS, testi). Si carica PER PRIMO.
- `js/schede-base.js`: schede di base e funzione `M()` che le estende.
- `js/schede-<sezione>.js`: le schede, un file per sezione (spalla, gomito, mano, anca, ginocchio, caviglia, colonna, muscoli, principi).
- `js/app.js`: logica. Contiene `DC` (elenco sezioni con colore, sigla di due lettere nel campo `e`, descrizione). Niente emoji nell'interfaccia.
- `sw.js` + `manifest.webmanifest`: funzionamento offline e app installabile. Un nuovo file js va aggiunto a `FILES` in `sw.js` (e va aumentata `VERSION`).
- L'ordine dei `<script>` in `index.html` è vincolante: fonti → base → sezioni → app.

## Regole per ogni scheda
- Campi: inquadramento (`inq`), red/yellow flag (`red`, `yel`), test clinici (`tst`), esercizi (`ex`), fasi con obiettivi ed esercizi collegati (`fasi`), evidenza (`ev`), criteri di rientro (`rts`), fonti (`f`).
- Collegare sempre fasi, obiettivi ed esercizi (tabella/matrice).
- Ordine dei capitoli nella pagina (fisso, in `card()` di `js/app.js`): Punti chiave → Inquadramento → Red e yellow flags → Valutazione → Trattamento ed evidenza → Percorso per fasi → Esercizi e carichi → Ritorno alla corsa e allo sport → Prevenzione → Caso clinico → Fonti.
- Tabelle (`tab`) e sezioni extra (`sez`) diventano sottotitoli dentro il loro capitolo: la mappa per titolo è `ZT` in `js/app.js`. Per una tabella o sezione nuova aggiungere il campo `z` (I, F, V, T, P, E, R, X, C) oppure il titolo in `ZT`; senza, finisce in Inquadramento.
- Criteri di rientro al rugby: spiegati e schematizzati, UN criterio per blocco, mai tutti di seguito sulla stessa riga.
- Ogni `id` è unico. `d` deve essere una chiave di `DC`.
- Grafica colorata e leggibile da telefono; non rompere il tema scuro.

## Fonti (regola critica)
- Non inventare riferimenti. Se non sei sicuro di una fonte, dillo.
- Ogni fonte ha titolo e stringa di ricerca PubMed; aggiungi PMID o DOI solo se verificati.
- Distingui ciò che è validato in letteratura da ciò che è una proposta operativa (serie, ripetizioni, RPE, soglie).
- L'utente verifica le fonti su PubMed e spunta la casella nel sito.

## Integrare nuovi studi (PDF)
- L'utente mette i PDF in `/Users/nicolafurli/Documents/studi-rehab` (FUORI dal sito). I PDF non vanno mai copiati nella cartella del sito: è pubblico.
- Claude legge il PDF e integra le informazioni nelle schede delle patologie esistenti (inq, tst, ex, fasi, ev, rts), rielaborate con parole proprie, e aggiunge lo studio alle fonti `f` con PMID/DOI verificati su PubMed.
- Nella scheda distinguere sempre ciò che lo studio dimostra dalle proposte operative.
- Se lo studio contraddice contenuti già rifiniti: segnalarlo e chiedere prima di cambiarli.
- Prima di modificare, mostrare all'utente cosa si propone di cambiare e in quali schede.

## Vincoli
- Nessun dato di pazienti, nemmeno anonimizzati.
- Il sito è materiale di studio: non sostituisce il giudizio clinico.
- Non cambiare i contenuti clinici già rifiniti se non richiesto.

## Verifica dopo ogni modifica
- Aprire `index.html` in un browser e controllare: nessun errore in console, home, ogni sezione, ricerca.
- Contare le schede (oggi 62) e controllare che non ne sparisca nessuna.

## Git
- Commit piccoli, messaggi in italiano, uno per scheda o per funzione.
