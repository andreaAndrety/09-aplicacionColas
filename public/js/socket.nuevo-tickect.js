// comuncacion de para establecer conecxion 


var socket = io();
// verificamos la coneccion

// vamos a hacer referencia a una etiqueta de html para poder usarla

var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');

});


//verificamos cuando s pierde la conexoin al servidor
socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

socket.on('ultimoTicket', function(resp) {

    console.log(resp);
    label.text(resp.ultimo);

});

// creamos el evento on click en todos los botones
$('button').on('click', function() {
    //vamos a enviar un mensaje cn el nombre de evento siguiente ticket
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
            label.text(siguienteTicket);


        })
        //console.log('click');

});