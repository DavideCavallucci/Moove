// Classi
var Mezzo = /** @class */ (function () {
    function Mezzo(tipo, id) {
        this._tipo = tipo;
        this._id = id;
        this._stato = "disponibile";
    }
    Object.defineProperty(Mezzo.prototype, "tipo", {
        get: function () {
            return this._tipo;
        },
        set: function (value) {
            this._tipo = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mezzo.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mezzo.prototype, "stato", {
        get: function () {
            return this._stato;
        },
        set: function (value) {
            this._stato = value;
        },
        enumerable: false,
        configurable: true
    });
    Mezzo.prototype.assegnaUtente = function (utente) {
        if (this.stato === "disponibile") {
            this.stato = "in uso";
            console.log("".concat(utente.nome, " ").concat(utente.cognome, " ha preso in uso il mezzo ").concat(this.id, " (").concat(this.tipo, ")."));
        }
        else {
            console.log("Il mezzo ".concat(this.id, " (").concat(this.tipo, ") non \u00E8 disponibile."));
        }
    };
    Mezzo.prototype.rilasciaUtente = function () {
        if (this.stato === "in uso") {
            this.stato = "disponibile";
            console.log("Il mezzo ".concat(this.id, " (").concat(this.tipo, ") \u00E8 ora disponibile."));
        }
        else {
            console.log("Il mezzo ".concat(this.id, " (").concat(this.tipo, ") \u00E8 gi\u00E0 disponibile."));
        }
    };
    Mezzo.prototype.getDettagli = function () {
        return "ID: ".concat(this.id, ", Tipo: ").concat(this.tipo, ", Stato: ").concat(this.stato);
    };
    return Mezzo;
}());
var Utente = /** @class */ (function () {
    function Utente(nome, cognome, email, metodoPagamento) {
        this._nome = nome;
        this._cognome = cognome;
        this._email = email;
        this._metodoPagamento = metodoPagamento;
    }
    Object.defineProperty(Utente.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utente.prototype, "cognome", {
        get: function () {
            return this._cognome;
        },
        set: function (value) {
            this._cognome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utente.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Utente.prototype, "metodoPagamento", {
        get: function () {
            return this._metodoPagamento;
        },
        set: function (value) {
            this._metodoPagamento = value;
        },
        enumerable: false,
        configurable: true
    });
    Utente.prototype.prenotaMezzo = function (mezzo) {
        mezzo.assegnaUtente(this);
    };
    Utente.prototype.cancellaPrenotazione = function (mezzo) {
        if (mezzo.stato === "in uso") {
            mezzo.stato = "disponibile";
            console.log("".concat(this.nome, " ").concat(this.cognome, " ha cancellato la prenotazione del mezzo ").concat(mezzo.id, "."));
        }
        else {
            console.log("Il mezzo ".concat(mezzo.id, " non \u00E8 in uso."));
        }
    };
    Utente.prototype.getProfilo = function () {
        return "Nome: ".concat(this.nome, " ").concat(this.cognome, ", Email: ").concat(this.email, ", Metodo di Pagamento: ").concat(this.metodoPagamento);
    };
    return Utente;
}());
var Citta = /** @class */ (function () {
    function Citta(nome) {
        this._nome = nome;
        this._mezziDisponibili = [];
    }
    Object.defineProperty(Citta.prototype, "nome", {
        get: function () {
            return this._nome;
        },
        set: function (value) {
            this._nome = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Citta.prototype, "mezziDisponibili", {
        get: function () {
            return this._mezziDisponibili;
        },
        set: function (value) {
            this._mezziDisponibili = value;
        },
        enumerable: false,
        configurable: true
    });
    Citta.prototype.aggiungiMezzo = function (mezzo) {
        this.mezziDisponibili.push(mezzo);
        console.log("Aggiunto il mezzo ".concat(mezzo.id, " (").concat(mezzo.tipo, ") a ").concat(this.nome, "."));
    };
    Citta.prototype.rimuoviMezzo = function (id) {
        this.mezziDisponibili = this.mezziDisponibili.filter(function (mezzo) { return mezzo.id !== id; });
        console.log("Il mezzo con ID ".concat(id, " \u00E8 stato rimosso da ").concat(this.nome, "."));
    };
    Citta.prototype.trovaMezzoDisponibile = function (tipo) {
        return this.mezziDisponibili.find(function (mezzo) { return mezzo.tipo === tipo && mezzo.stato === "disponibile"; });
    };
    Citta.prototype.getStatoCitta = function () {
        var disponibili = this.mezziDisponibili.filter(function (mezzo) { return mezzo.stato === "disponibile"; }).length;
        var inUso = this.mezziDisponibili.filter(function (mezzo) { return mezzo.stato === "in uso"; }).length;
        return "Stato di ".concat(this.nome, ": ").concat(disponibili, " mezzi disponibili, ").concat(inUso, " mezzi in uso.");
    };
    return Citta;
}());
// Testing e Esempio di utilizzo
var bici = new Mezzo("bici", "B001");
var scooter = new Mezzo("scooter", "S001");
var monopattino = new Mezzo("monopattino", "M001");
var utente1 = new Utente("Mario", "Rossi", "mario.rossi@example.com", "Carta di credito");
var utente2 = new Utente("Giulia", "Bianchi", "giulia.bianchi@example.com", "PayPal");
var citta = new Citta("Milano");
citta.aggiungiMezzo(bici);
citta.aggiungiMezzo(scooter);
citta.aggiungiMezzo(monopattino);
utente1.prenotaMezzo(bici);
console.log(bici.getDettagli());
utente2.prenotaMezzo(scooter);
console.log(scooter.getDettagli());
utente1.cancellaPrenotazione(bici);
console.log(bici.getDettagli());
var nuovaBici = new Mezzo("bici", "B002");
citta.aggiungiMezzo(nuovaBici);
console.log(citta.getStatoCitta());
citta.rimuoviMezzo("S001");
console.log(citta.getStatoCitta());
var mezzoDisponibile = citta.trovaMezzoDisponibile("bici");
if (mezzoDisponibile) {
    console.log("Mezzo disponibile trovato: ".concat(mezzoDisponibile.getDettagli()));
}
else {
    console.log("Nessun mezzo disponibile trovato.");
}
console.log(utente1.getProfilo());
