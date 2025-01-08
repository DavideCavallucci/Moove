"use strict";
// Classi
class Mezzo {
    constructor(tipo, id) {
        this._tipo = tipo;
        this._id = id;
        this._stato = "disponibile";
    }
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get stato() {
        return this._stato;
    }
    set stato(value) {
        this._stato = value;
    }
    assegnaUtente(utente) {
        if (this.stato === "disponibile") {
            this.stato = "in uso";
            console.log(`${utente.nome} ${utente.cognome} ha preso in uso il mezzo ${this.id} (${this.tipo}).`);
        }
        else {
            console.log(`Il mezzo ${this.id} (${this.tipo}) non è disponibile.`);
        }
    }
    rilasciaUtente() {
        if (this.stato === "in uso") {
            this.stato = "disponibile";
            console.log(`Il mezzo ${this.id} (${this.tipo}) è ora disponibile.`);
        }
        else {
            console.log(`Il mezzo ${this.id} (${this.tipo}) è già disponibile.`);
        }
    }
    getDettagli() {
        return `ID: ${this.id}, Tipo: ${this.tipo}, Stato: ${this.stato}`;
    }
}
class Utente {
    constructor(nome, cognome, email, metodoPagamento) {
        this._nome = nome;
        this._cognome = cognome;
        this._email = email;
        this._metodoPagamento = metodoPagamento;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    get cognome() {
        return this._cognome;
    }
    set cognome(value) {
        this._cognome = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get metodoPagamento() {
        return this._metodoPagamento;
    }
    set metodoPagamento(value) {
        this._metodoPagamento = value;
    }
    prenotaMezzo(mezzo) {
        mezzo.assegnaUtente(this);
    }
    cancellaPrenotazione(mezzo) {
        if (mezzo.stato === "in uso") {
            mezzo.stato = "disponibile";
            console.log(`${this.nome} ${this.cognome} ha cancellato la prenotazione del mezzo ${mezzo.id}.`);
        }
        else {
            console.log(`Il mezzo ${mezzo.id} non è in uso.`);
        }
    }
    getProfilo() {
        return `Nome: ${this.nome} ${this.cognome}, Email: ${this.email}, Metodo di Pagamento: ${this.metodoPagamento}`;
    }
}
class Citta {
    constructor(nome) {
        this._nome = nome;
        this._mezziDisponibili = [];
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        this._nome = value;
    }
    get mezziDisponibili() {
        return this._mezziDisponibili;
    }
    set mezziDisponibili(value) {
        this._mezziDisponibili = value;
    }
    aggiungiMezzo(mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log(`Aggiunto il mezzo ${mezzo.id} (${mezzo.tipo}) a ${this.nome}.`);
    }
    rimuoviMezzo(id) {
        this.mezziDisponibili = this.mezziDisponibili.filter(mezzo => mezzo.id !== id);
        console.log(`Il mezzo con ID ${id} è stato rimosso da ${this.nome}.`);
    }
    trovaMezzoDisponibile(tipo) {
        return this.mezziDisponibili.find(mezzo => mezzo.tipo === tipo && mezzo.stato === "disponibile");
    }
    getStatoCitta() {
        const disponibili = this.mezziDisponibili.filter(mezzo => mezzo.stato === "disponibile").length;
        const inUso = this.mezziDisponibili.filter(mezzo => mezzo.stato === "in uso").length;
        return `Stato di ${this.nome}: ${disponibili} mezzi disponibili, ${inUso} mezzi in uso.`;
    }
}
// Testing e Esempio di utilizzo
const bici = new Mezzo("bici", "B001");
const scooter = new Mezzo("scooter", "S001");
const monopattino = new Mezzo("monopattino", "M001");
const utente1 = new Utente("Mario", "Rossi", "mario.rossi@example.com", "Carta di credito");
const utente2 = new Utente("Giulia", "Bianchi", "giulia.bianchi@example.com", "PayPal");
const citta = new Citta("Milano");
citta.aggiungiMezzo(bici);
citta.aggiungiMezzo(scooter);
citta.aggiungiMezzo(monopattino);
utente1.prenotaMezzo(bici);
console.log(bici.getDettagli());
utente2.prenotaMezzo(scooter);
console.log(scooter.getDettagli());
utente1.cancellaPrenotazione(bici);
console.log(bici.getDettagli());
const nuovaBici = new Mezzo("bici", "B002");
citta.aggiungiMezzo(nuovaBici);
console.log(citta.getStatoCitta());
citta.rimuoviMezzo("S001");
console.log(citta.getStatoCitta());
const mezzoDisponibile = citta.trovaMezzoDisponibile("bici");
if (mezzoDisponibile) {
    console.log(`Mezzo disponibile trovato: ${mezzoDisponibile.getDettagli()}`);
}
else {
    console.log("Nessun mezzo disponibile trovato.");
}
console.log(utente1.getProfilo());
