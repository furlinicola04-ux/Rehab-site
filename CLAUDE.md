# Schede cliniche · Ortopedia e sport

Sito statico personale (HTML/CSS/JS, nessun build) di schede di riabilitazione ortopedica e sportiva, per studio, ripasso e pratica clinica. Autore: studente di fisioterapia che gioca a rugby (serie A2). Rispondi sempre in italiano e spiega le scelte in modo approfondito.

## Struttura
- `index.html`: pagina unica. Home, sezioni e ricerca sono generate da `js/app.js`.
- `css/style.css`: grafica.
- `js/fonti-corso.js`: etichette delle fonti (lezioni UNIBS, testi). Si carica PER PRIMO.
- `js/schede-base.js`: schede di base e funzione `M()` che le estende.
- `js/schede-<sezione>.js`: le schede, un file per sezione (spalla, gomito, mano, anca, ginocchio, caviglia, colonna, muscoli, principi).
- `js/studi.js`: Biblioteca, archivio unico degli studi (`ST`, un codice per studio: autore+anno). Ogni studio ha `dimostra` (Dallo studio) e `pratica` (proposte operative), più `schede` collegate. Pagina: `#/Biblioteca/<codice>`.
- `js/app.js`: logica. Contiene `DC` (elenco sezioni con colore, sigla di due lettere nel campo `e`, descrizione). Niente emoji nell'interfaccia.
- L'ordine dei `<script>` in `index.html` è vincolante: fonti → base → sezioni → studi → app.

## Regole per ogni scheda
- Campi: inquadramento (`inq`), red/yellow flag (`red`, `yel`), test clinici (`tst`), esercizi (`ex`), fasi con obiettivi ed esercizi collegati (`fasi`), evidenza (`ev`), criteri di rientro (`rts`), fonti (`f`).
- Collegare sempre fasi, obiettivi ed esercizi (tabella/matrice).
- Criteri di rientro al rugby: spiegati e schematizzati, UN criterio per blocco, mai tutti di seguito sulla stessa riga.
- Ogni `id` è unico. `d` deve essere una chiave di `DC`.
- Grafica colorata e leggibile da telefono; non rompere il tema scuro.

## Fonti (regola critica)
- Non inventare riferimenti. Se non sei sicuro di una fonte, dillo.
- Ogni fonte ha titolo e stringa di ricerca PubMed; aggiungi PMID o DOI solo se verificati.
- Distingui ciò che è validato in letteratura da ciò che è una proposta operativa (serie, ripetizioni, RPE, soglie).
- L'utente verifica le fonti su PubMed e spunta la casella nel sito.
- Nella Biblioteca: `dimostra` contiene solo ciò che dice lo studio; `pratica` contiene le proposte operative, sempre presentate come non validate. PMID/DOI/PMC solo se verificati su PubMed, con data in `v`.
- PDF di articoli non open access, libri e slide dei docenti non vanno mai nella cartella del sito (è pubblico): si linkano con PubMed/DOI.

## Vincoli
- Nessun dato di pazienti, nemmeno anonimizzati.
- Il sito è materiale di studio: non sostituisce il giudizio clinico.
- Non cambiare i contenuti clinici già rifiniti se non richiesto.

## Verifica dopo ogni modifica
- Aprire `index.html` in un browser e controllare: nessun errore in console, home, ogni sezione, ricerca.
- Contare le schede (oggi 62) e controllare che non ne sparisca nessuna.

## Git
- Commit piccoli, messaggi in italiano, uno per scheda o per funzione.
