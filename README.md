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
```

## Aggiungere una scheda
1. Apri il file della sezione (es. `js/schede-spalla.js`).
2. Copia una scheda `S.push({...})` esistente e cambia `id` (unico), `t` (titolo) e i contenuti.
3. `d` deve essere una sezione esistente (Spalla, Gomito, Mano, Anca, Ginocchio, Caviglia, Colonna, Muscoli, Principi).
4. Salva e ricarica `index.html`.

Nuova sezione: aggiungi la voce in `DC` dentro `js/app.js`, crea `js/schede-<nome>.js` e aggiungi la riga `<script>` in `index.html` prima di `app.js`.

## Pubblicare
- **Netlify**: su app.netlify.com, "Add new site" → "Deploy manually" → trascina l'intera cartella.
- **GitHub + Netlify/Cloudflare Pages**: carica la cartella in un repository; come comando di build lascia vuoto, cartella di pubblicazione `/`.

## Note
- La spunta "verificata su PubMed" è salvata solo nel browser in uso (localStorage).
- Non inserire mai dati di pazienti, nemmeno anonimizzati.
