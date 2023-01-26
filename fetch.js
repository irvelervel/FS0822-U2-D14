// import data from './' <-- metodo generico per richiamare il contenuto di un file
// JSON dentro il codice

// ESERCIZI SULLE FETCH!

// fetch('https://jsonplaceholder.typicode.com/albums')
// questa è una fetch() valida! fa partire una REQUEST dal nostro browser
// fetch() torna una PROMISE! sappiamo come gestire una Promise

const thenExample = function () {
  // risolviamo la fetch con il metodo dei .then() e .catch()
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then(function (res) {
      // cosa faccio quando l'operazione va a buon fine?
      // ok, abbiamo qualcosa!
      // finiremo nel .then() quando l'operazione È FINITA e È ANDATA A BUON FINE
      // qui dentro ho la Response con cui lavorare!
      // la response è il parametro di then!
      console.log('questa è la RESPONSE del server!', res)
      // res è la RESPONSE del SERVER
      // un oggetto con tante proprietà, le più importanti che andremo a valutare
      // sono "ok" e "status"
      // "ok" ci restituisce un booleano con l'outcome dell'operazione
      // "status" ci torna il codice numerico dell'operazione
      if (res.ok) {
        // trasformiamo il body in un oggetto SOLO se la chiamata è andata a buon fine!
        return res.json() // <-- un metodo che trasforma lo stream del body in un oggetto!
      } else {
        // finiremo qui se la chiamata ha contattato il server, ma c'è stato
        // un problema nella risposta!
        console.log('Qualcosa è andato storto con la nostra chiamata!')
      }
    })
    .then(function (data) {
      console.log(data)
      // data sono i dati che cercavamo fin dall'inizio!
      // qua manipolo il dom...
    })
    .catch(function (err) {
      // cosa faccio quando l'operazione NON va a buon fine?
      // finiremo nel .catch() quando l'operazione È FINITA ma NON È ANDATA A BUON FINE
      console.log('È successo un errore', err)
      // finiamo qui in una fetch() se abbiamo un errore di connettività, o un errore generico
    })
}

//   data qui è undefined!

// risolviamo la promise di fetch() con async/await
const asyncAwaitExample = async function () {
  try {
    // inseriamo la logica di async/await
    // preponiamo await davanti a ogni metodo che torna una Promise!
    let res = await fetch('https://jsonplaceholder.typicode.com/albums')
    // res è utilizzabile!
    console.log(res)
    if (res.ok) {
      let data = await res.json()
      console.log('data', data)

      // prendo un riferimento al tag <ul>
      let listReference = document.querySelector('#list')
      //   data.forEach((album) => {
      //     // creo un <li> vuoto
      //     let emptyLi = document.createElement('li')
      //     // assegno al <li> vuoto le classi di bootstrap
      //     emptyLi.classList.add('list-group-item')
      //     // <li class="list-group-item"></li>
      //     // riempio <li> con il contenuto del titolo
      //     emptyLi.innerText = album.title
      //     // appendo <li> a <ul>
      //     listReference.appendChild(emptyLi)
      //   })
      data.forEach((album) => {
        listReference.innerHTML =
          listReference.innerHTML + // appende all'innerHTML precedente un nuovo pezzetto
          `
            <li class="list-group-item">
                ${album.title}<span class="badge bg-primary">${album.id}</span>
            </li>
        `
      })
    } else {
      // finiremo qui se la chiamata ha contattato il server, ma c'è stato
      // un problema nella risposta!
      console.log('Qualcosa è andato storto con la nostra chiamata!')
    }
  } catch (error) {
    // finiremo qui se c'è stato un problema a monte, nel contattare il server!
    // ad es. un errore di rete, modalità aereo, etc.
    console.log(error)
  }
}

asyncAwaitExample()

// ESEMPIO DI CHIAMATA POST
// vediamo un esempio di una chiamata POST
// le chiamate POST, a differenza delle chiamate GET, non recuperano dati,
// ma servono a GENERARE NUOVE RISORSE!

const createNewAlbum = async function () {
  try {
    let response = fetch('https://jsonplaceholder.typicode.com/albums', {
      // un oggetto di configurazione
      method: 'POST', // genero un nuovo album
      body: JSON.stringify({ title: 'nuovo', userId: 5 }), // il body dev'essere una stringa
      headers: {
        'Content-Type': 'application/json', // specifico che il mio body è un oggetto stringhifizzato
      },
    })
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}
