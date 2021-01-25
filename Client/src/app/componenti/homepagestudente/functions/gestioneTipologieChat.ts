import { Messaggio } from "src/app/classi/messaggio";
import { Utente } from "src/app/classi/user";

//funzione per verificare se un utente e gia dentro alla lista
export function isUtentePresente(idUtente: number, lista: number[]): boolean {
    //per ciascun utente presente nella lista
    for (let i = 0; i < lista.length; ++i) {
        //confronto se e gia nella lista allora vero
        if (lista[i] === idUtente) {
            return true;
        }
    }
    //se non presente falso
    return false;
}

//funzione per la lista dei messaggi rispetto ad una certa persona
export function getListaMessaggiPersona(idUtente: number): void {
    //memorizzo il riferimento alla persona che sto chattando insieme
    this.idPersonaChatAttuale = idUtente;
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti: number[] = [];
    //estraggo i messaggi con mittente l utente passato come parametro e destinatario l utente loggato
    this.ms.getListaMessaggi(idUtente, this.utenteLoggato.getIdUser(), null).subscribe((data) => {
        //scorro tutti i messaggi
        for (var i = 0; i < data.messaggi.length; ++i) {
            //aggiungo ciascun messaggio nella lista dei messaggi
            this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
        }
        //estraggo i messaggi con destinatario l utente passato come parametro e mittente l utente loggato
        this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), idUtente, null).subscribe((data) => {
            //scorro tutti i messaggi
            for (let i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort(
                (m1: Messaggio, m2: Messaggio): number => {
                    if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                        return 1;
                    }
                    return -1;
                }
            );
            //scorro tutti i messaggi inerenti alla chat
            for (let i = 0; i < this.listaMessaggi.length; ++i) {
                //controllo se l id del mittente non lo ho gia trovato allora lo inserisco
                if (!this.isUtentePresente(this.listaMessaggi[i].getMittente(), listaIdUtenti)) {
                    listaIdUtenti.push(this.listaMessaggi[i].getMittente());
                }
                //controllo se l id del destinatario non lo ho gia trovato allora lo inserisco
                if (!this.isUtentePresente(this.listaMessaggi[i].getDestinatario(), listaIdUtenti)) {
                    listaIdUtenti.push(this.listaMessaggi[i].getDestinatario());
                }
            }
            //scorro tutti gli id delle persone dentro alla chat
            for (let i = 0; i < listaIdUtenti.length; ++i) {
                //estraggo ciascun utente dall id
                this.us.getUtenteById(listaIdUtenti[i]).subscribe((data) => {
                    //verifico che abbia trovato esattamente un utente con quell id
                    if (data.utenti.length === 1) {
                        //aggiungo l utente nella lista delle persone dentro a quella chat
                        this.listaPersoneMessaggi.push(new Utente(data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1030");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ")
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err)
                });
            }
            //estraggo il nome e il cognome della persona con cui l utente loggato sta chattando
            this.us.getUtenteById(idUtente).subscribe((data) => {
                //verifico che abbia trovato esattamente un utente
                if (data.utenti.length === 1) {
                    //imposto id utente
                    this.idUtenteDestinazione = new Utente(data.utenti[0]).getIdUser();
                    //imposto il nome e cognome
                    this.destinatarioMessaggiChatSelezionata = new Utente(data.utenti[0]).getNome() + " " + new Utente(data.utenti[0]).getCognome();
                }
                //se gli utenti trovati non sono pari ad 1
                else {
                    this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1052");
                    this.dettagliErrore.setReason("");
                    console.log("Errore piu utenti con lo stesso id ")
                }
            }, (err) => {
                //errore estrazione utente dall id
                this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione destinatario dall id " + err)
            });
        }, (err) => {
            //errore estrazione prima parte messaggi
            this.dettagliErrore.setMessage("Errore prima parte messaggi");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore prima parte messaggi" + JSON.stringify(err));
        });
    }, (err) => {
        //errore estrazione seconda parte messaggi
        this.dettagliErrore.setMessage("Errore seconda parte messaggi");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore seconda parte messaggi" + JSON.stringify(err));
    });
}

