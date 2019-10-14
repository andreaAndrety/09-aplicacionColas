const fs = require('fs')

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        //vamos a declarar un arreglo para controlar los tickets pendientes
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json')
            // console.log(data);

        if (data.hoy === this.hoy) {
            //si se reinicia el server 
            // ,le ponermos el ultimo guardado a la variable ultimo
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;


        } else {
            this.reiniciarConteo();
        }
    }
    siguienteTickect() {
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket);
        this.grabarArchivo();
        //regresar el ultimo ticket
        return `tickect ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `tickect ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
            if (this.tickets.length === 0) {
                return 'no hay por tickets por atender'
            }

            let numeroTicket = this.tickets[0].numero;
            //elimino la primera posicion del arreglo
            this.tickets.shift();

            let atenderTicket = new Ticket(numeroTicket, escritorio);

            this.ultimos4.unshift(atenderTicket);

            if (this.ultimos4.length > 4) {
                this.ultimos4.splice(-1, 1); //elimina el ultimo
            }
            console.log(this.ultimos4);

            this.grabarArchivo();

            return atenderTicket;

        }
        //estee es  un evento o metodo 
    reiniciarConteo() {
        // cuando se reinicia el server se debe bien reiniar o retomar 
        //va a tomar los valores con qe se inicio las variables de ultimo y hoy
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se reinicio el conteo');
    }

    grabarArchivo() {
        let jsonData = {
                ultimo: this.ultimo,
                hoy: this.hoy,
                tickets: this.tickets,
                ultimos4: this.ultimos4

            }
            //vamos a convertir el objeto jsonData a l tipo de datos json
        let jsonDataString = JSON.stringify(jsonData);
        // vamos a guardar los datos en el archivo data.json
        //path y el elemento que quiero guardar
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}
module.exports = {
    TicketControl
}