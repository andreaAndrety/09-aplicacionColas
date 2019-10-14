const { io } = require('../server');
const { TicketControl } = require('../classes/tickect-control')

let ticketControl = new TicketControl();


io.on('connection', (client) => {

    // console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    // if (mensaje.usuario) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });

    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }

    client.on('siguienteTicket', (data, callback) => {
        // vamos a enarle a pantalla cual es el siguiente ticket
        // en el archivo que importamos , teniamo una funcion que trae el ultimo tickect
        //revise el require
        let ticket = ticketControl.siguienteTickect();

        //esto se va a imprimir en la consola del lado del servidor
        console.log(`Siguiente ticket : ${ticket}`);

        callback(ticket);
    });
    //vamos a crea un evento para que cuando genere una nueva coneccion 
    //podamos ver de una vez el ultimo ticket

    client.emit('ultimoTicket', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //listener pata atender ticket
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        console.log(atenderTicket);
        callback(atenderTicket);
        //actualizar los ultimos 4 
        // es decir la pantalla publica vamos a actualizarlo
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    })

});