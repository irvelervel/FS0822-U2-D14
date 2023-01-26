// IL PROBLEMA

const countUntilThree = function () {
  setTimeout(function () {
    console.log('ho contato fino a 3!')
  }, 3000) // aspetto 3 secondi
}

const start = function () {
  countUntilThree()
  console.log('fatto!')
  // ma se voi alla riga 9 avete bisogno del risultato della riga 8 per andare avanti,
  // come fate? la riga 9 verrà eseguita indipendentemente dalla riga 8, immediatamente
  //   dopo!
}

// window.onload = start

// SOLUZIONE n.1 --> CALLBACKS (obsoleta)
// una callback è una funzione passata come parametro ad un'altra funzione!
const countUntilThree2 = function (func) {
  //
  setTimeout(function () {
    console.log('ho contato fino a 3!')
    // ora eseguo la mia callback!
    func()
  }, 3000) // aspetto 3 secondi
}

const start2 = function () {
  countUntilThree2(function () {
    // passo come argomento della funzione countUntilThree2
    // l'operazione successiva! in questo modo mantengo il codice pulito, e invoco
    // la funzione asincrona con i passi successivi da eseguire
    console.log('fatto!')
  })
}

// window.onload = start2

// SOLUZIONE n.2 --> PROMISE (moderna)
const countUntilThreePromise = function () {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('ho contato fino a 3!')
      resolve('evviva!') // la Promise è finita bene, proseguirò nel blocco .then()
      //   reject('errore generico') // c'è stato un errore nella Promise, finisco nel .catch()
    }, 3000) // aspetto 3 secondi
  })
}

// come aspetto la fine di una funzione che ritorna una Promise??
// abbiamo 2 metodologie moderne per aspettare la fine di una Promise prima
// di continuare l'esecuzione del nostro codice!
// METODOLOGIA 1 --> .then() .catch()
const start3 = function () {
  countUntilThreePromise()
    .then(function (message) {
      // .then() è il contenitore per il codice che verrà eseguito se la Promise
      // verrà RISOLTA (resolve())
      console.log('fatto! abbiamo ottenuto questo:', message)
    })
    .catch(function (err) {
      // catch() è il contenitore per il codice che verrà eseguito se la Promise
      // verrà RIFIUTATA (reject())
      // di solito qui si gestiscono gli errori
      console.log("c'è stato un errore, il suo tipo é:", err)
    })
  // il .then() aspetterà la fine della Promise prima di continuare l'esecuzione del codice contenuto al proprio interno
}

// METODOLOGIA 2 --> async/await
const start4 = async function () {
  try {
    // per poter utilizzare await dentro la funzione, dovete dichiarare la funzione come async
    await countUntilThreePromise() // await "metterà in pausa" l'esecuzione del codice
    console.log('fatto!')
  } catch (error) {
    // questo blocco catch() avviene nel caso ci sia un errore nel blocco try
    // possiamo dire che nella sintassi async/await il blocco catch(error) assume
    // la stessa funzione del metodo .catch() della metodologia precedente
    console.log(error)
  }
}

window.onload = start3
