// comuncacion de para establecer conecxion 


var socket = io();
// verificamos la coneccion

// vamos a hacer referencia a una etiqueta de html para poder usarla

var lblTicket1 = $('#lblTicket1')
var lblTicket2 = $('#lblTicket2')
var lblTicket3 = $('#lblTicket3')
var lblTicket4 = $('#lblTicket4')


var lblEscritorio1 = $('#lblEscritorio1')
var lblEscritorio2 = $('#lblEscritorio2')
var lblEscritorio3 = $('#lblEscritorio3')
var lblEscritorio4 = $('#lblEscritorio4')

var lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
var lblTlblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
]



socket.on('connect', function() {
    console.log('Conectado al servidor');

});


//verificamos cuando s pierde la conexoin al servidor
socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

socket.on('ultimoTicket', function(resp) {

    var audio = new Audio('../audio/new-ticket.mp3')
    audio.play();

    //la respuesta son los ultimos 4
    actualizarHTML(resp.ultimos4);


    //console.log(resp);
    // label.text(resp.ultimo);

});
socket.on('ultimos4', function(resp) {

    var audio = new Audio('audio/new-ticket.mp3')
    audio.play();

    //la respuesta son los ultimos 4
    actualizarHTML(resp.ultimos4);


    //console.log(resp);
    // label.text(resp.ultimo);

});

function actualizarHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblTlblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}

// creamos el evento on click en todos los botones