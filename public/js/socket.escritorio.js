// comuncacion de para establecer conecxion 


var socket = io();
// verificamos la coneccion
socket.on('connect', function() {
    console.log('Conectado al servidor');

});
//verificamos cuando s pierde la conexoin al servidor
socket.on('disconnect', function() {
    console.log('desconectado al servidor');
});

// vamos a hacer referencia a una etiqueta de html para poder usarla
var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('el Escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');


socket.on('ultimoTicket', function(resp) {

    console.log(resp);
    label.text(resp.ultimo);

});
$('h1').text('Escritorio ' + escritorio);

// creamos el evento on click en todos los botones
$('button').on('click', function() {
    //vamos a enviar un mensaje cn el nombre de evento siguiente ticket
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
            if (resp === 'no hay por tickets por atender') {
                label.text(' el Ticket :' + resp);
                alert(resp)
                return;
            }

            console.log(resp);
            label.text(' el Ticket :' + resp.numero);


        })
        //console.log('click');

});