//funzione per la lista dei messaggi sulla chat privata presente nell popup dell inserzione
export function getListaMessaggiInserzioneChatPrivata(): void {
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //inizializzo la lista dei messaggi
        this.listaMessaggi = [];
        //inizializzo la lista delle persone dentro alla chat
        this.listaPersoneMessaggi = [];
        //creo una variabile temporanea di indici degli utenti dentro alla chat
        var listaIdUtenti: number[] = [];
        //estraggo i messaggi con mittente l utente loggato, destinatario il creatore dell inserzione ed infine l inserzione
        this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), this.inserzione.getUtente(), this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
            }
            //estraggo i messaggi con mittente il creatore dell inserzione, destinatario l utente loggato ed infine l inserzione
            this.ms.getListaMessaggi(this.inserzione.getUtente(), this.utenteLoggato.getIdUser(), this.inserzione.getIdInserzione()).subscribe((data) => {
                //scorro tutti i messaggi
                for (let i = 0; i < data.messaggi.length; ++i) {
                    //aggiungo ciascun messaggio nella lista dei messaggi
                    this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
                }
                //ordino i messaggi in ordine di id dato che sono autoincrement
                this.listaMessaggi = this.listaMessaggi.sort(
                    (m1: Messaggio, m2: Messaggio): number => {
                        if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                            return 1;
                        }
                        return -1;
                    }
                );
                //scorro tutti i messaggi inerenti alla chat
                for (let i = 0; i < this.listaMessaggi.length; ++i) {
                    //controllo se l id del mittente non lo ho gia trovato allora lo inserisco
                    if (!this.isUtentePresente(this.listaMessaggi[i].getMittente(), listaIdUtenti)) {
                        listaIdUtenti.push(this.listaMessaggi[i].getMittente());
                    }
                    //controllo se l id del destinatario non lo ho gia trovato allora lo inserisco
                    if (!this.isUtentePresente(this.listaMessaggi[i].getDestinatario(), listaIdUtenti)) {
                        listaIdUtenti.push(this.listaMessaggi[i].getDestinatario());
                    }
                }
                //scorro tutti gli id delle persone dentro alla chat
                for (let i = 0; i < listaIdUtenti.length; ++i) {
                    //estraggo ciascun utente dall id
                    this.us.getUtenteById(listaIdUtenti[i]).subscribe((data) => {
                        //verifico che abbia trovato esattamente un utente con quell id
                        if (data.utenti.length === 1) {
                            //aggiungo l utente nella lista delle persone dentro a quella chat
                            this.listaPersoneMessaggi.push(new Utente(data.utenti[0]));
                        }
                        //se gli utenti trovati non sono pari ad 1
                        else {
                            this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id");
                            this.dettagliErrore.setReason("");
                            console.log("Errore piu utenti con lo stesso id ")
                        }
                    }, (err) => {
                        //errore estrazione utente dall id
                        this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione destinatario dall id " + err)
                    });
                }
                //estraggo il nome e il cognome della persona con cui l utente loggato sta chattando
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //verifico che abbia trovato esattamente un utente
                    if (data.utenti.length === 1) {
                        //imposto id utente
                        this.idUtenteDestinazione = new Utente(data.utenti[0]).getIdUser();
                        //imposto il nome e cognome
                        this.destinatarioMessaggiChatSelezionata = new Utente(data.utenti[0]).getNome() + " " + new Utente(data.utenti[0]).getCognome();
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1153");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ")
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err)
                });
            }, (err) => {
                //errore estrazione prima parte messaggi
                this.dettagliErrore.setMessage("Errore prima parte messaggi");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore prima parte messaggi" + JSON.stringify(err));
            });
        }, (err) => {
            //errore estrazione seconda parte messaggi
            this.dettagliErrore.setMessage("Errore seconda parte messaggi");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore seconda parte messaggi" + JSON.stringify(err));
        });
    }
}

//funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
export function getListaMessaggiInserzioneChatPubblica(): void {
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti: number[] = [];
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //estraggo i messaggi riferiti solo all inserzione e allo 0 come utente perche pubblico
        this.ms.getListaMessaggi(null, 0, this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new Messaggio(data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort(
                (m1: Messaggio, m2: Messaggio): number => {
                    if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                        return 1;
                    }
                    return -1;
                }
            );
            //scorro tutti i messaggi inerenti alla chat
            for (let i = 0; i < this.listaMessaggi.length; ++i) {
                //controllo se l id del mittente non lo ho gia trovato allora lo inserisco
                if (!this.isUtentePresente(this.listaMessaggi[i].getMittente(), listaIdUtenti)) {
                    listaIdUtenti.push(this.listaMessaggi[i].getMittente());
                }
            }
            //scorro tutti gli id delle persone dentro alla chat
            for (let i = 0; i < listaIdUtenti.length; ++i) {
                //estraggo ciascun utente dall id
                this.us.getUtenteById(listaIdUtenti[i]).subscribe((data) => {
                    //verifico che abbia trovato esattamente un utente con quell id
                    if (data.utenti.length === 1) {
                        //aggiungo l utente nella lista delle persone dentro a quella chat
                        this.listaPersoneMessaggi.push(new Utente(data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1222");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ")
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err)
                });
            }
            //imposto id utente pubblico
            this.idUtenteDestinazione = 0;
            this.destinatarioMessaggiChatSelezionata = "pubblico";
        }, (err) => {
            //errore estrazione seconda parte messaggi
            this.dettagliErrore.setMessage("Errore seconda parte messaggi");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore seconda parte messaggi" + JSON.stringify(err));
        });
    }
    //se non e valida errore
    else {
        //errore inserzione selezionata non valida
        this.dettagliErrore.setMessage("Errore estrazione messaggi da inserzione non selezionata");
        this.dettagliErrore.setReason("");
        console.log("Errore estrazione messaggi da inserzione non selezionata");
    }
}