// Interfacce
interface IMezzo {
    tipo: "bici" | "scooter" | "monopattino";
    id: string;
    stato: "disponibile" | "in uso";
    assegnaUtente(utente: IUtente): void;
    rilasciaUtente(): void;
    getDettagli(): void;
}

interface IUtente {
    nome: string;
    cognome: string;
    email: string;
    metodoPagamento: string;
    prenotaMezzo(mezzo: IMezzo): void;
    cancellaPrenotazione(mezzo: IMezzo): void;
    getProfilo(): String;
}

interface ICitta {
    nome: string;
    mezziDisponibili: IMezzo[];
    aggiungiMezzo(mezzo: IMezzo): void;
    rimuoviMezzo(id: string): void;
    trovaMezzoDisponibile(tipo: string): IMezzo | undefined;
    getStatoCitta(): string;
}

// Classi
class Mezzo implements IMezzo {
    private _tipo: "bici" | "scooter" | "monopattino";
    private _id: string;
    private _stato: "disponibile" | "in uso";

    constructor(tipo: "bici" | "scooter" | "monopattino", id: string) {
        this._tipo = tipo;
        this._id = id;
        this._stato = "disponibile";
    }

    get tipo(): "bici" | "scooter" | "monopattino" {
        return this._tipo;
    }

    set tipo(value: "bici" | "scooter" | "monopattino") {
        this._tipo = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get stato(): "disponibile" | "in uso" {
        return this._stato;
    }

    set stato(value: "disponibile" | "in uso") {
        this._stato = value;
    }

    assegnaUtente(utente: IUtente): void {
        if (this.stato === "disponibile") {
            this.stato = "in uso";
            console.log(`${utente.nome} ${utente.cognome} ha preso in uso il mezzo ${this.id} (${this.tipo}).`);
        } else {
            console.log(`Il mezzo ${this.id} (${this.tipo}) non è disponibile.`);
        }
    }

    rilasciaUtente(): void {
        if (this.stato === "in uso") {
            this.stato = "disponibile";
            console.log(`Il mezzo ${this.id} (${this.tipo}) è ora disponibile.`);
        } else {
            console.log(`Il mezzo ${this.id} (${this.tipo}) è già disponibile.`);
        }
    }

    getDettagli(): string {
        return `ID: ${this.id}, Tipo: ${this.tipo}, Stato: ${this.stato}`;
    }
}

class Utente implements IUtente {
    private _nome: string;
    private _cognome: string;
    private _email: string;
    private _metodoPagamento: string;

    constructor(nome: string, cognome: string, email: string, metodoPagamento: string) {
        this._nome = nome;
        this._cognome = cognome;
        this._email = email;
        this._metodoPagamento = metodoPagamento;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get cognome(): string {
        return this._cognome;
    }

    set cognome(value: string) {
        this._cognome = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get metodoPagamento(): string {
        return this._metodoPagamento;
    }

    set metodoPagamento(value: string) {
        this._metodoPagamento = value;
    }

    prenotaMezzo(mezzo: IMezzo): void {
        mezzo.assegnaUtente(this);
    }

    cancellaPrenotazione(mezzo: IMezzo): void {
        if (mezzo.stato === "in uso") {
            mezzo.stato = "disponibile";
            console.log(`${this.nome} ${this.cognome} ha cancellato la prenotazione del mezzo ${mezzo.id}.`);
        } else {
            console.log(`Il mezzo ${mezzo.id} non è in uso.`);
        }
    }

    getProfilo(): string {
        return `Nome: ${this.nome} ${this.cognome}, Email: ${this.email}, Metodo di Pagamento: ${this.metodoPagamento}`;
    }
}

class Citta implements ICitta {
    private _nome: string;
    private _mezziDisponibili: IMezzo[];

    constructor(nome: string) {
        this._nome = nome;
        this._mezziDisponibili = [];
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get mezziDisponibili(): IMezzo[] {
        return this._mezziDisponibili;
    }

    set mezziDisponibili(value: IMezzo[]) {
        this._mezziDisponibili = value;
    }

    aggiungiMezzo(mezzo: IMezzo): void {
        this.mezziDisponibili.push(mezzo);
        console.log(`Aggiunto il mezzo ${mezzo.id} (${mezzo.tipo}) a ${this.nome}.`);
    }

    rimuoviMezzo(id: string): void {
        this.mezziDisponibili = this.mezziDisponibili.filter(mezzo => mezzo.id !== id);
        console.log(`Il mezzo con ID ${id} è stato rimosso da ${this.nome}.`);
    }

    trovaMezzoDisponibile(tipo: string): IMezzo | undefined {
        return this.mezziDisponibili.find(mezzo => mezzo.tipo === tipo && mezzo.stato === "disponibile");
    }

    getStatoCitta(): string {
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
} else {
    console.log("Nessun mezzo disponibile trovato.");
}

console.log(utente1.getProfilo());
