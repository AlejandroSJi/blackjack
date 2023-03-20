// Variables
let deck = [];
const tipos = ['C','D','H','S'];
const especiales =['J','K','Q','A'];
let puntoJugador = 0;
let puntoComputadora = 0;
// Referencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const puntosHTML = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
// Crea el deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push( esp + tipo);
            }
        }
    deck=_.shuffle(deck);
}

// Esto me permite tomar cartas
const pedirCarta = () => {
    if (deck.length === 0){
        throw 'No hay carta en el deck';}
    return deck.pop();
}
// Asigna el valor
const valorCarta = (carta)=>{
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor)?(valor=='A')?11:10:valor * 1)
}

// Turno de la computadora 
const turnoComputadora = (puntosMinimos)=>{
    do {
        const carta = pedirCarta();
        puntoComputadora+=valorCarta(carta);
        puntosHTML[1].innerText=puntoComputadora
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.webp`;
        divCartasComputadora.append(imgCarta);
        imgCarta.classList.add('carta');
    } while (puntoComputadora<21&&puntoComputadora<=puntosMinimos);
    
    return puntoComputadora

}

//Ganador
const ganador = (ptoCmp,ptoJug)=>{
    setTimeout(() => {
        if (ptoJug<=21) {

            if (ptoCmp>21||ptoJug>ptoCmp) {
                alert("Gana el jugador")
            }else if (ptoJug==ptoCmp) {
                alert("Empataron")
            }else{
                alert("Gana la computadora")}
        }else{
        alert("Gana la computadora")
        }
    }, 800);
}

//Nueva partida
btnNuevo.addEventListener('click',()=>{
    location.reload();
})


// Eventos
btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    puntoJugador += valorCarta(carta);
    puntosHTML[0].innerText=puntoJugador
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.webp`;
    divCartasJugador.append(imgCarta);
    imgCarta.classList.add('carta');

    if(puntoJugador>21){
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        puntoComputadora = turnoComputadora(1);
        ganador(puntoComputadora,puntoJugador)
    }else if (puntoJugador===21){
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        puntoComputadora=turnoComputadora(21);
        ganador(puntoComputadora,puntoJugador)
    }

})

btnDetener.addEventListener('click',()=>{
    btnPedir.disabled=true;
    btnDetener.disabled=true;
    puntoComputadora = turnoComputadora(puntoJugador);
    ganador(puntoComputadora,puntoJugador)
    
})


crearDeck();
