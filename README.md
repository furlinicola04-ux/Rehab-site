# Schede cliniche · Ortopedia e sport

Sito statico di schede per studio, ripasso e pratica clinica. Nessuna installazione: basta aprire `index.html`.

## Struttura
```
index.html            pagina unica (home, sezioni e ricerca sono generate dal codice)
css/style.css         grafica
js/fonti-corso.js     etichette delle fonti (lezioni UNIBS, testi). Si carica per primo
js/schede-base.js     schede di base + funzione M() che le estende
js/schede-<sezione>.js  le schede, un file per sezione
js/app.js             logica: home, navigazione, ricerca, spunta fonti
sw.js                 service worker: salva il sito nel telefono per usarlo offline
manifest.webmanifest  nome e icone dell'app installata (img/app-192.png, img/app-512.png)
```

## Aggiungere una scheda
1. Apri il file della sezione (es. `js/schede-spalla.js`).
2. Copia una scheda `S.push({...})` esistente e cambia `id` (unico), `t` (titolo) e i contenuti.
3. `d` deve essere una sezione esistente (Spalla, Gomito, Mano, Anca, Ginocchio, Caviglia, Colonna, Muscoli, Principi).
4. Salva e ricarica `index.html`.

Nuova sezione: aggiungi la voce in `DC` dentro `js/app.js`, crea `js/schede-<nome>.js` e aggiungi la riga `<script>` in `index.html` prima di `app.js`.

## Pubblicare
Il sito è pubblicato con **GitHub Pages**: https://furlinicola04-ux.github.io/Rehab-site/
Ogni commit su `main` viene pubblicato da solo in uno o due minuti (Settings → Pages: branch `main`, cartella `/ (root)`). Nessun comando di build.

Attenzione: il repository è pubblico, quindi tutto quello che c'è dentro (anche CLAUDE.md e README) è visibile a chiunque.

## Flusso di lavoro (Claude Code + GitHub Desktop)
1. Chiedi la modifica a Claude Code (es. "aggiungi la scheda X nella sezione Ginocchio").
2. Claude modifica i file e controlla il sito nel browser (console, sezioni, ricerca, numero di schede).
3. Controlla le modifiche (diff) e, se vanno bene, Claude fa il commit con un messaggio in italiano.
4. In GitHub Desktop premi **Push origin** per inviare i commit su GitHub.
5. Se lavori anche da un altro computer, prima di iniziare premi **Fetch origin** e poi **Pull origin**.

Repository: https://github.com/furlinicola04-ux/Rehab-site (pubblico)

## Offline
Il sito funziona anche senza connessione dopo la prima apertura online (su https). Da iPhone: Safari → Condividi → "Aggiungi alla schermata Home". Se aggiungi un nuovo file `js/schede-<sezione>.js`, aggiungilo anche all'elenco `FILES` in `sw.js` e aumenta `VERSION`.

## Note
- La spunta "verificata su PubMed" è salvata solo nel browser in uso (localStorage).
- Non inserire mai dati di pazienti, nemmeno anonimizzati.
