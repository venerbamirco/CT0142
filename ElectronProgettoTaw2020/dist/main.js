(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/jjs":
/*!********************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneTipologieChat.ts ***!
  \********************************************************************************/
/*! exports provided: isUtentePresente, getListaMessaggiPersona, getListaMessaggiInserzioneChatPrivata, getListaMessaggiInserzioneChatPubblica */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUtentePresente", function() { return isUtentePresente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaMessaggiPersona", function() { return getListaMessaggiPersona; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaMessaggiInserzioneChatPrivata", function() { return getListaMessaggiInserzioneChatPrivata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaMessaggiInserzioneChatPubblica", function() { return getListaMessaggiInserzioneChatPubblica; });
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");


//funzione per verificare se un utente e gia dentro alla lista
function isUtentePresente(idUtente, lista) {
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
function getListaMessaggiPersona(idUtente) {
    //memorizzo il riferimento alla persona che sto chattando insieme
    this.idPersonaChatAttuale = idUtente;
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti = [];
    //estraggo i messaggi con mittente l utente passato come parametro e destinatario l utente loggato
    this.ms.getListaMessaggi(idUtente, this.utenteLoggato.getIdUser(), null).subscribe((data) => {
        //scorro tutti i messaggi
        for (var i = 0; i < data.messaggi.length; ++i) {
            //aggiungo ciascun messaggio nella lista dei messaggi
            this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
        }
        //estraggo i messaggi con destinatario l utente passato come parametro e mittente l utente loggato
        this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), idUtente, null).subscribe((data) => {
            //scorro tutti i messaggi
            for (let i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort((m1, m2) => {
                if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                    return 1;
                }
                return -1;
            });
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
                        this.listaPersoneMessaggi.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1030");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ");
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err);
                });
            }
            //estraggo il nome e il cognome della persona con cui l utente loggato sta chattando
            this.us.getUtenteById(idUtente).subscribe((data) => {
                //verifico che abbia trovato esattamente un utente
                if (data.utenti.length === 1) {
                    //imposto id utente
                    this.idUtenteDestinazione = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getIdUser();
                    //imposto il nome e cognome
                    this.destinatarioMessaggiChatSelezionata = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getNome() + " " + new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getCognome();
                }
                //se gli utenti trovati non sono pari ad 1
                else {
                    this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1052");
                    this.dettagliErrore.setReason("");
                    console.log("Errore piu utenti con lo stesso id ");
                }
            }, (err) => {
                //errore estrazione utente dall id
                this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione destinatario dall id " + err);
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
function getListaMessaggiInserzioneChatPrivata() {
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //inizializzo la lista dei messaggi
        this.listaMessaggi = [];
        //inizializzo la lista delle persone dentro alla chat
        this.listaPersoneMessaggi = [];
        //creo una variabile temporanea di indici degli utenti dentro alla chat
        var listaIdUtenti = [];
        //estraggo i messaggi con mittente l utente loggato, destinatario il creatore dell inserzione ed infine l inserzione
        this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), this.inserzione.getUtente(), this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
            }
            //estraggo i messaggi con mittente il creatore dell inserzione, destinatario l utente loggato ed infine l inserzione
            this.ms.getListaMessaggi(this.inserzione.getUtente(), this.utenteLoggato.getIdUser(), this.inserzione.getIdInserzione()).subscribe((data) => {
                //scorro tutti i messaggi
                for (let i = 0; i < data.messaggi.length; ++i) {
                    //aggiungo ciascun messaggio nella lista dei messaggi
                    this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
                }
                //ordino i messaggi in ordine di id dato che sono autoincrement
                this.listaMessaggi = this.listaMessaggi.sort((m1, m2) => {
                    if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                        return 1;
                    }
                    return -1;
                });
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
                            this.listaPersoneMessaggi.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]));
                        }
                        //se gli utenti trovati non sono pari ad 1
                        else {
                            this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id");
                            this.dettagliErrore.setReason("");
                            console.log("Errore piu utenti con lo stesso id ");
                        }
                    }, (err) => {
                        //errore estrazione utente dall id
                        this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione destinatario dall id " + err);
                    });
                }
                //estraggo il nome e il cognome della persona con cui l utente loggato sta chattando
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //verifico che abbia trovato esattamente un utente
                    if (data.utenti.length === 1) {
                        //imposto id utente
                        this.idUtenteDestinazione = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getIdUser();
                        //imposto il nome e cognome
                        this.destinatarioMessaggiChatSelezionata = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getNome() + " " + new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getCognome();
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1153");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ");
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err);
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
function getListaMessaggiInserzioneChatPubblica() {
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti = [];
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //estraggo i messaggi riferiti solo all inserzione e allo 0 come utente perche pubblico
        this.ms.getListaMessaggi(null, 0, this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort((m1, m2) => {
                if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                    return 1;
                }
                return -1;
            });
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
                        this.listaPersoneMessaggi.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 1222");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ");
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err);
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


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Utente\Desktop\Client\src\main.ts */"zUnb");


/***/ }),

/***/ "02sP":
/*!*******************************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/homepagenonloggato.component.ts ***!
  \*******************************************************************************/
/*! exports provided: HomepagenonloggatoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagenonloggatoComponent", function() { return HomepagenonloggatoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_classi_errore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/errore */ "ZkY6");
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");
/* harmony import */ var _functions_gestioneFiltroInserzioni__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/gestioneFiltroInserzioni */ "mPTG");
/* harmony import */ var _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/gestioneInserzioni */ "nWx4");
/* harmony import */ var _functions_gestioneChat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functions/gestioneChat */ "KkMD");
/* harmony import */ var _functions_gestioneLoginRegistrazione__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/gestioneLoginRegistrazione */ "lCax");
/* harmony import */ var _functions_utility__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functions/utility */ "jBtU");
/* harmony import */ var src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/servizi/messaggio.service */ "bC/5");
/* harmony import */ var src_app_servizi_persona_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/servizi/persona.service */ "DYeW");
/* harmony import */ var src_app_servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/servizi/inserzione.service */ "NSdY");
/* harmony import */ var src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/servizi/libro.service */ "ZedN");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



















function HomepagenonloggatoComponent_li_7_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_li_7_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const i_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r17.setInserzioneInVenditaSelezionata(i_r15.getIdInserzione()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r13.nome, "");
} }
function HomepagenonloggatoComponent_li_7_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagenonloggatoComponent_li_7_span_1_span_1_Template, 5, 1, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r15 = ctx.$implicit;
    const l_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r15.libro == l_r13.idLibro);
} }
function HomepagenonloggatoComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagenonloggatoComponent_li_7_span_1_Template, 2, 1, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.inserzioniInVendita);
} }
function HomepagenonloggatoComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r22.filtraInserzioni(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Filtra");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagenonloggatoComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r24.annullaFiltro(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Annulla filtro");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagenonloggatoComponent_div_46_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Messaggio: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Reason: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_div_46_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r26.dettagliErrore.setMessage(""); return ctx_r26.dettagliErrore.setReason(""); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.dettagliErrore.getMessage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r3.dettagliErrore.getReason(), " ");
} }
function HomepagenonloggatoComponent_div_121_input_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "input", 86);
} if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r28.inserzione.dataInizio);
} }
function HomepagenonloggatoComponent_div_121_input_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "input", 87);
} if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r29.inserzione.dataFine);
} }
function HomepagenonloggatoComponent_div_121_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, HomepagenonloggatoComponent_div_121_input_45_Template, 1, 1, "input", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, HomepagenonloggatoComponent_div_121_input_50_Template, 1, 1, "input", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "input", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.utente.getUsername());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getNome());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r11.inserzione.dataInizio != undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r11.inserzione.dataFine != undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r11.inserzione.getPrezzoAttuale());
} }
function HomepagenonloggatoComponent_div_137_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r31.getContenutoMessaggioRiferimento(lm_r30).getContenuto(), " ");
} }
function HomepagenonloggatoComponent_div_137_br_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
} }
function HomepagenonloggatoComponent_div_137_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate4"](" [", lm_r30.getDataFormatoStringa(), " ", lm_r30.getOraFormatoStringa(), " ", ctx_r33.getPersonaNellaChat(lm_r30.getMittente()).getNome(), "]: ", lm_r30.getContenuto(), " ");
} }
function HomepagenonloggatoComponent_div_137_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HomepagenonloggatoComponent_div_137_div_3_Template, 2, 1, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HomepagenonloggatoComponent_div_137_br_4_Template, 1, 0, "br", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HomepagenonloggatoComponent_div_137_div_5_Template, 2, 4, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r30 = ctx.$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r12.getContenutoMessaggioRiferimento(lm_r30));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r12.getContenutoMessaggioRiferimento(lm_r30));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r12.getPersonaNellaChat(lm_r30.getMittente()));
} }
let HomepagenonloggatoComponent = /** @class */ (() => {
    class HomepagenonloggatoComponent {
        constructor(ms, us, is, ls, router) {
            this.ms = ms;
            this.us = us;
            this.is = is;
            this.ls = ls;
            this.router = router;
            //variabile per filtrare i dati delle inserzioni
            this.filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };
            //variabile per accedere allo schema inserzione 
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_2__["Inserzione"]();
            //variabile per accedere allo schema del libro
            this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_3__["Libro"]();
            //variabile per accedere allo schema dell utente
            this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_5__["Utente"]();
            //variabile per accedere alla lista di inserzioni in vendita
            this.inserzioniInVendita = new Array();
            //variabile per accedere alla lista di libri in vendita
            this.libriInVendita = new Array();
            //variabile per memorizzare il messaggio appena arrivato tramite il socket
            this.messaggioAppenaArrivato = "";
            //variabile per memorizzare l utente del nuovo messaggio
            this.utenteMessaggioAppenaArrvato = "";
            //variabile per memorizzare la lista di studenti che l utente loggato ha chattato insieme
            this.studentiConChat = new Array();
            //variabile per memorizzare i messaggi
            this.listaMessaggi = new Array();
            //variabile per memorizzare il nome e cognome del destinatario della chat selezionata
            this.destinatarioMessaggiChatSelezionata = "";
            //varibaile per accedere all id del destinatario del messaggio
            this.idUtenteDestinazione = 0;
            //variabile per memorizzare la lista di persone quando estraggo tutti i messaggi rispetto ad una certa categoria privata pubblica persona ecc
            this.listaPersoneMessaggi = new Array();
            //variabile per memorizzare il messaggio d riferimento prima di inviarlo
            this.messaggioRiferimento = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_4__["Messaggio"]();
            //variabile per memorizzare il messaggio da inviare
            this.messaggioDaInviare = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_4__["Messaggio"]();
            //variabile per la gestione degli errori
            this.dettagliErrore = new src_app_classi_errore__WEBPACK_IMPORTED_MODULE_1__["Errore"]();
            //----------------------------------------------GESTIONE FILTRO----------------------------------------
            //funzione per vedere se il filtro e attivato o disattivato
            this.verificaFiltro = _functions_gestioneFiltroInserzioni__WEBPACK_IMPORTED_MODULE_6__["verificaFiltro"];
            //funzione per annullare il filtro
            this.annullaFiltro = _functions_gestioneFiltroInserzioni__WEBPACK_IMPORTED_MODULE_6__["annullaFiltro"];
            //funzione per aggiornare i dati
            this.recuperaDatiAggiornati = _functions_gestioneFiltroInserzioni__WEBPACK_IMPORTED_MODULE_6__["recuperaDatiAggiornati"];
            //funzione per filtrare le inserzioni in vendita
            this.filtraInserzioni = _functions_gestioneFiltroInserzioni__WEBPACK_IMPORTED_MODULE_6__["filtraInserzioni"];
            //----------------------------------------------GESTIONE LISTA INSERZIONI----------------------------------------
            //funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
            this.getListaInserzioniInVendita = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["getListaInserzioniInVendita"];
            //----------------------------------------------GESTIONE SELEZIONARE INSERZIONE----------------------------------------
            //funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
            this.setInserzioneInVenditaSelezionata = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["setInserzioneInVenditaSelezionata"];
            //------------------------------------------------GESTIONE CHAT----------------------------------------------
            //funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
            this.getContenutoMessaggioRiferimento = _functions_gestioneChat__WEBPACK_IMPORTED_MODULE_8__["getContenutoMessaggioRiferimento"];
            //funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
            this.getPersonaNellaChat = _functions_gestioneChat__WEBPACK_IMPORTED_MODULE_8__["getPersonaNellaChat"];
            //funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
            this.getListaMessaggiInserzioneChatPubblica = _functions_gestioneChat__WEBPACK_IMPORTED_MODULE_8__["getListaMessaggiInserzioneChatPubblica"];
            //------------------------------------------------GESTIONE UTILITY----------------------------------------------
            //funzione per verificare se un utente e gia dentro alla lista
            this.isUtentePresente = _functions_utility__WEBPACK_IMPORTED_MODULE_10__["isUtentePresente"];
            //--------------------------------------------GESTIONE LOGINE REGISTRAZIONE-------------------------------------
            //funzione per il reindirizzamento nella pagina del login
            this.effettuaLogin = _functions_gestioneLoginRegistrazione__WEBPACK_IMPORTED_MODULE_9__["effettuaLogin"];
            //funzione per il reindirizzamento nella pagina della registrazione
            this.effettuaRegistrazione = _functions_gestioneLoginRegistrazione__WEBPACK_IMPORTED_MODULE_9__["effettuaRegistrazione"];
        }
        //----------------------------------------------GESTIONE INIZIALIZZAZIONE----------------------------------------
        ngOnInit() {
            //azzero le variabili
            this.dettagliErrore.setMessage("");
            this.dettagliErrore.setReason("");
            //recupero le inserzioni in vendita
            this.recuperaDatiAggiornati();
        }
    }
    HomepagenonloggatoComponent.ɵfac = function HomepagenonloggatoComponent_Factory(t) { return new (t || HomepagenonloggatoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_11__["MessaggioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_persona_service__WEBPACK_IMPORTED_MODULE_12__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_13__["InserzioneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__["Router"])); };
    HomepagenonloggatoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomepagenonloggatoComponent, selectors: [["app-homepagenonloggato"]], decls: 138, vars: 14, consts: [[1, "container"], [1, "row", "row-cols-1", "row-cols-md-3"], [1, "col-md-4"], [1, "card", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "text-center", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "list-group", "list-group-flush", "overflow-auto"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], ["type", "button", "class", "btn btn-block btn-secondary btn-sm float-right", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-block btn-danger btn-sm float-right", 3, "click", 4, "ngIf"], [1, "card", "text-center", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "card-body", "text-secondary"], ["type", "button", 1, "btn", "btn-block", "btn-secondary", "btn-sm", 3, "click"], [1, "card-body"], ["id", "alertnuovoerrore", "class", "alert alert-secondary alert-dismissible fade show mt-3 ml-3 mr-3", "role", "alert", 4, "ngIf"], ["id", "filtrareinserzioni", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-xl"], [1, "modal-content"], [1, "modal-header", "text-center"], [1, "modal-title", "text"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], ["action", "#", "method", "GET"], [1, "modal-body"], [1, "row"], [1, "col-md-3", "mt-3", "text-center"], ["type", "text", "readonly", "", "value", "Nome libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], [1, "col-md-9", "mt-3", "text-center"], ["name", "libro", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputNomeLibro", "ngModel"], ["type", "text", "readonly", "", "value", "Corso di studi", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "corsodistudi", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputCorsoDiStudi", "ngModel"], ["type", "text", "readonly", "", "value", "Universita", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "universita", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputUniversita", "ngModel"], ["type", "text", "readonly", "", "value", "Area gerografica", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "areaGeografica", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAreaGeografica", "ngModel"], ["type", "text", "readonly", "", "value", "Venditore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "venditore", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputVenditore", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale minimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMinimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMinimo", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale massimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMassimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMassimo", "ngModel"], [1, "modal-footer"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-success", 3, "click", "submit"], ["id", "visualizzazioneinserzioneinvendita", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["class", "modal-body", 4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger"], ["type", "button", "data-toggle", "modal", "data-target", "#vistachat", 1, "btn", "btn-warning", 3, "click"], ["id", "vistachat", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["class", "row", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "align-middle", "text-secondary"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzioneinvendita", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 1, "btn", "btn-block", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", 1, "btn", "btn-block", "btn-danger", "btn-sm", "float-right", 3, "click"], ["id", "alertnuovoerrore", "role", "alert", 1, "alert", "alert-secondary", "alert-dismissible", "fade", "show", "mt-3", "ml-3", "mr-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["type", "text", "readonly", "", "value", "Utente", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "utente", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "libro", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "corsodistudi", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "universita", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Autore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "autore", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Anno di pubblicazione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "annodipubblicazione", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Edizione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "edizione", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Isbn", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "isbn", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Data inizio", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datainizio", "type", "date", "class", "form-control-plaintext text-center border border-secondary", "disabled", "", 3, "value", 4, "ngIf"], ["type", "text", "readonly", "", "value", "Data fine", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datafine", "type", "date", "class", "form-control-plaintext text-center border border-secondary", "disabled", "", 3, "value", 4, "ngIf"], ["type", "text", "readonly", "", "value", "Prezzo attuale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoattuale", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "datainizio", "type", "date", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "datafine", "type", "date", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], [1, "col-1"], ["role", "alert", 1, "col-7", "mt-3", "alert", "float-left", "alert-secondary", "rounded-lg", "border", "border-secondary"], ["style", "width: 100%;", "class", "mt-3 alert float-left alert-light rounded-lg border border-secondary", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "col-4", "mt-3", "alert", "float-left", "rounded-lg"], ["src", "https://icons555.com/images/icons-black/image_icon_arrow_79_pic_512x512.png", "width", "30", "height", "40", 2, "vertical-align", "middle"], ["role", "alert", 1, "mt-3", "alert", "float-left", "alert-light", "rounded-lg", "border", "border-secondary", 2, "width", "100%"]], template: function HomepagenonloggatoComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Lista inserzioni in vendita ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HomepagenonloggatoComponent_li_7_Template, 2, 1, "li", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HomepagenonloggatoComponent_button_9_Template, 2, 0, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HomepagenonloggatoComponent_button_10_Template, 2, 0, "button", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Aggiornamento dati ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Vuoi aggiornare i dati? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_Template_button_click_19_listener() { return ctx.recuperaDatiAggiornati(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Aggiorna dati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Login ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " Vuoi effettuare il login? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_Template_button_click_29_listener() { return ctx.effettuaLogin(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Loggati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, " Registrazione ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Vuoi creare un nuovo account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_Template_button_click_39_listener() { return ctx.effettuaRegistrazione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Registrati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Gestione errori ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, HomepagenonloggatoComponent_div_46_Template, 11, 2, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " Implementazione futura ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Funzionalita extra ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "h5", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Filtraggio inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "button", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "form", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](67, "input", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "input", 29, 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_69_listener($event) { return ctx.filtraggioInserzioni.nomeLibro = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "input", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "input", 32, 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_75_listener($event) { return ctx.filtraggioInserzioni.corsoDiStudi = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "input", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "input", 35, 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_81_listener($event) { return ctx.filtraggioInserzioni.universita = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "input", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "input", 38, 39);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_87_listener($event) { return ctx.filtraggioInserzioni.areaGeografica = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](91, "input", 40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "input", 41, 42);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_93_listener($event) { return ctx.filtraggioInserzioni.venditore = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "input", 43);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "input", 44, 45);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_99_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMinimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "input", 46);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "input", 47, 48);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagenonloggatoComponent_Template_input_ngModelChange_105_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMassimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "div", 49);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "button", 50);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "button", 51);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_Template_button_click_110_listener() { return ctx.filtraInserzioni(); })("submit", function HomepagenonloggatoComponent_Template_button_submit_110_listener() { return ctx.filtraInserzioni(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, "Filtra");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "h5", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "Visualizzazione inserzione in vendita");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "button", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](120, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](121, HomepagenonloggatoComponent_div_121_Template, 56, 11, "div", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "div", 49);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "button", 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "button", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagenonloggatoComponent_Template_button_click_125_listener() { return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div", 56);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "h5", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "button", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "span", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](135, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "div", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](137, HomepagenonloggatoComponent_div_137_Template, 9, 3, "div", 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriInVendita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dettagliErrore.getMessage());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.nomeLibro);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.corsoDiStudi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.universita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.areaGeografica);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.venditore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMinimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMassimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Chat con ", ctx.destinatarioMessaggiChatSelezionata, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.listaMessaggi);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_16__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_17__["NumberValueAccessor"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\r\n    color: grey;\r\n}\r\n\r\n.altezza-card[_ngcontent-%COMP%] {\r\n    height: 250px;\r\n}\r\n\r\n.testo-grassetto[_ngcontent-%COMP%] {\r\n    font-weight: bold;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%] {\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%] {\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%] {\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    margin: auto;\r\n    width: 400px;\r\n}\r\n\r\n.testo-bianco[_ngcontent-%COMP%] {\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9ob21lcGFnZW5vbmxvZ2dhdG8vaG9tZXBhZ2Vub25sb2dnYXRvLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50aS9ob21lcGFnZW5vbmxvZ2dhdG8vaG9tZXBhZ2Vub25sb2dnYXRvLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFyYWdyYWZvLWNlbnRyYXRvIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuZGl2IGEge1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi5hbHRlenphLWNhcmQge1xyXG4gICAgaGVpZ2h0OiAyNTBweDtcclxufVxyXG5cclxuLnRlc3RvLWdyYXNzZXR0byB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnRlc3RvLWdyaWdpbyB7XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW8ge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2RUVGMDtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW8tY2hpYXJvIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3NTgxOEQ7XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHdpZHRoOiA0MDBweDtcclxufVxyXG5cclxuLnRlc3RvLWJpYW5jbyB7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn0iXX0= */"] });
    return HomepagenonloggatoComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomepagenonloggatoComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-homepagenonloggato',
                templateUrl: './homepagenonloggato.component.html',
                styleUrls: ['./homepagenonloggato.component.css']
            }]
    }], function () { return [{ type: src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_11__["MessaggioService"] }, { type: src_app_servizi_persona_service__WEBPACK_IMPORTED_MODULE_12__["PersonaService"] }, { type: src_app_servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_13__["InserzioneService"] }, { type: src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__["Router"] }]; }, null); })();


/***/ }),

/***/ "03fR":
/*!*********************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/nuovaOffertaInserzione.ts ***!
  \*********************************************************************************/
/*! exports provided: nuovaOffertaSelezionata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nuovaOffertaSelezionata", function() { return nuovaOffertaSelezionata; });
//funzione per fare una nuova offerta all inserzione selezionata
function nuovaOffertaSelezionata() {
    //aggiungo anche l id dell utente loggato alla nuova offerta
    this.nuovaOfferta.setIdUtente(this.utenteLoggato.getIdUser());
    //aggiungo anche l id dell inserzione selezionata
    this.nuovaOfferta.setIdInserzione(this.inserzione.getIdInserzione());
    //faccio la nuova offerta
    this.is.nuovaOfferta(this.nuovaOfferta).subscribe((data) => {
        //recupero tutti i dati
        this.recuperaDatiAggiornati();
    }, (err) => {
        //errore fare offerta nuova
        this.dettagliErrore.setMessage("Errore fare offerta nuova");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore fare offerta nuova " + JSON.stringify(err));
    });
}


/***/ }),

/***/ 1:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3Hb4":
/*!******************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/aggiornamentoDati.ts ***!
  \******************************************************************************/
/*! exports provided: aggiornaDati */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "aggiornaDati", function() { return aggiornaDati; });
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");

//funzione per aggiornare tutti i dati
function aggiornaDati() {
    //azzero i dati gia esistenti
    this.statistiche = [];
    this.libri = [];
    this.inserzioni = [];
    this.utenti = [];
    this.moderatore = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__["Utente"]();
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
    //annullo il filtro per le inserzioni
    this.annullaFiltro();
    //ottengo la lista di tutte le inserzioni
    this.getListaInserzioni();
    //ottengo la lista di studenti
    this.getListaStudenti();
    //ottengo le statistiche
    this.getStatistiche();
}


/***/ }),

/***/ "88No":
/*!************************************************!*\
  !*** ./src/app/servizi/statistiche.service.ts ***!
  \************************************************/
/*! exports provided: StatisticheService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatisticheService", function() { return StatisticheService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _persona_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./persona.service */ "DYeW");






let StatisticheService = /** @class */ (() => {
    class StatisticheService {
        constructor(http, us) {
            this.http = http;
            this.us = us;
            //variabile per memorizzare l url del server
            this.url = "http://localhost:8080";
        }
        //funzione per estrarre le statistiche
        getStatistiche() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            console.log(this.us.getToken());
            return this.http.get(this.url + "/statistiche", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
    }
    StatisticheService.ɵfac = function StatisticheService_Factory(t) { return new (t || StatisticheService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"])); };
    StatisticheService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: StatisticheService, factory: StatisticheService.ɵfac, providedIn: 'root' });
    return StatisticheService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](StatisticheService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "DYeW":
/*!********************************************!*\
  !*** ./src/app/servizi/persona.service.ts ***!
  \********************************************/
/*! exports provided: PersonaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PersonaService", function() { return PersonaService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");






let PersonaService = /** @class */ (() => {
    class PersonaService {
        constructor(http) {
            this.http = http;
            //variabile per memorizzare l id dell utente loggato
            this.idUtente = 0;
            //variabile per memorizzare lo username dell utente loggato
            this.username = "";
            //variabile per memorizzare il token di accesso dell utente
            this.token = "";
            //variabile per memorizzare l url del server
            this.url = "http://localhost:8080";
        }
        //metodo per sistemare tutti i parametri dal token
        setPrametriToken(token) {
            var dati = JSON.parse(token);
            this.idUtente = dati.idUser;
            this.username = dati.username;
        }
        //metodo getter per estrarre il token di accesso
        getToken() {
            return this.token;
        }
        //metodo getter per estrarre lo username dell utente loggato
        getUsername() {
            return this.username;
        }
        //metodo getter per estrarre l url di connessione
        getUrl() {
            return this.url;
        }
        //meetodo getter per avere l id dell utente loggato
        getIdUtente() {
            return this.idUtente;
        }
        //funzione per eliminare gli studenti
        eliminaStudente(idStudente) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idUtente", idStudente.toString())
            };
            return this.http.delete(this.url + "/studenti", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione per estrarre la lista di studenti
        getListaStudenti() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.get(this.url + "/studenti", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione per inserire un nuovo moderatore
        inserisciModeratore(moderatore) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.put(this.url + "/moderatori", moderatore, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione per ottenere l utente dall id per vedere i dettagli nel popup dell inserzione
        getUtenteByUsername(username) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("username", username)
            };
            return this.http.get(this.url + "/studenti", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione per ottenere l utente dallo username
        getUtenteById(idUtente) {
            console.log("id utente: " + JSON.stringify(idUtente));
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idUser", idUtente.toString())
            };
            return this.http.get(this.url + "/studenti", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione che fa la richiesta http per effettuare il login
        login(u) {
            //creo header per chiamata http
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    authorization: "Basic " + btoa(u.username + ":" + u.password),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            //faccio richiesta http metodo get per effettuare il login
            return this.http.get(this.url + "/login", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
                //quando ricevo la risposta salvo il token di accesso
                this.token = data.token;
                //mi salvo l id dell utente loggato
                this.idUtente = data.utente.idUser;
                //mi salvo lo username dell utente loggato
                this.username = data.utente.username;
                //se voglio ricordare l accesso mi salvo il token pero lo lascio sempre cosi anche quando refresho la pagina
                //if (u.remember) {
                localStorage.setItem("progetto_token", this.token);
                //}
            }));
        }
        //funzione che resetta la password dell utente cercato via mail
        resettaPassword(persona) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.post(this.url + "/studenti", persona, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione che cambia la password
        cambiaPasswordStudente(persona) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.token,
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.patch(this.url + "/studenti", persona, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione che cambia la password
        cambiaPasswordModeratore(persona) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.token,
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.patch(this.url + "/moderatori", persona, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione che fa la richiesta http per effettuare la registrazione
        registrazione(persona) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.put(this.url + "/studenti", persona, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
            }));
        }
        //funzione che fa la richiesta http per effettuare il rinnovo del token però non implementata ma solo impostata
        rinnovoToken() {
            const tk = localStorage.getItem("progetto_token");
            if (!tk || tk.length < 1) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])({ error: { errormessage: "Errore trovare token nel localStorage" } });
            }
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    Authorization: "Bearer " + tk,
                    "cache-control": "no-cache",
                    "Content-Type": "application/json",
                })
            };
            return this.http.get(this.url + "/renew", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])((data) => {
                this.token = data.token;
                localStorage.setItem("progetto_token", this.token);
            }));
        }
        //funzione per ottenere il token
        setToken() {
            this.token = localStorage.getItem("progetto_token");
        }
        //funzione per effettuare il logout
        logout() {
            this.token = "";
            localStorage.setItem("progetto_token", this.token);
        }
    }
    PersonaService.ɵfac = function PersonaService_Factory(t) { return new (t || PersonaService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
    PersonaService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: PersonaService, factory: PersonaService.ɵfac, providedIn: "root" });
    return PersonaService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PersonaService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "Gfvb":
/*!***************************************************************************!*\
  !*** ./src/app/componenti/modificapassword/modificapassword.component.ts ***!
  \***************************************************************************/
/*! exports provided: ModificapasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModificapasswordComponent", function() { return ModificapasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function ModificapasswordComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.messaggioErrore, " ");
} }
function ModificapasswordComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.messaggioConferma, " ");
} }
function ModificapasswordComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.messaggio, " ");
} }
let ModificapasswordComponent = /** @class */ (() => {
    class ModificapasswordComponent {
        constructor(us, router) {
            this.us = us;
            this.router = router;
            //variabile per accedere allo schema utente per estrarre i dati dal login
            this.u = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //messaggi che possono comparire durante l uso del form di login
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
        }
        ngOnInit() {
        }
        //funzione per cambiare la password temporanea
        cambiaPassword() {
            //creo un utente temporaneo tramite la decodifica del token
            var uTemp = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](JSON.parse(atob(this.us.getToken().split('.')[1])));
            //controllo se l utente e uno studente
            if (uTemp.isStudente()) {
                this.us.cambiaPasswordStudente(this.u).subscribe((d) => {
                    this.router.navigate(["/login"]);
                }, (err) => {
                    //errore cambiamento password studente
                    this.messaggioErrore = JSON.stringify(err.error.message);
                    console.log("Errore cambiamento password studente " + JSON.stringify(err));
                });
            }
            //controllo se l utente e un moderatore
            else if (uTemp.isModeratore()) {
                this.us.cambiaPasswordModeratore(this.u).subscribe((d) => {
                    this.router.navigate(["/login"]);
                }, (err) => {
                    //errore cambiamento password moderatore
                    this.messaggioErrore = JSON.stringify(err.error.message);
                    console.log("Errore cambiamento password moderatore " + JSON.stringify(err));
                });
            }
            else {
                //errore nessuna tipologia di utenti corrispondente
                this.messaggioErrore = "errore nessuna tipologia di utenti corrispondente";
                console.log("errore nessuna tipologia di utenti corrispondente");
            }
        }
    }
    ModificapasswordComponent.ɵfac = function ModificapasswordComponent_Factory(t) { return new (t || ModificapasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
    ModificapasswordComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModificapasswordComponent, selectors: [["app-modificapassword"]], decls: 33, vars: 8, consts: [[1, "container", "mt-3"], [1, "card"], [1, "card-body"], [1, "card-title", "paragrafo-centrato", "text-secondary"], [1, "form-group"], ["type", "password", "id", "password", "name", "password", "placeholder", "Password", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputPassword", "ngModel"], [1, "alert", "alert-danger", 3, "hidden"], ["type", "password", "id", "confermaPassword", "name", "confermaPassword", "placeholder", "Conferma password", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputConfermaPassword", "ngModel"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-primary", "role", "alert", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-lg", "btn-block", "sfondo-grigio-chiaro", 3, "disabled", "click", "submit"], [1, "paragrafo-centrato", "testo-grigio"], ["routerLink", "/login"], ["routerLink", "/registrazione"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-primary"]], template: function ModificapasswordComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Modifica password");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 5, 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ModificapasswordComponent_Template_input_ngModelChange_9_listener($event) { return ctx.u.password = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Password non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 8, 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ModificapasswordComponent_Template_input_ngModelChange_14_listener($event) { return ctx.u.confermaPassword = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Conferma password non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, ModificapasswordComponent_div_18_Template, 2, 1, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ModificapasswordComponent_div_19_Template, 2, 1, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, ModificapasswordComponent_div_20_Template, 2, 1, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModificapasswordComponent_Template_button_click_21_listener() { return ctx.cambiaPassword(); })("submit", function ModificapasswordComponent_Template_button_submit_21_listener() { return ctx.cambiaPassword(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Cambia password");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Hai gia un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Accedi");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " Non hai ancora un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "a", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Registrati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
            const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.u.password);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r0.valid || _r0.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.u.confermaPassword);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r1.valid || _r1.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioErrore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioConferma);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !_r0.valid || !_r1.valid);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9tb2RpZmljYXBhc3N3b3JkL21vZGlmaWNhcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50aS9tb2RpZmljYXBhc3N3b3JkL21vZGlmaWNhcGFzc3dvcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYXJhZ3JhZm8tY2VudHJhdG97XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmRpdiBhe1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi50ZXN0by1ncmlnaW97XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTZFRUYwO1xyXG59XHJcblxyXG4uc2ZvbmRvLWdyaWdpby1jaGlhcm97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU4MThEO1xyXG59XHJcblxyXG4uY2FyZHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHdpZHRoOiA0MDBweDtcclxufSJdfQ== */"] });
    return ModificapasswordComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModificapasswordComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-modificapassword',
                templateUrl: './modificapassword.component.html',
                styleUrls: ['./modificapassword.component.css']
            }]
    }], function () { return [{ type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "Itdg":
/*!*****************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneInserzione.ts ***!
  \*****************************************************************************/
/*! exports provided: inizializzaNuovaInserzione, inserisciInserzione, eliminaInserzione */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inizializzaNuovaInserzione", function() { return inizializzaNuovaInserzione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inserisciInserzione", function() { return inserisciInserzione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eliminaInserzione", function() { return eliminaInserzione; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");


//funzione per inizializzare inserzione e libro in quanto ne devo inserire una nuova e devo azzerare i campi
function inizializzaNuovaInserzione() {
    this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"]();
    this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"]();
}
//funzione per inserire una nuova inserzione
function inserisciInserzione() {
    //inserisco il prezzo attuale
    this.inserzione.setPrezzoAttuale(this.inserzione.getPrezzoIniziale());
    //inserisco il libro
    this.ls.inserisciLibro(this.libro).subscribe((data) => {
        //estraggo tutti i libri per vedere  a che indice sono arrivato per poterlo assegnare all inserzione
        this.ls.getUltimoLibroInserito().subscribe((data) => {
            //mi converto la risposta in json in un array per sfruttare .length
            let libro = data.libri[data.libri.length - 1].idLibro;
            //inserisco l id dell utente loggato nell inserzione da inserire
            this.inserzione.setUtente(this.utenteLoggato.getIdUser());
            //imposto l id del libro sull inserzione
            this.inserzione.setLibro(libro);
            //imposto l id dell utente attuale che corrisponde all inizio all id dell utente loggato
            this.inserzione.setUtentePrezzoAttuale(this.utenteLoggato.getIdUser());
            //imposto l id del vincitore che corrisponde all inizio all id dell utente loggato
            this.inserzione.setVincitore(this.utenteLoggato.getIdUser());
            //inserisco l inserzione
            this.is.inserisciInserzione(this.inserzione).subscribe((data) => {
                //recupero tutti i dati
                this.recuperaDatiAggiornati();
                //torno nella home dello studente
                this.router.navigate(["/homepagestudente"]);
            }, (err) => {
                //errore inserimento inserzione
                this.dettagliErrore.setMessage("Errore inserimento inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore inserimento inserzione " + JSON.stringify(err));
            });
        }, (err) => {
            //errore estrazione ultimo libro inserito
            this.dettagliErrore.setMessage("Errore estrazione ultimo libro inserito");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione ultimo libro inserito " + JSON.stringify(err));
        });
    }, (err) => {
        //errore inserimento libro
        this.dettagliErrore.setMessage("Errore inserimento libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inserimento libro " + JSON.stringify(err));
    });
}
//funzione per eliminare un inserzione
function eliminaInserzione() {
    //elimino il libro collegato all'inserzione
    this.ls.eliminaLibro([this.inserzione.getLibro()]).subscribe(() => {
        //elimino l inserzione
        this.is.eliminaInserzione([this.inserzione.getIdInserzione()]).subscribe((data) => {
            //aggiorno i dati
            this.recuperaDatiAggiornati();
        }, (err) => {
            //errore eliminazione inserzione
            this.dettagliErrore.setMessage("Errore eliminazione inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore eliminazione inserzione " + JSON.stringify(err));
        });
    }, (err) => {
        //errore eliminazione libro
        this.dettagliErrore.setMessage("Errore eliminazione libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore eliminazione libro " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "JjdW":
/*!****************************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneListaStudentiChattato.ts ***!
  \****************************************************************************************/
/*! exports provided: getListaUtentiChat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaUtentiChat", function() { return getListaUtentiChat; });
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");


//funzione per selezionare gli utenti che l utente loggato ha chattato ordinato per date decrescenti
function getListaUtentiChat() {
    //inizializzo la lista
    this.studentiConChat = [];
    //variabile temporanea per indici degli studenti con chat
    var indiciStudentiChat = [];
    //variabile temporanea per la lista dei messaggi
    var listaMessaggiTemp = new Array();
    //estraggo i messaggi con mittente utente loggato senza differenziare per id inserzione
    this.ms.getListaMessaggi(this.utenteLoggato.getIdUser(), null, null).subscribe((data) => {
        //scorro tutti i messaggi
        for (var i = 0; i < data.messaggi.length; ++i) {
            //aggiungo ciascun messaggio nella lista dei messaggi temporanea
            listaMessaggiTemp.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
        }
        //estraggo i messaggi con destinatario utente loggato senza differenziare per id inserzione
        this.ms.getListaMessaggi(null, this.utenteLoggato.getIdUser(), null).subscribe((data) => {
            //scorro tutti i messaggi
            for (let i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi temporanea
                listaMessaggiTemp.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
            }
            //ordino i messaggi pero in ordine decrescente cosi inserisco gli utenti nell ordine degli ultimi messaggi
            listaMessaggiTemp = listaMessaggiTemp.sort((m1, m2) => {
                if (m1.data > m2.data) {
                    return -1;
                }
                return 1;
            });
            //per tutti i messaggi trovati
            for (let i = 0; i < listaMessaggiTemp.length; ++i) {
                //se l utente loggato corrisponde al mittente
                if (this.utenteLoggato.getIdUser() === listaMessaggiTemp[i].getMittente()) {
                    //se l utente del messaggio attuale non è nella lista degli studenti con chat
                    if (!this.isUtentePresente(listaMessaggiTemp[i].getDestinatario(), indiciStudentiChat)) {
                        //inserisco il suo id nella lista
                        indiciStudentiChat.push(listaMessaggiTemp[i].getDestinatario());
                    }
                }
                //se invece l utente loggato corrisponde al destinatario
                else if (this.utenteLoggato.getIdUser() === listaMessaggiTemp[i].getDestinatario()) {
                    //se l utente del messaggio attuale non è nella lista degli studenti con chat
                    if (!this.isUtentePresente(listaMessaggiTemp[i].getMittente(), indiciStudentiChat)) {
                        //inserisco il suo id nella lista
                        indiciStudentiChat.push(listaMessaggiTemp[i].getMittente());
                    }
                }
            }
            for (let i = 0; i < indiciStudentiChat.length; ++i) {
                //controllo che non sia l id pubblic
                if (indiciStudentiChat[i] !== 0) {
                    //trovo i dati dell utente dall id
                    this.us.getUtenteById(indiciStudentiChat[i]).subscribe((data) => {
                        //verifico che abbia trovato esattamente un utente
                        if (data.utenti.length === 1) {
                            //inserisco l utente nella lista degli utenti con cui l utnte loggato ha chattato
                            this.studentiConChat.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]));
                        }
                        //se gli utenti trovati non sono pari ad 1
                        else {
                            this.dettagliErrore.setMessage("Errore piu utenti con lo stesso id line 862");
                            this.dettagliErrore.setReason("");
                            console.log("Errore piu utenti con lo stesso id ");
                        }
                    }, (err) => {
                        //errore estrazione utente dall id
                        this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione destinatario dall id " + err);
                    });
                }
            }
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


/***/ }),

/***/ "JwZQ":
/*!*****************************************************!*\
  !*** ./src/app/componenti/login/login.component.ts ***!
  \*****************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function LoginComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.messaggioErrore, " ");
} }
function LoginComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.messaggioConferma, " ");
} }
function LoginComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r4.messaggio, " ");
} }
let LoginComponent = /** @class */ (() => {
    class LoginComponent {
        constructor(us, router) {
            this.us = us;
            this.router = router;
            //variabile per accedere allo schema utente per estrarre i dati dal login
            this.u = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //messaggi che possono comparire durante l uso del form di login
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
        }
        ngOnInit() {
        }
        //funzione per richiamare la funzione login del servizio
        login() {
            this.us.login(this.u).subscribe((data) => {
                this.messaggioErrore = undefined;
                this.messaggioConferma = "Login effettuato";
                this.messaggio = undefined;
                //guardo il flag della password temporanea per vedere se devo prima modificarla 
                if (data.temp) {
                    //mi sposto nella pagina per modificare la password temporanea
                    this.router.navigate(["/modificapassword"]);
                }
                //se la password non e temporanea
                else {
                    //verifico il ruolo che ha l utente attuale
                    if (JSON.parse(JSON.stringify(data)).utente.ruolo[0] === "Moderatore") {
                        //vado nella homepage del moderatore
                        this.router.navigate(["/homepagemoderatore"]);
                    }
                    else if (JSON.parse(JSON.stringify(data)).utente.ruolo[0] === "Studente") {
                        //vado nella homepage dello studente
                        this.router.navigate(["/homepagestudente"]);
                    }
                    //tipologia utente errata
                    else {
                        this.messaggioErrore = "Tipologia utente errata";
                    }
                }
                //this.router.navigate(["/"]);
            }, (err) => {
                //errore login utente
                this.messaggioErrore = "Username e/o password errati: " + JSON.stringify(err.error.reasons.message);
                this.messaggioConferma = undefined;
                this.messaggio = undefined;
            });
        }
    }
    LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
    LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 35, vars: 8, consts: [[1, "container", "mt-3"], [1, "card"], [1, "card-body"], [1, "card-title", "paragrafo-centrato", "text-secondary"], [1, "form-group"], ["type", "text", "id", "username", "name", "username", "placeholder", "Username", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputUsername", "ngModel"], [1, "alert", "alert-danger", 3, "hidden"], ["type", "password", "id", "password", "name", "password", "placeholder", "Password", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputPassword", "ngModel"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-primary", "role", "alert", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-lg", "btn-block", "sfondo-grigio-chiaro", 3, "disabled", "click", "submit"], [1, "paragrafo-centrato", "testo-grigio"], ["routerLink", "/registrazione"], ["routerLink", "/passworddimenticata"], ["routerLink", "/homepagenonloggato"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-primary"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Accedi");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 5, 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_9_listener($event) { return ctx.u.username = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Username non valido ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 8, 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function LoginComponent_Template_input_ngModelChange_14_listener($event) { return ctx.u.password = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Password non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, LoginComponent_div_18_Template, 2, 1, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, LoginComponent_div_19_Template, 2, 1, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, LoginComponent_div_20_Template, 2, 1, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_21_listener() { return ctx.login(); })("submit", function LoginComponent_Template_button_submit_21_listener() { return ctx.login(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Accedi");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Non hai ancora un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Registrati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Hai dimenticato la password?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Vuoi procedere senza loggarti? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Guarda le inserzioni");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
            const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.u.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r0.valid || _r0.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.u.password);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r1.valid || _r1.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioErrore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioConferma);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !_r0.valid || !_r1.valid);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRpL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFyYWdyYWZvLWNlbnRyYXRve1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5kaXYgYXtcclxuICAgIGNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4udGVzdG8tZ3JpZ2lve1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi5zZm9uZG8tZ3JpZ2lve1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2RUVGMDtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW8tY2hpYXJve1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzc1ODE4RDtcclxufVxyXG5cclxuLmNhcmR7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbn0iXX0= */"] });
    return LoginComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-login",
                templateUrl: "./login.component.html",
                styleUrls: ["./login.component.css"]
            }]
    }], function () { return [{ type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "KkMD":
/*!*************************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/functions/gestioneChat.ts ***!
  \*************************************************************************/
/*! exports provided: getContenutoMessaggioRiferimento, getPersonaNellaChat, getListaMessaggiInserzioneChatPubblica */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContenutoMessaggioRiferimento", function() { return getContenutoMessaggioRiferimento; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPersonaNellaChat", function() { return getPersonaNellaChat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaMessaggiInserzioneChatPubblica", function() { return getListaMessaggiInserzioneChatPubblica; });
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");


//funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
function getContenutoMessaggioRiferimento(messaggio) {
    //controllo di avere un messaggio valido in input
    if (messaggio) {
        //scorro i messaggi in quanto il messaggio di riferimento fa parte della stessa tipologia di messaggi che avevo estratto precedentemente
        for (let i = 0; i < this.listaMessaggi.length; ++i) {
            //se l id di riferimento corrisponde
            if (messaggio.getMessaggioRiferimento() === this.listaMessaggi[i].getIdMessaggio()) {
                return this.listaMessaggi[i];
            }
        }
    }
    return null;
}
//funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
function getPersonaNellaChat(idUtente) {
    //scorro tutte le persone nella chat selezionata
    for (let i = 0; i < this.listaPersoneMessaggi.length; ++i) {
        //verifico che l id della persona coincida con quello in input
        if (this.listaPersoneMessaggi[i].getIdUser() === idUtente) {
            return this.listaPersoneMessaggi[i];
        }
    }
    return null;
}
//funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
function getListaMessaggiInserzioneChatPubblica() {
    //inizializzo la lista dei messaggi
    this.listaMessaggi = [];
    //inizializzo la lista delle persone dentro alla chat
    this.listaPersoneMessaggi = [];
    //creo una variabile temporanea di indici degli utenti dentro alla chat
    var listaIdUtenti = [];
    //controllo che l'inserzione sia selezionata per poter accedere ai campi
    if (this.inserzione) {
        //estraggo i messaggi riferiti solo all inserzione e allo 0 come utente perche pubblico
        this.ms.getListaMessaggi(null, 0, this.inserzione.getIdInserzione()).subscribe((data) => {
            //scorro tutti i messaggi
            for (var i = 0; i < data.messaggi.length; ++i) {
                //aggiungo ciascun messaggio nella lista dei messaggi
                this.listaMessaggi.push(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](data.messaggi[i]));
            }
            //ordino i messaggi in ordine di id dato che sono autoincrement
            this.listaMessaggi = this.listaMessaggi.sort((m1, m2) => {
                if (m1.getIdMessaggio() >= m2.getIdMessaggio()) {
                    return 1;
                }
                return -1;
            });
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
                        this.listaPersoneMessaggi.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]));
                    }
                    //se gli utenti trovati non sono pari ad 1
                    else {
                        this.dettagliErrore.setMessage("Errore nessun utente con quell id");
                        this.dettagliErrore.setReason("");
                        console.log("Errore piu utenti con lo stesso id ");
                    }
                }, (err) => {
                    //errore estrazione utente dall id
                    this.dettagliErrore.setMessage("Errore estrazione destinatario dall id");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione destinatario dall id " + err);
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


/***/ }),

/***/ "LX5T":
/*!******************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/utility.ts ***!
  \******************************************************************/
/*! exports provided: getMessaggioById, getLibriAssociatiInserzioni, isScaduta, isVuota */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMessaggioById", function() { return getMessaggioById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLibriAssociatiInserzioni", function() { return getLibriAssociatiInserzioni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScaduta", function() { return isScaduta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isVuota", function() { return isVuota; });
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");

//funzione per ottenre il messaggio dall id
function getMessaggioById(idMessaggio) {
    //scorro i messaggi in quanto il messaggio di riferimento fa parte della stessa tipologia di messaggi che avevo estratto precedentemente
    for (let i = 0; i < this.listaMessaggi.length; ++i) {
        //se l id di riferimento corrisponde
        if (idMessaggio === this.listaMessaggi[i].getIdMessaggio()) {
            return this.listaMessaggi[i];
        }
    }
    //se invece non ce 
    return null;
}
//funzione per ottenere la lista dei libri associati alle varie inserzioni
function getLibriAssociatiInserzioni() {
    //per ciascuna inserzione creata
    for (let i = 0; i < this.inserzioniCreate.length; ++i) {
        //ottengo il libro a lui riferito
        this.ls.getLibroById(this.inserzioniCreate[i].getLibro()).subscribe((data) => {
            this.libriCreati.push(new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_0__["Libro"](data.libri[0]));
        }, (err) => {
            //errore estrazione libro dell inserzione 
            this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
        });
    }
}
//funzione per vedere se una data e gia scaduta
function isScaduta() {
    return this.inserzione.isScaduta();
}
//funzione per vedere se la lista di utenti è vuota
function isVuota(lista) {
    //se la lunghezza è maggiore di zero falso
    if (lista.length > 0) {
        return false;
    }
    //altrimenti vero
    return true;
}


/***/ }),

/***/ "M2Ar":
/*!***********************************!*\
  !*** ./src/app/classi/offerta.ts ***!
  \***********************************/
/*! exports provided: Offerta */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Offerta", function() { return Offerta; });
//classe per la gestione dell offerta
class Offerta {
    //inizializzzazione offerta
    constructor(offerta) {
        if (offerta) {
            if (offerta.idInserzione)
                this.setIdInserzione(offerta.idInserzione);
            if (offerta.idUtente)
                this.setIdUtente(offerta.idUtente);
            if (offerta.nuovaOfferta)
                this.setNuovaOfferta(offerta.nuovaOfferta);
        }
    }
    getIdInserzione() {
        return this.idInserzione;
    }
    getIdUtente() {
        return this.idUtente;
    }
    getNuovaOfferta() {
        return this.nuovaOfferta;
    }
    setIdInserzione(idInserzione) {
        this.idInserzione = idInserzione;
    }
    setIdUtente(idUtente) {
        this.idUtente = idUtente;
    }
    setNuovaOfferta(nuovaOfferta) {
        this.nuovaOfferta = nuovaOfferta;
    }
}


/***/ }),

/***/ "NSdY":
/*!***********************************************!*\
  !*** ./src/app/servizi/inserzione.service.ts ***!
  \***********************************************/
/*! exports provided: InserzioneService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InserzioneService", function() { return InserzioneService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../servizi/persona.service */ "DYeW");






let InserzioneService = /** @class */ (() => {
    class InserzioneService {
        constructor(http, us) {
            this.http = http;
            this.us = us;
            //variabile per memorizzare l url del server
            this.url = "http://localhost:8080";
        }
        //funzione che inserisce un inserzione
        inserisciInserzione(inserzioneDaInserire) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.put(this.url + "/inserzioni", inserzioneDaInserire, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per estrarre la lista di inserzioni create dall utente loggato
        getListaInserzioniPartecipate(listaIdInserzioni) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idInserzione", listaIdInserzioni.toString())
            };
            return this.http.get(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per estrarre la lista di inserzioni create dall utente loggato
        getListaInserzioniCreateProposte() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("username", this.us.getUsername())
            };
            return this.http.get(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per estrarre la lista di inserzioni in vendita
        getListaInserzioniInVendita() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.get(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per fare una nuova offerta all inserzione in vendita
        nuovaOfferta(nuovaOfferta) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.post(this.url + "/inserzioni", { idInserzione: nuovaOfferta.getIdInserzione(), idUser: this.us.getIdUtente(), nuovaOfferta: nuovaOfferta.getNuovaOfferta() }, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per estrarre la lista di tutte le inserzioni
        getListaInserzioni() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.get(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per eliminare delle inserzioni
        eliminaInserzione(idInserzioni) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idInserzione", idInserzioni.toString())
            };
            return this.http.delete(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per modificare l inserzione
        modificaInserzione(inserzione) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.patch(this.url + "/inserzioni", inserzione, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per avere le inserzioni filtrate
        filtraInserzioni(filtraggio) {
            var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
            //aggiungo i campi alla richiesta solo se necessari
            if (filtraggio.nomeLibro1 !== "")
                params = params.append("nomeLibro", filtraggio.nomeLibro);
            if (filtraggio.corsoDiStudi !== "")
                params = params.append("corsoDiStudi", filtraggio.corsoDiStudi);
            if (filtraggio.universita !== "")
                params = params.append("universita", filtraggio.universita);
            if (filtraggio.areaGeografica !== "")
                params = params.append("areaGeografica", filtraggio.areaGeografica);
            if (filtraggio.venditore !== "")
                params = params.append("username", filtraggio.venditore);
            if (filtraggio.prezzoAttualeMinimo !== "")
                params = params.append("prezzoAttualeMinimo", filtraggio.prezzoAttualeMinimo);
            if (filtraggio.prezzoAttualeMassimo !== "")
                params = params.append("prezzoAttualeMassimo", filtraggio.prezzoAttualeMassimo);
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: params
            };
            return this.http.get(this.url + "/inserzioni", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
    }
    InserzioneService.ɵfac = function InserzioneService_Factory(t) { return new (t || InserzioneService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"])); };
    InserzioneService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: InserzioneService, factory: InserzioneService.ɵfac, providedIn: "root" });
    return InserzioneService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InserzioneService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"] }]; }, null); })();


/***/ }),

/***/ "OXFA":
/*!*******************************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneTipologiaChatSelezionata.ts ***!
  \*******************************************************************************************/
/*! exports provided: azzeramentoFlagChat, setChatSingolaPersona, setChatPrivataInserzione, setChatPubblicaInserzione */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azzeramentoFlagChat", function() { return azzeramentoFlagChat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChatSingolaPersona", function() { return setChatSingolaPersona; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChatPrivataInserzione", function() { return setChatPrivataInserzione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChatPubblicaInserzione", function() { return setChatPubblicaInserzione; });
//funzione per azzerare i flag delle chat
function azzeramentoFlagChat() {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
}
//funzione per usare la chat singola persona
function setChatSingolaPersona() {
    this.chatSingolaPersona = true;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
}
//funzione per usare la chat privata dell inserzione
function setChatPrivataInserzione() {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = true;
    this.chatPubblicaInserzione = false;
}
//funzione per usare la chat pubblica dell inserzione
function setChatPubblicaInserzione() {
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = true;
}


/***/ }),

/***/ "OiYz":
/*!*******************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneModeratore.ts ***!
  \*******************************************************************************/
/*! exports provided: inserisciModeratore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inserisciModeratore", function() { return inserisciModeratore; });
//funzione per inserire il nuovo moderatore
function inserisciModeratore() {
    //inserisco il moderatore
    this.us.inserisciModeratore(this.moderatore).subscribe((data) => {
        //aggiorno i dati
        this.aggiornaDati();
    }, (err) => {
        //errore inserimento moderatore
        this.dettagliErrore.setMessage("Errore inserimento moderatore");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inserimento moderatore " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "PZox":
/*!**************************************!*\
  !*** ./src/app/classi/inserzione.ts ***!
  \**************************************/
/*! exports provided: Inserzione */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inserzione", function() { return Inserzione; });
//classe per la gestione dell inserzione
class Inserzione {
    //inizializzzazione inserzione
    constructor(inserzione) {
        if (inserzione) {
            if (inserzione.idInserzione)
                this.setIdInserzione(inserzione.idInserzione);
            if (inserzione.utente)
                this.setUtente(inserzione.utente);
            if (inserzione.libro)
                this.setLibro(inserzione.libro);
            if (inserzione.dataInizio)
                this.setDataInizio(inserzione.dataInizio);
            if (inserzione.dataFine)
                this.setDataFine(inserzione.dataFine);
            if (inserzione.prezzoIniziale)
                this.setPrezzoIniziale(inserzione.prezzoIniziale);
            if (inserzione.prezzoAttuale)
                this.setPrezzoAttuale(inserzione.prezzoAttuale);
            if (inserzione.prezzoRiserva)
                this.setPrezzoRiserva(inserzione.prezzoRiserva);
            if (inserzione.utentePrezzoAttuale)
                this.setUtentePrezzoAttuale(inserzione.utentePrezzoAttuale);
            if (inserzione.vincitore)
                this.setVincitore(inserzione.vincitore);
        }
    }
    //metodo setter per impostare l id dell inserzione
    setIdInserzione(idInserzione) {
        this.idInserzione = idInserzione;
    }
    //metodo setter per impostare l id dell utente
    setUtente(utente) {
        this.utente = utente;
    }
    //metodo setter per impostare l id dell utente che ha fatto l offerta
    setUtentePrezzoAttuale(utente) {
        this.utentePrezzoAttuale = utente;
    }
    //metodo setter per impostare il vincitore
    setVincitore(utente) {
        this.vincitore = utente;
    }
    //metodo setter per impostare l id del libro associato all inserzione
    setLibro(libro) {
        this.libro = libro;
    }
    //metodo setter per impostare la data di inizio
    setDataInizio(dataInizio) {
        this.dataInizio = dataInizio;
    }
    //metodo setter per impostare la data di fine
    setDataFine(dataFine) {
        this.dataFine = dataFine;
    }
    //metodo setter per impostare il prezzo iniziale
    setPrezzoIniziale(prezzoIniziale) {
        this.prezzoIniziale = prezzoIniziale;
    }
    //metodo setter per impostare il prezzo attuale
    setPrezzoAttuale(prezzoAttuale) {
        this.prezzoAttuale = prezzoAttuale;
    }
    //metodo setter per impostare il prezzo riserva
    setPrezzoRiserva(prezzoRiserva) {
        this.prezzoRiserva = prezzoRiserva;
    }
    //metodo getter per estrarre l id dell utente
    getUtente() {
        return this.utente;
    }
    //metodo getter per estrarre l id dell utente che ha fatto l offerta
    getUtentePrezzoAttuale() {
        return this.utentePrezzoAttuale;
    }
    //metodo getter per estrarre il vincitore
    getVincitore() {
        return this.vincitore;
    }
    //metodo getter per estrarre l id del libro associato all inserzione
    getLibro() {
        return this.libro;
    }
    //metodo getter per estrarre la data di inizio
    getDataInizio() {
        return new Date(this.dataInizio);
    }
    //metodo getter per estrarre la data di fine
    getDataFine() {
        return new Date(this.dataFine);
    }
    //metodo getter per estrarre il prezzo iniziale
    getPrezzoIniziale() {
        return this.prezzoIniziale;
    }
    //metodo getter per estrarre il prezzo attuale
    getPrezzoAttuale() {
        return this.prezzoAttuale;
    }
    //metodo getter per estrarre il prezzo riserva
    getPrezzoRiserva() {
        return this.prezzoRiserva;
    }
    //metodo getter per avere l id dell inserzione
    getIdInserzione() {
        return this.idInserzione;
    }
    //metodo per vedere se l inserzione e scaduta
    isScaduta() {
        //guardo se sono nello stesso anno
        if (new Date(this.dataFine).getFullYear() === new Date().getFullYear()) {
            //guardo se sono nello stesso mese
            if (new Date(this.dataFine).getMonth() === new Date().getMonth()) {
                //guardo se sono nello stesso giorno
                if (new Date(this.dataFine).getDate() === new Date().getDate()) {
                    //scade oggi ma ce ancora tempo
                    return false;
                }
                //se mancano ancora dei giorni allo scadere
                else if (new Date(this.dataFine).getDate() > new Date().getDate()) {
                    return false;
                }
            }
            //se mancano ancora dei mesi allo scadere
            else if (new Date(this.dataFine).getMonth() > new Date().getMonth()) {
                return false;
            }
        }
        //se mancano ancora degli anni allo scadere
        else if (new Date(this.dataFine).getFullYear() > new Date().getFullYear()) {
            return false;
        }
        //se arrivo qua vuol dire che e scaduta
        return true;
    }
    //funzione per vedere se l inserzione e stata vinta dall utente loggato
    isVinta(utente) {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se l utente che ha fatto l ultima offerta sia quello loggato
                if (this.utentePrezzoAttuale === utente) {
                    //guardo se viene superato il prezzo di riserva
                    if (this.prezzoAttuale > this.prezzoRiserva) {
                        //allora e stata vinta
                        return true;
                    }
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }
    //funzione per vedere se l inserzione e stata venduta
    IsVenduta(proprietario) {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se l utente che la ha creata sia quello loggato
                if (this.utente === proprietario) {
                    //guardo se viene superato il prezzo di riserva
                    if (this.prezzoAttuale > this.prezzoRiserva) {
                        //allora e stata vinta
                        return true;
                    }
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }
    //funzione per vedere se l inserzione e stata vinta senza sapere da chi
    isVintaGenerico() {
        //guardo se l inserzione e scaduta altrimenti si possono fare ancora offerte
        if (this.isScaduta()) {
            //guardo che non l abbia creata lo stesso utente che ha fatto l ultima offerta
            if (this.utente !== this.utentePrezzoAttuale) {
                //guardo se viene superato il prezzo di riserva
                if (this.prezzoAttuale > this.prezzoRiserva) {
                    //allora e stata vinta
                    return true;
                }
            }
        }
        //altrimenti non e stata vinta
        return false;
    }
}


/***/ }),

/***/ "Q2q2":
/*!***************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneLogout.ts ***!
  \***************************************************************************/
/*! exports provided: logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
//funzione per effettuare il logout
function logout() {
    this.us.logout();
    this.router.navigate(['/']);
}


/***/ }),

/***/ "S9Lb":
/*!***************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/inizializzazione.ts ***!
  \***************************************************************************/
/*! exports provided: initDati, recuperaDatiAggiornati, azzeramentoVariabili */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initDati", function() { return initDati; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recuperaDatiAggiornati", function() { return recuperaDatiAggiornati; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azzeramentoVariabili", function() { return azzeramentoVariabili; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_offerta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classi/offerta */ "M2Ar");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");




//funzione per init 
function initDati() {
    //ottengo i dati dell utente loggato
    this.us.getUtenteById(this.us.getIdUtente()).subscribe((data) => {
        //configurazione dati utente loggato
        this.utenteLoggato = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_3__["Utente"](data.utenti[0]);
        //configurazione socket
        this.configurazioneSocket();
        //ottengo i dati aggiornati
        this.recuperaDatiAggiornati();
    }, (err) => {
        //errore estrazione dati dell utente loggato
        this.dettagliErrore.setMessage("Errore estrazione dati utente loggato");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione dati utente loggato " + JSON.stringify(err));
    });
}
//funzione per aggiornare i dati
function recuperaDatiAggiornati() {
    //azzeramento variabili
    this.azzeramentoVariabili();
    //azzero il filtro e recupero le inserzioni in vendita
    this.annullaFiltro();
    //recupero le inserzioni create proposte e vinte
    this.getListaInserzioniCreateProposte();
    //recupero le inserzioni che l utente loggato ha partecipato
    this.getListaInserzioniPartecipate();
    //recupero la lista di inserzioni che l utente ha venduto
    this.getListaInserzioniVendute();
    //recupero la lista di persone con chat dalla lista dei messaggi
    this.getListaUtentiChat();
}
//funzione per inizializzazione variabili
function azzeramentoVariabili() {
    this.nuovaOfferta = new src_app_classi_offerta__WEBPACK_IMPORTED_MODULE_2__["Offerta"]();
    this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"]();
    this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"]();
    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_3__["Utente"]();
    this.messaggioRiferimento.setIdMessaggio(0);
    this.messaggioRiferimento.setContenuto("");
    this.messaggioRiferimento.setIdInserzione(0);
    this.chatSingolaPersona = false;
    this.chatPrivataInserzione = false;
    this.chatPubblicaInserzione = false;
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
}


/***/ }),

/***/ "SnxG":
/*!*********************************************************************!*\
  !*** ./src/app/componenti/registrazione/registrazione.component.ts ***!
  \*********************************************************************/
/*! exports provided: RegistrazioneComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistrazioneComponent", function() { return RegistrazioneComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function RegistrazioneComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r7.messaggioErrore, " ");
} }
function RegistrazioneComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r8.messaggioConferma, " ");
} }
function RegistrazioneComponent_div_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r9.messaggio, " ");
} }
let RegistrazioneComponent = /** @class */ (() => {
    class RegistrazioneComponent {
        constructor(us, router) {
            this.us = us;
            this.router = router;
            //variabile per prelevare i dati dal form sfruttando oggetto utente
            this.user = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //eventuali messaggi da stampare
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
        }
        ngOnInit() {
        }
        //funzione per verificare che i dati del form di registrazione siano corretti
        controlliRegistrazione() {
            //verifico che la password e conferma password coincidano
            if (this.user.password === this.user.confermaPassword) {
                return true;
            }
            else {
                return false;
            }
        }
        //funzione per effettuare la registrazione tramite la chiamata del servizio
        registrazione() {
            //imposto i parametri mancanti come le aste partecipate settate ad array vuoto perche devo ancora fare nessuna inserzione partecipata
            this.user.setAstePartecipate([]);
            if (!this.controlliRegistrazione()) {
                this.messaggioErrore = "Password e conferma password diversi";
                this.messaggioConferma = undefined;
                this.messaggio = undefined;
                return;
            }
            this.us.registrazione(this.user).subscribe((d) => {
                this.messaggioErrore = undefined;
                this.messaggioConferma = "Registrazione effettuata";
                this.messaggio = undefined;
                //this.router.navigate( [ "/login" ] );
            }, (err) => {
                this.messaggioErrore = err.error.errormessage || err.error.message;
            });
        }
    }
    RegistrazioneComponent.ɵfac = function RegistrazioneComponent_Factory(t) { return new (t || RegistrazioneComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
    RegistrazioneComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RegistrazioneComponent, selectors: [["app-registrazione"]], decls: 60, vars: 18, consts: [[1, "container", "mt-3"], [1, "card"], [1, "card-body"], [1, "card-title", "paragrafo-centrato", "text-secondary"], [1, "form-group"], ["type", "text", "id", "nome", "name", "nome", "placeholder", "Nome", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputNome", "ngModel"], [1, "alert", "alert-danger", 3, "hidden"], ["type", "text", "id", "cognome", "name", "cognome", "placeholder", "Cognome", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputCognome", "ngModel"], ["type", "text", "id", "username", "name", "username", "placeholder", "Username", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputUsername", "ngModel"], ["type", "text", "id", "areaGeografica", "name", "areaGeografica", "placeholder", "Area geografica", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputAreaGeografica", "ngModel"], ["type", "email", "id", "email", "name", "email", "placeholder", "Email", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputEmail", "ngModel"], ["type", "password", "id", "password", "name", "password", "placeholder", "Password", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputPassword", "ngModel"], ["type", "password", "id", "confermaPassword", "name", "confermaPassword", "placeholder", "Conferma password", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputConfermaPassword", "ngModel"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-primary", "role", "alert", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-lg", "btn-block", "sfondo-grigio-chiaro", 3, "disabled", "click", "submit"], [1, "paragrafo-centrato", "testo-grigio"], ["routerLink", "/login"], ["routerLink", "/passworddimenticata"], ["routerLink", "/homepagenonloggato"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-primary"]], template: function RegistrazioneComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Registrazione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 5, 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_9_listener($event) { return ctx.user.nome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Nome non valido ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 8, 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_14_listener($event) { return ctx.user.cognome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, " Cognome non valido ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 10, 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_19_listener($event) { return ctx.user.username = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Username non valido ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "input", 12, 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_24_listener($event) { return ctx.user.areaGeografica = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, " Area geografica non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 14, 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_29_listener($event) { return ctx.user.email = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Email non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "input", 16, 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_34_listener($event) { return ctx.user.password = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, " Password non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "input", 18, 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RegistrazioneComponent_Template_input_ngModelChange_39_listener($event) { return ctx.user.confermaPassword = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Conferma password non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](43, RegistrazioneComponent_div_43_Template, 2, 1, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, RegistrazioneComponent_div_44_Template, 2, 1, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](45, RegistrazioneComponent_div_45_Template, 2, 1, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RegistrazioneComponent_Template_button_click_46_listener() { return ctx.registrazione(); })("submit", function RegistrazioneComponent_Template_button_submit_46_listener() { return ctx.registrazione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Registrati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " Hai gia un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "a", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Accedi");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Hai dimenticato la password?");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, " Vuoi procedere senza loggarti? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "a", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Guarda le inserzioni");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
            const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
            const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](20);
            const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](25);
            const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](30);
            const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](35);
            const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.nome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r0.valid || _r0.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.cognome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r1.valid || _r1.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r2.valid || _r2.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.areaGeografica);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r3.valid || _r3.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.email);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r4.valid || _r4.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.password);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r5.valid || _r5.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.user.confermaPassword);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r6.valid || _r6.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioErrore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioConferma);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !_r0.valid || !_r1.valid || !_r2.valid || !_r4.valid || !_r5.valid || !_r6.valid || !_r3.valid);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9yZWdpc3RyYXppb25lL3JlZ2lzdHJhemlvbmUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50aS9yZWdpc3RyYXppb25lL3JlZ2lzdHJhemlvbmUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYXJhZ3JhZm8tY2VudHJhdG97XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbmRpdiBhe1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi50ZXN0by1ncmlnaW97XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTZFRUYwO1xyXG59XHJcblxyXG4uc2ZvbmRvLWdyaWdpby1jaGlhcm97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU4MThEO1xyXG59XHJcblxyXG4uY2FyZHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHdpZHRoOiA0MDBweDtcclxufSJdfQ== */"] });
    return RegistrazioneComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RegistrazioneComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-registrazione",
                templateUrl: "./registrazione.component.html",
                styleUrls: ["./registrazione.component.css"]
            }]
    }], function () { return [{ type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");



let AppComponent = /** @class */ (() => {
    class AppComponent {
        constructor() {
            this.title = 'ClientTaw2020';
        }
    }
    AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
    AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, consts: [[1, "container"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
    return AppComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "SzPC":
/*!*******************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/homepagemoderatore.component.ts ***!
  \*******************************************************************************/
/*! exports provided: HomepagemoderatoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagemoderatoreComponent", function() { return HomepagemoderatoreComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _classi_inserzione__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classi/inserzione */ "PZox");
/* harmony import */ var _classi_Libro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_errore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/classi/errore */ "ZkY6");
/* harmony import */ var _functions_aggiornamentoDati__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./functions/aggiornamentoDati */ "3Hb4");
/* harmony import */ var _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/gestioneFiltro */ "fqJ5");
/* harmony import */ var _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/gestioneInserzioni */ "YSjo");
/* harmony import */ var _functions_gestioneLogout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functions/gestioneLogout */ "Q2q2");
/* harmony import */ var _functions_gestioneModeratore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/gestioneModeratore */ "OiYz");
/* harmony import */ var _functions_gestioneStatistiche__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functions/gestioneStatistiche */ "lB4H");
/* harmony import */ var _functions_gestioneStudenti__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./functions/gestioneStudenti */ "vtWd");
/* harmony import */ var _functions_gestioneToken__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./functions/gestioneToken */ "i+Sd");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../servizi/inserzione.service */ "NSdY");
/* harmony import */ var src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/servizi/libro.service */ "ZedN");
/* harmony import */ var src_app_servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/servizi/statistiche.service */ "88No");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ "3Pt+");





















function HomepagemoderatoreComponent_li_7_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_li_7_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r37); const i_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r35.setInserzioneSelezionata(i_r33.idInserzione); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Modifica ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r31.nome, "");
} }
function HomepagemoderatoreComponent_li_7_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagemoderatoreComponent_li_7_span_1_span_1_Template, 5, 1, "span", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r33 = ctx.$implicit;
    const l_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r33.libro == l_r31.idLibro);
} }
function HomepagemoderatoreComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagemoderatoreComponent_li_7_span_1_Template, 2, 1, "span", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.inserzioni);
} }
function HomepagemoderatoreComponent_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_button_9_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41); const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r40.filtraInserzioni(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Filtra");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagemoderatoreComponent_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_button_10_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r43); const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r42.aggiornaDati(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Annulla filtro");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagemoderatoreComponent_li_26_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_li_26_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r46); const u_r44 = ctx.$implicit; const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r45.eliminaStudente(u_r44.idUser); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Elimina");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const u_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"]("", u_r44.nome, " ", u_r44.cognome, " ", u_r44.username, "");
} }
function HomepagemoderatoreComponent_div_72_Template(rf, ctx) { if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Messaggio: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Reason: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_div_72_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r48); const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r47.dettagliErrore.setMessage(""); return ctx_r47.dettagliErrore.setReason(""); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4.dettagliErrore.getMessage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r4.dettagliErrore.getReason(), " ");
} }
let HomepagemoderatoreComponent = /** @class */ (() => {
    class HomepagemoderatoreComponent {
        constructor(us, is, ls, ss, router) {
            this.us = us;
            this.is = is;
            this.ls = ls;
            this.ss = ss;
            this.router = router;
            //variabile per filtrare i dati delle inserzioni
            this.filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };
            //variabile per accedere allo schema inserzione 
            this.inserzione = new _classi_inserzione__WEBPACK_IMPORTED_MODULE_2__["Inserzione"]();
            //variabile per accedere allo schema del libro
            this.libro = new _classi_Libro__WEBPACK_IMPORTED_MODULE_3__["Libro"]();
            //variabile per accedere allo schema dell utente che ha creato l inserzione
            this.utenteInserzioneCreata = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //variabile per accedere allo schema dell utente che ha fatto l ultima proposta all inserzione
            this.utenteInserzioneUltimaOfferta = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //variabile per memorizzare il nuovo moderatore
            this.moderatore = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //variabile per accedere alla lista di tutti gli studenti
            this.utenti = new Array();
            //variabile per accedere alla lista di tutte le inserzioni
            this.inserzioni = new Array();
            //variabile per accedere alla lista di libri associati a tutte le inserzioni
            this.libri = new Array();
            //varibaile per memorizzare le statistiche e quindi array di 3 posizioni
            this.statistiche = new Array();
            //messaggi che possono comparire durante l uso del form di login
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
            //variabile per la gestione degli errori
            this.dettagliErrore = new src_app_classi_errore__WEBPACK_IMPORTED_MODULE_4__["Errore"]();
            //-----------------------------------------RECUPERO TOKEN ACCESSO------------------------------------
            //funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
            this.recuperaDatiUtenteToken = _functions_gestioneToken__WEBPACK_IMPORTED_MODULE_12__["recuperaDatiUtenteToken"];
            //-----------------------------------------AGGIORNAMENTO DATI------------------------------------
            //funzione per aggiornare tutti i dati
            this.aggiornaDati = _functions_aggiornamentoDati__WEBPACK_IMPORTED_MODULE_5__["aggiornaDati"];
            //-----------------------------------------GESTIONE FILTRO------------------------------------
            //funzione per vedere se il filtro e attivato o disattivato
            this.verificaFiltro = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_6__["verificaFiltro"];
            //funzione per annullare il filtro
            this.annullaFiltro = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_6__["annullaFiltro"];
            //funzione per filtrare le inserzioni in vendita
            this.filtraInserzioni = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_6__["filtraInserzioni"];
            //-----------------------------------------GESTIONE INSERZIONI------------------------------------
            //funzione per ottenere tutte le inserzioni dato che sono un moderatore
            this.getListaInserzioni = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["getListaInserzioni"];
            //funzione per settare l inserzione che il moderatore ha selezionato dall elenco
            this.setInserzioneSelezionata = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["setInserzioneSelezionata"];
            //funzione per eliminare un inserzione
            this.eliminaInserzione = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["eliminaInserzione"];
            //funzione per modificare i dati dell inserzione
            this.modificaInserzione = _functions_gestioneInserzioni__WEBPACK_IMPORTED_MODULE_7__["modificaInserzione"];
            //-----------------------------------------GESTIONE STUDENTI------------------------------------
            //funzione per estrarre la lista di utenti
            this.getListaStudenti = _functions_gestioneStudenti__WEBPACK_IMPORTED_MODULE_11__["getListaStudenti"];
            //funzione per eliminare uno studente
            this.eliminaStudente = _functions_gestioneStudenti__WEBPACK_IMPORTED_MODULE_11__["eliminaStudente"];
            //-----------------------------------------GESTIONE MODERATORE------------------------------------
            //funzione per inserire il nuovo moderatore
            this.inserisciModeratore = _functions_gestioneModeratore__WEBPACK_IMPORTED_MODULE_9__["inserisciModeratore"];
            //-----------------------------------------GESTIONE STATISTICHE------------------------------------
            //funzione per estrarre le statistiche
            this.getStatistiche = _functions_gestioneStatistiche__WEBPACK_IMPORTED_MODULE_10__["getStatistiche"];
            //-----------------------------------------GESTIONE LOGOUT------------------------------------
            //funzione per effettuare il logout
            this.logout = _functions_gestioneLogout__WEBPACK_IMPORTED_MODULE_8__["logout"];
        }
        //-----------------------------------------INIZIALIZZAZIONE------------------------------------
        ngOnInit() {
            //recupero i dati dell utente dal token altrimenti bisgona rifare il login
            this.recuperaDatiUtenteToken();
        }
    }
    HomepagemoderatoreComponent.ɵfac = function HomepagemoderatoreComponent_Factory(t) { return new (t || HomepagemoderatoreComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_14__["InserzioneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_15__["LibroService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_16__["StatisticheService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"])); };
    HomepagemoderatoreComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomepagemoderatoreComponent, selectors: [["app-homepagemoderatore"]], decls: 290, vars: 34, consts: [[1, "container"], [1, "row", "row-cols-1", "row-cols-md-3"], [1, "col-md-4"], [1, "card", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "text-center", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "list-group", "list-group-flush", "overflow-auto"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], ["type", "button", "class", "btn btn-block btn-secondary btn-sm float-right", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-block btn-danger btn-sm float-right", 3, "click", 4, "ngIf"], [1, "card", "text-center", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "card-body", "text-secondary"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#inserimentomoderatore", 1, "btn", "btn-block", "btn-secondary", "btn-sm"], [1, "align-middle", "text-secondary"], ["type", "button", "disabled", "", 1, "btn", "btn-sm", "float-right"], ["type", "button", 1, "btn", "btn-block", "btn-secondary", "btn-sm", 3, "click"], [1, "card-body"], ["id", "alertnuovoerrore", "class", "alert alert-secondary alert-dismissible fade show mt-3 ml-3 mr-3", "role", "alert", 4, "ngIf"], ["id", "modificainserzione", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-xl"], [1, "modal-content"], [1, "modal-header", "text-center"], [1, "modal-title", "text"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], [1, "modal-body"], [1, "row"], [1, "col-md-3", "mt-3", "text-center"], ["type", "text", "readonly", "", "value", "Utente", 1, "form-control-plaintext", "text-center", "border", "border-light"], [1, "col-md-9", "mt-3", "text-center"], ["name", "utentecreatoofferta", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputLibro", "ngModel"], ["type", "text", "readonly", "", "value", "Libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "libro", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["type", "text", "readonly", "", "value", "Corso di studi", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "corsodistudi", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputCorsoDiStudi", "ngModel"], ["type", "text", "readonly", "", "value", "Universita", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "universita", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputUniversita", "ngModel"], ["type", "text", "readonly", "", "value", "Autore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "autore", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAutore", "ngModel"], ["type", "text", "readonly", "", "value", "Anno di pubblicazione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "annodipubblicazione", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAnnoDiPubblicazione", "ngModel"], ["type", "text", "readonly", "", "value", "Edizione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "edizione", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputEdizione", "ngModel"], ["type", "text", "readonly", "", "value", "Isbn", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "isbn", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputIsbn", "ngModel"], ["type", "text", "readonly", "", "value", "Data inizio", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datainizio", "type", "date", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputDataInizio", "ngModel"], ["type", "text", "readonly", "", "value", "Data fine", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datafine", "type", "date", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputDataFine", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo iniziale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoiniziale", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoIniziale", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoattuale", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoAttuale", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo riserva", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoriserva", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoRiserva", "ngModel"], ["type", "text", "readonly", "", "value", "Utente prezzo attuale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "utenteultimaofferta", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], [1, "modal-footer"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-warning", 3, "click"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-success", 3, "click"], ["id", "filtrareinserzioni", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["action", "#", "method", "GET"], ["type", "text", "readonly", "", "value", "Nome libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["inputNomeLibro", "ngModel"], ["name", "corsodistudi", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["name", "universita", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["type", "text", "readonly", "", "value", "Area gerografica", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "areaGeografica", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAreaGeografica", "ngModel"], ["type", "text", "readonly", "", "value", "Venditore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "venditore", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputVenditore", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale minimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMinimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMinimo", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale massimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMassimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMassimo", "ngModel"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-success", 3, "click", "submit"], ["id", "inserimentomoderatore", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "text", "readonly", "", "value", "Nome", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "nome", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputNome", "ngModel"], ["type", "text", "readonly", "", "value", "Cognome", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "cognome", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputCognome", "ngModel"], ["type", "text", "readonly", "", "value", "Username", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "username", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputUsername", "ngModel"], ["type", "text", "readonly", "", "value", "Email", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "email", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputEmail", "ngModel"], ["type", "text", "readonly", "", "value", "Area geografica", 1, "form-control-plaintext", "text-center", "border", "border-light"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#modificainserzione", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 1, "btn", "btn-block", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", 1, "btn", "btn-block", "btn-danger", "btn-sm", "float-right", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["id", "alertnuovoerrore", "role", "alert", 1, "alert", "alert-secondary", "alert-dismissible", "fade", "show", "mt-3", "ml-3", "mr-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"]], template: function HomepagemoderatoreComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Gestione inserzioni ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, HomepagemoderatoreComponent_li_7_Template, 2, 1, "li", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "li", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, HomepagemoderatoreComponent_button_9_Template, 2, 0, "button", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, HomepagemoderatoreComponent_button_10_Template, 2, 0, "button", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Aggiungi moderatore ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Vuoi inserire un nuovo moderatore? Premi il bottone e inserisci i suoi dati. Ricordagli che la prima password \u00E8 temporanea ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Inserisci moderatore");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Cancellazione studenti ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "ul", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, HomepagemoderatoreComponent_li_26_Template, 5, 3, "li", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Gestione statistiche ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "ul", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "span", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Inserzioni attive");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "button", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "li", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "span", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Inserzioni vinte");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "button", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Inserzioni non vinte");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "button", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, " Aggiornamento dati ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, " Vuoi aggiornare i dati? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_55_listener() { return ctx.aggiornaDati(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Aggiorna dati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](60, " Logout ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, " Sei sicuro di voler far il logout? Sarai obbligato a reinserire le credenziali ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "button", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_65_listener() { return ctx.logout(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "Effettua logout");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, " Gestione errori ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](72, HomepagemoderatoreComponent_div_72_Template, 11, 2, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, " Implementazione futura ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, " Funzionalita extra ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, " Implementazione futura ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, " Funzionalita extra ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "Modifica inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "input", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "input", 31, 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_100_listener($event) { return ctx.utenteInserzioneCreata.username = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "input", 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "input", 34, 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_106_listener($event) { return ctx.libro.nome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "input", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "input", 36, 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_112_listener($event) { return ctx.libro.corsoDiStudi = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](116, "input", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "input", 39, 40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_118_listener($event) { return ctx.libro.universita = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "input", 41);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "input", 42, 43);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_124_listener($event) { return ctx.libro.autore = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](128, "input", 44);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "input", 45, 46);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_130_listener($event) { return ctx.libro.annoPubblicazione = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "input", 47);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "input", 48, 49);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_136_listener($event) { return ctx.libro.edizione = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](140, "input", 50);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "input", 51, 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_142_listener($event) { return ctx.libro.isbn = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](146, "input", 53);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "input", 54, 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_148_listener($event) { return ctx.inserzione.dataInizio = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "input", 56);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "input", 57, 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_154_listener($event) { return ctx.inserzione.dataFine = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](158, "input", 59);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "input", 60, 61);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_160_listener($event) { return ctx.inserzione.prezzoIniziale = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](164, "input", 62);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "input", 63, 64);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_166_listener($event) { return ctx.inserzione.prezzoAttuale = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](170, "input", 65);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "input", 66, 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_172_listener($event) { return ctx.inserzione.prezzoRiserva = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](176, "input", 68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "input", 69, 32);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_178_listener($event) { return ctx.utenteInserzioneUltimaOfferta.username = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 70);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "button", 71);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_181_listener() { return ctx.eliminaInserzione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, "Elimina");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "button", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "button", 73);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_185_listener() { return ctx.modificaInserzione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](186, "Modifica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "div", 74);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](188, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "Filtraggio inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](194, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](195, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](196, "form", 75);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](200, "input", 76);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](202, "input", 34, 77);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_202_listener($event) { return ctx.filtraggioInserzioni.nomeLibro = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](206, "input", 35);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "input", 78, 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_208_listener($event) { return ctx.filtraggioInserzioni.corsoDiStudi = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](210, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](212, "input", 38);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "input", 79, 40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_214_listener($event) { return ctx.filtraggioInserzioni.universita = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](217, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](218, "input", 80);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](219, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "input", 81, 82);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_220_listener($event) { return ctx.filtraggioInserzioni.areaGeografica = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](224, "input", 83);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "input", 84, 85);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_226_listener($event) { return ctx.filtraggioInserzioni.venditore = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](228, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](230, "input", 86);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "input", 87, 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_232_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMinimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](236, "input", 89);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](238, "input", 90, 91);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_238_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMassimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "div", 70);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "button", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](242, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "button", 92);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_243_listener() { return ctx.filtraInserzioni(); })("submit", function HomepagemoderatoreComponent_Template_button_submit_243_listener() { return ctx.filtraInserzioni(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, "Filtra");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "div", 93);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, "Inserimento nuovo moderatore");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](253, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "div", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](257, "input", 94);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](258, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "input", 95, 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_259_listener($event) { return ctx.moderatore.nome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](262, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](263, "input", 97);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](264, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "input", 98, 99);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_265_listener($event) { return ctx.moderatore.cognome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](268, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](269, "input", 100);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](270, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](271, "input", 101, 102);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_271_listener($event) { return ctx.moderatore.username = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](274, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](275, "input", 103);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](276, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](277, "input", 104, 105);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_277_listener($event) { return ctx.moderatore.email = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](279, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](280, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](281, "input", 106);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](282, "div", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](283, "input", 81, 85);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagemoderatoreComponent_Template_input_ngModelChange_283_listener($event) { return ctx.moderatore.areaGeografica = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](285, "div", 70);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](286, "button", 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](287, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](288, "button", 92);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagemoderatoreComponent_Template_button_click_288_listener() { return ctx.inserisciModeratore(); })("submit", function HomepagemoderatoreComponent_Template_button_submit_288_listener() { return ctx.inserisciModeratore(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](289, "Inserisci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libri);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.utenti);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0\u00A0\u00A0", ctx.statistiche[0], "\u00A0\u00A0\u00A0\u00A0\u00A0");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0\u00A0\u00A0", ctx.statistiche[2], "\u00A0\u00A0\u00A0\u00A0\u00A0");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0\u00A0\u00A0", ctx.statistiche[1], "\u00A0\u00A0\u00A0\u00A0\u00A0");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dettagliErrore.getMessage());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.utenteInserzioneCreata.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.nome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.corsoDiStudi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.universita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.autore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.annoPubblicazione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.edizione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.isbn);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.dataInizio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.dataFine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.prezzoIniziale);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.prezzoAttuale);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.prezzoRiserva);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.utenteInserzioneUltimaOfferta.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.nomeLibro);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.corsoDiStudi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.universita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.areaGeografica);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.venditore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMinimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMassimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.moderatore.nome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.moderatore.cognome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.moderatore.username);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.moderatore.email);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.moderatore.areaGeografica);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_18__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_18__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["NumberValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_19__["NgForm"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.altezza-card[_ngcontent-%COMP%]{\r\n    height: 250px;\r\n}\r\n\r\n.testo-grassetto[_ngcontent-%COMP%]{\r\n    font-weight: bold;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\r\n\r\n.testo-bianco[_ngcontent-%COMP%]{\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9ob21lcGFnZW1vZGVyYXRvcmUvaG9tZXBhZ2Vtb2RlcmF0b3JlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50aS9ob21lcGFnZW1vZGVyYXRvcmUvaG9tZXBhZ2Vtb2RlcmF0b3JlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGFyYWdyYWZvLWNlbnRyYXRve1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG5kaXYgYXtcclxuICAgIGNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4uYWx0ZXp6YS1jYXJke1xyXG4gICAgaGVpZ2h0OiAyNTBweDtcclxufVxyXG5cclxuLnRlc3RvLWdyYXNzZXR0b3tcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4udGVzdG8tZ3JpZ2lve1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbn1cclxuXHJcbi5zZm9uZG8tZ3JpZ2lve1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0U2RUVGMDtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW8tY2hpYXJve1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzc1ODE4RDtcclxufVxyXG5cclxuLmNhcmR7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICB3aWR0aDogNDAwcHg7XHJcbn1cclxuXHJcbi50ZXN0by1iaWFuY297XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn0iXX0= */"] });
    return HomepagemoderatoreComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomepagemoderatoreComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-homepagemoderatore',
                templateUrl: './homepagemoderatore.component.html',
                styleUrls: ['./homepagemoderatore.component.css']
            }]
    }], function () { return [{ type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"] }, { type: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_14__["InserzioneService"] }, { type: src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_15__["LibroService"] }, { type: src_app_servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_16__["StatisticheService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_17__["Router"] }]; }, null); })();


/***/ }),

/***/ "TAZU":
/*!************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneToken.ts ***!
  \************************************************************************/
/*! exports provided: recuperaDatiUtenteToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recuperaDatiUtenteToken", function() { return recuperaDatiUtenteToken; });
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");

//funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
function recuperaDatiUtenteToken() {
    //recupero dallo storage il token
    this.us.setToken();
    //recupero il token e controllo che se e vuoto effettuo il redirect
    if (this.us.getToken() === "") {
        this.router.navigate(["/login"]);
    }
    //altrimenti se non e vuoto
    else {
        //decodifico il token in stringa
        var tokenstring = atob(this.us.getToken().split('.')[1]);
        //creo un utente temporaneo con i dati del token
        let utenteTemp = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__["Utente"](JSON.parse(tokenstring));
        //verifico che l utente loggato sia effettivamente uno studente
        if (utenteTemp.isStudente()) {
            //assegno i dati del token
            this.us.setPrametriToken(tokenstring);
            //recupero i dati iniziali dell applicativo
            this.initDati();
        }
        //se non e un moderatore
        else {
            this.us.logout();
            this.router.navigate(["/login"]);
        }
    }
}


/***/ }),

/***/ "UX8w":
/*!*************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneLogout.ts ***!
  \*************************************************************************/
/*! exports provided: logout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
//funzione per effettuare il logout e reindirizzati alla pagina di login
function logout() {
    this.us.logout();
    this.router.navigate(['/']);
}


/***/ }),

/***/ "YSjo":
/*!*******************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneInserzioni.ts ***!
  \*******************************************************************************/
/*! exports provided: getListaInserzioni, setInserzioneSelezionata, eliminaInserzione, modificaInserzione */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioni", function() { return getListaInserzioni; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneSelezionata", function() { return setInserzioneSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eliminaInserzione", function() { return eliminaInserzione; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modificaInserzione", function() { return modificaInserzione; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");



//funzione per ottenere tutte le inserzioni dato che sono un moderatore
function getListaInserzioni() {
    //resetto la lista delle varie inserzioni
    this.inserzioni = [];
    //resetto la lista dei vari libri
    this.libri = [];
    //ottengo la lista delle inserzioni
    this.is.getListaInserzioni().subscribe((data) => {
        //per ciascuna inserzione, la inserisco nella mia lista dato che un moderatore le deve poter vedere e modificare tutte
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //inserisco l inserzione nella lista
            this.inserzioni.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
            //inserisco il libro che e sull inserzione appena letta nella lista dei libri
            this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                this.libri.push(new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data1.libri[0]));
            });
        }
    }, (err) => {
        //errore estrazione di tutte le inserzioni 
        this.dettagliErrore.setMessage("Errore estrazione inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni " + JSON.stringify(err));
    });
}
//funzione per settare l inserzione che il moderatore ha selezionato dall elenco
function setInserzioneSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (var i = 0; i < this.inserzioni.length; ++i) {
        //verifico che l id corrisponda a quella che il moderatore ha selezionato per aprire il popup
        if (this.inserzioni[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioni[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utenteInserzioneCreata = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                    //devo estrarre anche i dati dell utente che ha fatto l ultima offerta
                    this.us.getUtenteById(this.inserzione.getUtentePrezzoAttuale()).subscribe((data) => {
                        //mi salvo i dati dell utente che ha fatto l ultima proposta
                        this.utenteInserzioneUltimaOfferta = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                    });
                }, (err) => {
                    //errore estrazione dell utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente creazione inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente creazione inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per eliminare un inserzione
function eliminaInserzione() {
    //elimino il libro collegato all'inserzione
    this.ls.eliminaLibro([this.inserzione.getLibro()]).subscribe(() => {
        //elimino l inserzione
        this.is.eliminaInserzione([this.inserzione.getIdInserzione()]).subscribe((data) => {
            //aggiorno i dati
            this.aggiornaDati();
        }, (err) => {
            //errore eliminazione inserzione
            this.dettagliErrore.setMessage("Errore eliminazione inserzione");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore eliminazione inserzione " + JSON.stringify(err));
        });
    }, (err) => {
        //errore eliminazione libro
        this.dettagliErrore.setMessage("Errore eliminazione libro");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore eliminazione libro " + JSON.stringify(err));
    });
}
//funzione per modificare i dati dell inserzione
function modificaInserzione() {
    //aggiorno le due date evitando formati diversi che mi danno eventuali errori
    this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
    this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
    //estraggo i dati dell utente che ha creato l inserzione dallo username per vedere che ce ne sia uno valido
    this.us.getUtenteByUsername(this.utenteInserzioneCreata.getUsername()).subscribe((data) => {
        //verifico di aver trovato un utente solo con quello username altrimenti errore
        if (data.utenti.length === 1) {
            //aggiorno l inserzione con l id dell utente nuovo che la ha creata
            this.inserzione.setUtente(data.utenti[0].idUser);
            //estraggo i dati dell utente che ha fatto l ultima offerta all inserzione dallo username per vedere che ce ne sia uno valido
            this.us.getUtenteByUsername(this.utenteInserzioneUltimaOfferta.getUsername()).subscribe((data) => {
                //verifico di aver trovato un utente solo con quello username altrimenti errore
                if (data.utenti.length === 1) {
                    //aggiorno l id dell utente che ha fatto l ultima offerta
                    this.inserzione.setUtentePrezzoAttuale(data.utenti[0].idUser);
                    //modifico i dati dell inserzione
                    this.is.modificaInserzione(this.inserzione).subscribe((data) => {
                        console.log(JSON.stringify(data));
                        //modifico i dati del libro
                        this.ls.modificaLibro(this.libro).subscribe((data) => {
                            //aggiorno i dati
                            this.aggiornaDati();
                        }, (err) => {
                            //errore modifica libro
                            this.dettagliErrore.setMessage("Errore modifica libro");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore modifica libro " + JSON.stringify(err));
                        });
                        ;
                    }, (err) => {
                        //errore modifica dati inserzione
                        this.dettagliErrore.setMessage("Errore modifica dati inserzione");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore modifica dati inserzione " + JSON.stringify(err));
                    });
                }
                //se non ce nessun utente o ci sono piu utenti con quello username errore
                else {
                    //errore estrazione di tutte le inserzioni 
                    this.dettagliErrore.setMessage("Errore modifica dati inserzione: nessun utente con quello username");
                    this.dettagliErrore.setReason("");
                    console.log("Nessun utente con quello username");
                }
            });
        }
        //se non ce nessun utente o ci sono piu utenti con quello username errore
        else {
            //errore estrazione di tutte le inserzioni 
            this.dettagliErrore.setMessage("Errore modifica dati inserzione: nessun utente con quello username");
            this.dettagliErrore.setReason("");
            console.log("Nessun utente con quello username");
        }
    });
}


/***/ }),

/***/ "YTg5":
/*!********************************!*\
  !*** ./src/app/classi/user.ts ***!
  \********************************/
/*! exports provided: Utente */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utente", function() { return Utente; });
//classe per la gestione dell utente
class Utente {
    //inizializzzazione utente
    constructor(utente) {
        this.ruolo = [];
        this.astePartecipate = [];
        if (utente) {
            if (utente.idUser)
                this.setIdUser(utente.idUser);
            if (utente.nome)
                this.setNome(utente.nome);
            if (utente.cognome)
                this.setCognome(utente.cognome);
            if (utente.ruolo)
                this.setRuolo(utente.ruolo);
            if (utente.username)
                this.setUsername(utente.username);
            if (utente.email)
                this.setEmail(utente.email);
            if (utente.areaGeografica)
                this.setAreaGeografica(utente.areaGeografica);
            if (utente.astePartecipate)
                this.setAstePartecipate(utente.astePartecipate);
            if (utente.remember)
                this.setRemember(utente.remember);
        }
    }
    //funzione per vedere se l utente e uno studente
    isStudente() {
        var flag = 0;
        this.ruolo.forEach((ruoloSingolo) => {
            console.log("studente " + JSON.stringify(ruoloSingolo));
            if (ruoloSingolo === "Studente") {
                flag = 1;
            }
        });
        if (flag === 1)
            return true;
        else
            return false;
    }
    //funzione per vedere se l utente e un moderatore
    isModeratore() {
        var flag = 0;
        this.ruolo.forEach((ruoloSingolo) => {
            console.log("studente " + JSON.stringify(ruoloSingolo));
            if (ruoloSingolo === "Moderatore") {
                flag = 1;
            }
        });
        if (flag === 1)
            return true;
        else
            return false;
    }
    //metodo setter per impostare il nome
    setNome(nome) {
        this.nome = nome;
    }
    //metodo setter per impostare il cognome
    setCognome(cognome) {
        this.cognome = cognome;
    }
    //metodo setter per impostare lo username
    setUsername(username) {
        this.username = username;
    }
    //metodo setter per impostare l email
    setEmail(email) {
        this.email = email;
    }
    //metodo setter per impostare l area geografica
    setAreaGeografica(areaGeografica) {
        this.areaGeografica = areaGeografica;
    }
    //metodo setter per impostare le aste partecipate
    setAstePartecipate(astePartecipate) {
        this.astePartecipate.forEach((asta) => {
            if (!this.astePartecipate.includes(asta)) {
                this.astePartecipate.push(asta);
            }
        });
    }
    //metodo setter per impostare le aste partecipate
    setRuolo(ruoli) {
        ruoli.forEach((ruolo) => {
            if (!this.ruolo.includes(ruolo)) {
                this.ruolo.push(ruolo);
            }
        });
    }
    //metodo setter per impostare il flag di remember
    setRemember(remember) {
        this.remember = remember;
    }
    getIdUser() {
        return this.idUser;
    }
    setIdUser(idUser) {
        this.idUser = idUser;
    }
    getRuolo() {
        return this.ruolo;
    }
    getNome() {
        return this.nome;
    }
    getCognome() {
        return this.cognome;
    }
    getUsername() {
        return this.username;
    }
    getEmail() {
        return this.email;
    }
    getAreaGeografica() {
        return this.areaGeografica;
    }
    getAstePartecipate() {
        return this.astePartecipate;
    }
    getRemember() {
        return this.remember;
    }
}


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _componenti_login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./componenti/login/login.component */ "JwZQ");
/* harmony import */ var _componenti_registrazione_registrazione_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./componenti/registrazione/registrazione.component */ "SnxG");
/* harmony import */ var _componenti_passworddimenticata_passworddimenticata_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./componenti/passworddimenticata/passworddimenticata.component */ "owD/");
/* harmony import */ var _componenti_modificapassword_modificapassword_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./componenti/modificapassword/modificapassword.component */ "Gfvb");
/* harmony import */ var _componenti_homepagemoderatore_homepagemoderatore_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./componenti/homepagemoderatore/homepagemoderatore.component */ "SzPC");
/* harmony import */ var _componenti_homepagestudente_homepagestudente_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./componenti/homepagestudente/homepagestudente.component */ "opZ3");
/* harmony import */ var _componenti_homepagenonloggato_homepagenonloggato_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./componenti/homepagenonloggato/homepagenonloggato.component */ "02sP");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./servizi/persona.service */ "DYeW");
/* harmony import */ var _servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./servizi/libro.service */ "ZedN");
/* harmony import */ var _servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./servizi/messaggio.service */ "bC/5");
/* harmony import */ var _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./servizi/inserzione.service */ "NSdY");
/* harmony import */ var _servizi_socketio_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./servizi/socketio.service */ "uzJu");
/* harmony import */ var _servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./servizi/statistiche.service */ "88No");




















let AppModule = /** @class */ (() => {
    class AppModule {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
            { provide: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"], useClass: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"] },
            { provide: _servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"], useClass: _servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"] },
            { provide: _servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_15__["MessaggioService"], useClass: _servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_15__["MessaggioService"] },
            { provide: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_16__["InserzioneService"], useClass: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_16__["InserzioneService"] },
            { provide: _servizi_socketio_service__WEBPACK_IMPORTED_MODULE_17__["SocketioService"], useClass: _servizi_socketio_service__WEBPACK_IMPORTED_MODULE_17__["SocketioService"] },
            { provide: _servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_18__["StatisticheService"], useClass: _servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_18__["StatisticheService"] }
        ], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
            ]] });
    return AppModule;
})();

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
        _componenti_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
        _componenti_registrazione_registrazione_component__WEBPACK_IMPORTED_MODULE_7__["RegistrazioneComponent"],
        _componenti_passworddimenticata_passworddimenticata_component__WEBPACK_IMPORTED_MODULE_8__["PassworddimenticataComponent"],
        _componenti_modificapassword_modificapassword_component__WEBPACK_IMPORTED_MODULE_9__["ModificapasswordComponent"],
        _componenti_homepagemoderatore_homepagemoderatore_component__WEBPACK_IMPORTED_MODULE_10__["HomepagemoderatoreComponent"],
        _componenti_homepagestudente_homepagestudente_component__WEBPACK_IMPORTED_MODULE_11__["HomepagestudenteComponent"],
        _componenti_homepagenonloggato_homepagenonloggato_component__WEBPACK_IMPORTED_MODULE_12__["HomepagenonloggatoComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                    _componenti_login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"],
                    _componenti_registrazione_registrazione_component__WEBPACK_IMPORTED_MODULE_7__["RegistrazioneComponent"],
                    _componenti_passworddimenticata_passworddimenticata_component__WEBPACK_IMPORTED_MODULE_8__["PassworddimenticataComponent"],
                    _componenti_modificapassword_modificapassword_component__WEBPACK_IMPORTED_MODULE_9__["ModificapasswordComponent"],
                    _componenti_homepagemoderatore_homepagemoderatore_component__WEBPACK_IMPORTED_MODULE_10__["HomepagemoderatoreComponent"],
                    _componenti_homepagestudente_homepagestudente_component__WEBPACK_IMPORTED_MODULE_11__["HomepagestudenteComponent"],
                    _componenti_homepagenonloggato_homepagenonloggato_component__WEBPACK_IMPORTED_MODULE_12__["HomepagenonloggatoComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"]
                ],
                providers: [
                    { provide: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"], useClass: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_13__["PersonaService"] },
                    { provide: _servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"], useClass: _servizi_libro_service__WEBPACK_IMPORTED_MODULE_14__["LibroService"] },
                    { provide: _servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_15__["MessaggioService"], useClass: _servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_15__["MessaggioService"] },
                    { provide: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_16__["InserzioneService"], useClass: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_16__["InserzioneService"] },
                    { provide: _servizi_socketio_service__WEBPACK_IMPORTED_MODULE_17__["SocketioService"], useClass: _servizi_socketio_service__WEBPACK_IMPORTED_MODULE_17__["SocketioService"] },
                    { provide: _servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_18__["StatisticheService"], useClass: _servizi_statistiche_service__WEBPACK_IMPORTED_MODULE_18__["StatisticheService"] }
                ],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "ZedN":
/*!******************************************!*\
  !*** ./src/app/servizi/libro.service.ts ***!
  \******************************************/
/*! exports provided: LibroService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibroService", function() { return LibroService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _persona_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./persona.service */ "DYeW");






let LibroService = /** @class */ (() => {
    class LibroService {
        constructor(http, us) {
            this.http = http;
            this.us = us;
            //variabile per memorizzare l url del server
            this.url = "http://localhost:8080";
        }
        //funzione per ottenere l id del libro piu alto e quindi l ultimo aggiunto
        getUltimoLibroInserito() {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.get(this.url + "/libri", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per modificare i dati del libro
        modificaLibro(libro) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.patch(this.url + "/libri", libro, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per ottenere il libro dall id per vedere i dettagli nel popup dell inserzione
        getLibroById(idLibro) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idLibro", idLibro.toString())
            };
            return this.http.get(this.url + "/libri", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per eliminare il libro collegato ad un inserzione
        eliminaLibro(idLibro) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]().append("idLibro", idLibro.toString())
            };
            return this.http.delete(this.url + "/libri", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione che inserisce un libro
        inserisciLibro(libroDaInserire) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.put(this.url + "/libri", libroDaInserire, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
    }
    LibroService.ɵfac = function LibroService_Factory(t) { return new (t || LibroService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"])); };
    LibroService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: LibroService, factory: LibroService.ɵfac, providedIn: 'root' });
    return LibroService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LibroService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"] }]; }, null); })();


/***/ }),

/***/ "ZkY6":
/*!**********************************!*\
  !*** ./src/app/classi/errore.ts ***!
  \**********************************/
/*! exports provided: Errore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Errore", function() { return Errore; });
class Errore {
    //inizializzzazione errore
    constructor(errore) {
        if (errore) {
            if (errore.statusCode)
                this.setStatusCode(errore.statusCode);
            if (errore.endpoint)
                this.setEndpoint(errore.endpoint);
            if (errore.method)
                this.setMethod(errore.method);
            if (errore.error)
                this.setError(errore.error);
            if (errore.message)
                this.setMessage(errore.message);
            if (errore.reason)
                this.setReason(errore.reason);
        }
    }
    //metodo setter per impostare statusCode
    setStatusCode(statusCode) {
        this.statusCode = statusCode;
    }
    //metodo setter per impostare endpoint
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
    }
    //metodo setter per impostare method
    setMethod(method) {
        this.method = method;
    }
    //metodo setter per impostare error
    setError(error) {
        this.error = error;
    }
    //metodo setter per impostare message
    setMessage(message) {
        this.message = message;
    }
    //metodo getter per return message
    getMessage() {
        return this.message;
    }
    //metodo setter per impostare reason
    setReason(reason) {
        this.reason = reason;
    }
    //metodo getter per return reason
    getReason() {
        if (this.reason) {
            console.log(this.reason);
            var json = JSON.parse(this.reason);
            console.log(json);
            return JSON.stringify(json.error.message);
        }
        else
            return "";
    }
}


/***/ }),

/***/ "aOD8":
/*!*************************************!*\
  !*** ./src/app/classi/messaggio.ts ***!
  \*************************************/
/*! exports provided: Messaggio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messaggio", function() { return Messaggio; });
//classe per la gestione del messaggio
class Messaggio {
    constructor(messaggio) {
        if (messaggio) {
            if (messaggio.idMessaggio)
                this.setIdMessaggio(messaggio.idMessaggio);
            if (messaggio.messaggioRiferimento)
                this.setMessaggioRiferimento(messaggio.messaggioRiferimento);
            if (messaggio.oggetto)
                this.setOggetto(messaggio.oggetto);
            if (messaggio.contenuto)
                this.setContenuto(messaggio.contenuto);
            if (messaggio.data)
                this.setData(messaggio.data);
            this.setIdInserzione(messaggio.idInserzione);
            this.setMittente(messaggio.mittente);
            this.setDestinatario(messaggio.destinatario);
        }
    }
    getIdMessaggio() {
        return this.idMessaggio;
    }
    setIdMessaggio(idMessaggio) {
        this.idMessaggio = idMessaggio;
    }
    getIdInserzione() {
        return this.idInserzione;
    }
    setIdInserzione(idInserzione) {
        this.idInserzione = idInserzione;
    }
    getMessaggioRiferimento() {
        return this.messaggioRiferimento;
    }
    setMessaggioRiferimento(messaggioRiferimento) {
        this.messaggioRiferimento = messaggioRiferimento;
    }
    getOggetto() {
        return this.oggetto;
    }
    setOggetto(oggetto) {
        this.oggetto = oggetto;
    }
    getContenuto() {
        return this.contenuto;
    }
    setContenuto(contenuto) {
        this.contenuto = contenuto;
    }
    getData() {
        return this.data;
    }
    getDataFormatoStringa() {
        return new Date(this.data).toLocaleDateString("en-GB");
    }
    getOraFormatoStringa() {
        return new Date(this.data).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
    }
    setData(data) {
        this.data = data;
    }
    getMittente() {
        return this.mittente;
    }
    setMittente(mittente) {
        this.mittente = mittente;
    }
    getDestinatario() {
        return this.destinatario;
    }
    setDestinatario(destinatario) {
        this.destinatario = destinatario;
    }
}


/***/ }),

/***/ "bC/5":
/*!**********************************************!*\
  !*** ./src/app/servizi/messaggio.service.ts ***!
  \**********************************************/
/*! exports provided: MessaggioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessaggioService", function() { return MessaggioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../servizi/persona.service */ "DYeW");






let MessaggioService = /** @class */ (() => {
    class MessaggioService {
        constructor(http, us) {
            this.http = http;
            this.us = us;
            //variabile per memorizzare l url del server
            this.url = "http://localhost:8080";
        }
        //funzione per estrarre la lista di messaggi dato un mittente e un destinatario
        getListaMessaggi(mittente, destinatario, inserzione) {
            //creo la lista dei parametri da passare nella richiesta http
            var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
            //aggiungo i parametri dinamicamente solo se richiesti
            if (mittente)
                params = params.append("mittente", mittente.toString());
            if (destinatario != null)
                params = params.append("destinatario", destinatario.toString());
            if (inserzione)
                params = params.append("idInserzione", inserzione.toString());
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params
            };
            return this.http.get(this.url + "/messaggi", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per eliminare dei messaggi sfruttando diversi parametri
        eliminaMessaggi(idMessaggio, idInserzione, idUtente) {
            //creo la lista dei parametri da passare nella richiesta http
            var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpParams"]();
            //aggiungo i parametri dinamicamente solo se richiesti
            if (idMessaggio)
                params = params.append("idMessaggio", idMessaggio.toString());
            if (idInserzione)
                params = params.append("idInserzione", idInserzione.toString());
            if (idUtente)
                params = params.append("idUtente", idUtente.toString());
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                }),
                params
            };
            return this.http.delete(this.url + "/messaggi", options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
        //funzione per inviare un messaggio
        inviaMessaggio(messaggio) {
            const options = {
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                    "authorization": "Bearer " + this.us.getToken(),
                    "cache-control": "no-cache",
                    "Content-Type": "application/json"
                })
            };
            return this.http.put(this.url + "/messaggi", messaggio, options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((data) => {
            }));
        }
    }
    MessaggioService.ɵfac = function MessaggioService_Factory(t) { return new (t || MessaggioService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"])); };
    MessaggioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessaggioService, factory: MessaggioService.ɵfac, providedIn: 'root' });
    return MessaggioService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessaggioService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"] }]; }, null); })();


/***/ }),

/***/ "dVQE":
/*!*************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneFiltro.ts ***!
  \*************************************************************************/
/*! exports provided: verificaFiltro, annullaFiltro, filtraInserzioni */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verificaFiltro", function() { return verificaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annullaFiltro", function() { return annullaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtraInserzioni", function() { return filtraInserzioni; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");

//funzione per vedere se il filtro e attivato o disattivato
function verificaFiltro() {
    //se l oggetto e vuoto restituisco vero
    if (this.filtraggioInserzioni.nomeLibro === "" && this.filtraggioInserzioni.corsoDiStudi === "" && this.filtraggioInserzioni.areaGeografica === "" && this.filtraggioInserzioni.universita === "" && this.filtraggioInserzioni.venditore === "" && this.filtraggioInserzioni.prezzoAttualeMinimo === "" && this.filtraggioInserzioni.prezzoAttualeMassimo === "") {
        return true;
    }
    //se l oggetto non e vuoto restituisco falso
    return false;
}
//funzione per annullare il filtro
function annullaFiltro() {
    //azzero l oggetto per il filtraggio
    this.filtraggioInserzioni.nomeLibro = "";
    this.filtraggioInserzioni.corsoDiStudi = "";
    this.filtraggioInserzioni.universita = "";
    this.filtraggioInserzioni.areaGeografica = "";
    this.filtraggioInserzioni.venditore = "";
    this.filtraggioInserzioni.prezzoAttualeMinimo = "";
    this.filtraggioInserzioni.prezzoAttualeMassimo = "";
    //recupero la lista di inserzioni in vendita
    this.getListaInserzioniInVendita();
}
//funzione per filtrare le inserzioni in vendita
function filtraInserzioni() {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //richiamo il service per ottenere la lista di inserzioni filtrate
    this.is.filtraInserzioni(this.filtraggioInserzioni).subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale non e stata creata dall utente attuale
            if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser()) {
                //verifico inoltre che l utente non abbia gia fatto una proposta perche altrimenti viene fuori nella sezione proposte
                if (data.inserzioni[i].utentePrezzoAttuale !== this.utenteLoggato.getIdUser()) {
                    //se non e ancora scaduta
                    if (!((new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i])).isScaduta())) {
                        //inserisco l inserzione nella lista giusta
                        this.inserzioniInVendita.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                        //inserisco il libro in vendita nella lista relativa
                        this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                            this.libriInVendita.push(data1.libri[0]);
                        }, (err) => {
                            //errore estrazione libro dell inserzione in filtraggio
                            this.dettagliErrore.setMessage("Errore estrazione libro del filtraggio inserzioni");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore estrazione libro del filtraggio inserzioni " + JSON.stringify(err));
                        });
                    }
                }
            }
        }
    }, (err) => {
        //errore filtraggio inserzioni
        this.dettagliErrore.setMessage("Errore filtraggio inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore filtraggio inserzioni " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "daP/":
/*!*************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneSocket.ts ***!
  \*************************************************************************/
/*! exports provided: configurazioneSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configurazioneSocket", function() { return configurazioneSocket; });
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");


//configurazione socket
function configurazioneSocket() {
    //dopo la connessione metto in attesa di ricezione di nuovi messaggi
    this.ss.connect().subscribe((m) => {
        //salvo il messaggio appena arrivato
        this.messaggioAppenaArrivato = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](m).getContenuto();
        //memorizzo temporaneamente il messaggio per analizzarlo
        var messTemp = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](m);
        //casi che non serve cambiare liste messaggi
        if ((messTemp.getDestinatario() !== 0 || (messTemp.getDestinatario() === 0 && this.inserzione && this.inserzione.getIdInserzione() !== messTemp.getIdInserzione())) && messTemp.getDestinatario() !== this.utenteLoggato.getIdUser() && messTemp.getMittente() !== this.utenteLoggato.getIdUser()) {
        }
        //altrimenti puo interessarmi o con una notifica o con un aggiornamento delle liste dei messaggi
        else {
            //aggiorno la lista delle persone nelle chat
            this.getListaUtentiChat();
            //solo la notifica se non ho aperto nessuna tipologia di chat
            if (!this.chatSingolaPersona && !this.chatPrivataInserzione && !this.chatPubblicaInserzione && messTemp.getDestinatario() === this.utenteLoggato.getIdUser()) {
                //ottengo i dati dell utente che ha mandato il messaggio all utente loggato
                this.us.getUtenteById(new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_0__["Messaggio"](m).getMittente()).subscribe((data) => {
                    this.utenteMessaggioAppenaArrvato = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getNome() + " " + new src_app_classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"](data.utenti[0]).getCognome();
                }, (err) => {
                    //errore estrazione dati dell utente loggato
                    this.dettagliErrore.setMessage("Errore estrazione dati mittente messaggio");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione dati mittente messaggio " + JSON.stringify(err));
                });
            }
            //se sono dentro ad ua particolare chat
            else {
                //se sono nella chat con una singola persona
                if (this.chatSingolaPersona) {
                    this.getListaMessaggiPersona(this.idPersonaChatAttuale);
                }
                //se sono sulla chat privata di una inserzione
                else if (this.chatPrivataInserzione) {
                    this.getListaMessaggiInserzioneChatPrivata();
                }
                //se sono sulla chat pubblica di una inserzione
                else if (this.chatPubblicaInserzione) {
                    this.getListaMessaggiInserzioneChatPubblica();
                }
            }
        }
    });
}


/***/ }),

/***/ "eZGc":
/*!**************************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneSelezioneInserzioni.ts ***!
  \**************************************************************************************/
/*! exports provided: setInserzioneVintaSelezionata, setInserzionePartecipataSelezionata, setInserzioneCreataSelezionata, setInserzioneInVenditaSelezionata, setInserzioneVendutaSelezionata */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneVintaSelezionata", function() { return setInserzioneVintaSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzionePartecipataSelezionata", function() { return setInserzionePartecipataSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneCreataSelezionata", function() { return setInserzioneCreataSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneInVenditaSelezionata", function() { return setInserzioneInVenditaSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneVendutaSelezionata", function() { return setInserzioneVendutaSelezionata; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");



//funzione per settare l inserzione vinta che l utente ha selezionato dall elenco
function setInserzioneVintaSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniVinte.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniVinte[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniVinte[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per settare l inserzione partecipata dall elenco
function setInserzionePartecipataSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniPartecipate.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniPartecipate[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniPartecipate[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per settare l inserzione creata che l utente ha selezionato dall elenco
function setInserzioneCreataSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniCreate.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniCreate[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniCreate[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che ha fatto l ultima offerta
                this.us.getUtenteById(this.inserzione.getUtentePrezzoAttuale()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha fatto l ultima offerta
                    this.dettagliErrore.setMessage("Errore estrazione utente ultima offerta ");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente ultima offerta " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
function setInserzioneInVenditaSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniInVendita.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniInVendita[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniInVendita[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per settare l inserzione venduta che l utente loggato ha premuto per visualizzare i dettagli
function setInserzioneVendutaSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniVendute.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniVendute[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniVendute[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}


/***/ }),

/***/ "fqJ5":
/*!***************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneFiltro.ts ***!
  \***************************************************************************/
/*! exports provided: verificaFiltro, annullaFiltro, filtraInserzioni */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verificaFiltro", function() { return verificaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annullaFiltro", function() { return annullaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtraInserzioni", function() { return filtraInserzioni; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");

//funzione per vedere se il filtro e attivato o disattivato
function verificaFiltro() {
    //se l oggetto e vuoto restituisco vero
    if (this.filtraggioInserzioni.nomeLibro === "" && this.filtraggioInserzioni.corsoDiStudi === "" && this.filtraggioInserzioni.areaGeografica === "" && this.filtraggioInserzioni.universita === "" && this.filtraggioInserzioni.venditore === "" && this.filtraggioInserzioni.prezzoAttualeMinimo === "" && this.filtraggioInserzioni.prezzoAttualeMassimo === "") {
        return true;
    }
    //se l oggetto non e vuoto restituisco falso
    return false;
}
//funzione per annullare il filtro
function annullaFiltro() {
    //azzero l oggetto per il filtraggio
    this.filtraggioInserzioni.nomeLibro = "";
    this.filtraggioInserzioni.corsoDiStudi = "";
    this.filtraggioInserzioni.universita = "";
    this.filtraggioInserzioni.areaGeografica = "";
    this.filtraggioInserzioni.venditore = "";
    this.filtraggioInserzioni.prezzoAttualeMinimo = "";
    this.filtraggioInserzioni.prezzoAttualeMassimo = "";
}
//funzione per filtrare le inserzioni in vendita
function filtraInserzioni() {
    //resetto la lista delle varie inserzioni
    this.inserzioni = [];
    //resetto la lista dei vari libri
    this.libri = [];
    //richiamo il service per ottenere la lista di inserzioni filtrate
    this.is.filtraInserzioni(this.filtraggioInserzioni).subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //inserisco l inserzione nella lista giusta
            this.inserzioni.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
            //inserisco il libro in vendita nella lista relativa
            this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                this.libri.push(data1.libri[0]);
            }, (err) => {
                //errore estrazione libro dall id
                this.dettagliErrore.setMessage("Errore estrazione libro dall id");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dall id " + JSON.stringify(err));
            });
        }
    }, (err) => {
        //errore filtraggio inserzioni
        this.dettagliErrore.setMessage("Errore filtraggio inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore filtraggio inserzioni " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "i+Sd":
/*!**************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneToken.ts ***!
  \**************************************************************************/
/*! exports provided: recuperaDatiUtenteToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recuperaDatiUtenteToken", function() { return recuperaDatiUtenteToken; });
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");

//funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
function recuperaDatiUtenteToken() {
    //recupero dallo storage il token
    this.us.setToken();
    //recupero il token e controllo che se e vuoto effettuo il redirect
    if (this.us.getToken() === "") {
        this.router.navigate(["/login"]);
    }
    //altrimenti se non e vuoto
    else {
        //decodifico il token in stringa
        var tokenstring = atob(this.us.getToken().split('.')[1]);
        //creo un utente temporaneo con i dati del token
        let utenteTemp = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__["Utente"](JSON.parse(tokenstring));
        //verifico che l utente loggato sia effettivamente un moderatore
        if (utenteTemp.isModeratore()) {
            //assegno i dati del token
            this.us.setPrametriToken(tokenstring);
            //recupero tutti i dati
            this.aggiornaDati();
        }
        //se non e un moderatore
        else {
            this.us.logout();
            this.router.navigate(["/login"]);
        }
    }
}


/***/ }),

/***/ "jBtU":
/*!********************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/functions/utility.ts ***!
  \********************************************************************/
/*! exports provided: isUtentePresente */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUtentePresente", function() { return isUtentePresente; });
//funzione per verificare se un utente e gia dentro alla lista
function isUtentePresente(idUtente, lista) {
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


/***/ }),

/***/ "lB4H":
/*!********************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneStatistiche.ts ***!
  \********************************************************************************/
/*! exports provided: getStatistiche */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatistiche", function() { return getStatistiche; });
//funzione per estrarre le statistiche
function getStatistiche() {
    //estraggo le statistiche
    this.ss.getStatistiche().subscribe((data) => {
        //memorizzo il numero di aste attive
        this.statistiche.push(data.inserzioniAttive.length);
        //memorizzo il numero di aste senza il raggiungimento del prezzo di riserva
        this.statistiche.push(data.inserzioniNonRaggiungimentoRiserva.length);
        //memorizzo il numero di aste con il raggiungimento del prezzo di riserva
        this.statistiche.push(data.inserzioniRaggiungimentoRiserva.length);
    }, (err) => {
        //errore estrazione statistiche
        this.dettagliErrore.setMessage("Errore estrazione statistiche");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione statistiche " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "lCax":
/*!***************************************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/functions/gestioneLoginRegistrazione.ts ***!
  \***************************************************************************************/
/*! exports provided: effettuaLogin, effettuaRegistrazione */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "effettuaLogin", function() { return effettuaLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "effettuaRegistrazione", function() { return effettuaRegistrazione; });
//funzione per il reindirizzamento nella pagina del login
function effettuaLogin() {
    //vado nella pagina del login
    this.router.navigate(["/login"]);
}
//funzione per il reindirizzamento nella pagina della registrazione
function effettuaRegistrazione() {
    //vado nella pagina del login
    this.router.navigate(["/registrazione"]);
}


/***/ }),

/***/ "mPTG":
/*!*************************************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/functions/gestioneFiltroInserzioni.ts ***!
  \*************************************************************************************/
/*! exports provided: verificaFiltro, annullaFiltro, recuperaDatiAggiornati, filtraInserzioni */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verificaFiltro", function() { return verificaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annullaFiltro", function() { return annullaFiltro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recuperaDatiAggiornati", function() { return recuperaDatiAggiornati; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filtraInserzioni", function() { return filtraInserzioni; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");

//funzione per vedere se il filtro e attivato o disattivato
function verificaFiltro() {
    //se l oggetto e vuoto restituisco vero
    if (this.filtraggioInserzioni.nomeLibro === "" && this.filtraggioInserzioni.corsoDiStudi === "" && this.filtraggioInserzioni.areaGeografica === "" && this.filtraggioInserzioni.universita === "" && this.filtraggioInserzioni.venditore === "" && this.filtraggioInserzioni.prezzoAttualeMinimo === "" && this.filtraggioInserzioni.prezzoAttualeMassimo === "") {
        return true;
    }
    //se l oggetto non e vuoto restituisco falso
    return false;
}
//funzione per annullare il filtro
function annullaFiltro() {
    //azzero l oggetto per il filtraggio
    this.filtraggioInserzioni.nomeLibro = "";
    this.filtraggioInserzioni.corsoDiStudi = "";
    this.filtraggioInserzioni.universita = "";
    this.filtraggioInserzioni.areaGeografica = "";
    this.filtraggioInserzioni.venditore = "";
    this.filtraggioInserzioni.prezzoAttualeMinimo = "";
    this.filtraggioInserzioni.prezzoAttualeMassimo = "";
    //estraggo la lista di tutte le inserzioni in vendita
    this.getListaInserzioniInVendita();
}
//funzione per aggiornare i dati
function recuperaDatiAggiornati() {
    //azzero eventali variabili
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
    //ottengo la lista delle inserzioni in vendita
    this.getListaInserzioniInVendita();
}
//funzione per filtrare le inserzioni in vendita
function filtraInserzioni() {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //richiamo il service per ottenere la lista di inserzioni filtrate
    this.is.filtraInserzioni(this.filtraggioInserzioni).subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //verifico che l inserzione non sia gia scaduta
            if (!((new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i])).isScaduta())) {
                //inserisco l inserzione nella lista giusta
                this.inserzioniInVendita.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro in vendita nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriInVendita.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione in filtraggio
                    this.dettagliErrore.setMessage("Errore estrazione libro del filtraggio inserzioni");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro del filtraggio inserzioni " + JSON.stringify(err));
                });
            }
        }
    }, (err) => {
        //errore filtraggio inserzioni in vendita
        this.dettagliErrore.setMessage("Errore filtraggio inserzioni in vendita");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore filtraggio inserzioni in vendita " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "nWx4":
/*!*******************************************************************************!*\
  !*** ./src/app/componenti/homepagenonloggato/functions/gestioneInserzioni.ts ***!
  \*******************************************************************************/
/*! exports provided: setInserzioneInVenditaSelezionata, getListaInserzioniInVendita */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInserzioneInVenditaSelezionata", function() { return setInserzioneInVenditaSelezionata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioniInVendita", function() { return getListaInserzioniInVendita; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");
/* harmony import */ var src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");



//funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
function setInserzioneInVenditaSelezionata(idInserzione) {
    //dato che l id dell inserzione sono incrementali pero non per forza partono da 1 in quanto pescano sempre l id successivo anche se ci sono state eliminazioni, devo per forza scorrere e selezionare quella giusta
    for (let i = 0; i < this.inserzioniInVendita.length; ++i) {
        //verifico che l id corrisponda a quella che l utente ha selezionato per aprire il popup
        if (this.inserzioniInVendita[i].idInserzione === idInserzione) {
            this.inserzione = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](this.inserzioniInVendita[i]);
            //aggiorno le due date evitando formati diversi che mi danno eventuali errori
            this.inserzione.setDataInizio(String(new Date(this.inserzione.dataInizio).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataInizio).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataInizio).getDate()).padStart(2, "0"));
            this.inserzione.setDataFine(String(new Date(this.inserzione.dataFine).getFullYear()).padStart(4, "0") + "-" + String(new Date(this.inserzione.dataFine).getMonth() + 1).padStart(2, "0") + "-" + String(new Date(this.inserzione.dataFine).getDate()).padStart(2, "0"));
            //quando ho trovato l inserzione selezionata corretta devo estrarre i dati del libro a cui si riferisce
            this.ls.getLibroById(this.inserzione.getLibro()).subscribe((data) => {
                //mi salvo i dati del libro
                this.libro = new src_app_classi_Libro__WEBPACK_IMPORTED_MODULE_1__["Libro"](data.libri[0]);
                //devo estrarmi anche i dati dell utente che la ha creata
                this.us.getUtenteById(this.inserzione.getUtente()).subscribe((data) => {
                    //mi salvo i dati dell utente che la ha creata
                    this.utente = new src_app_classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"](data.utenti[0]);
                }, (err) => {
                    //errore estrazione utente che ha creato l inserzione
                    this.dettagliErrore.setMessage("Errore estrazione utente che ha creato l' inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione utente che ha creato l' inserzione " + JSON.stringify(err));
                });
            }, (err) => {
                //errore estrazione libro dell inserzione
                this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
            });
        }
    }
}
//funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
function getListaInserzioniInVendita() {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //ottengo la lista delle inserzioni in vendita
    this.is.getListaInserzioniInVendita().subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se non e ancora scaduta
            if (!((new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i])).isScaduta())) {
                //inserisco l inserzione nella lista giusta
                this.inserzioniInVendita.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro in vendita nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriInVendita.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
        }
    }, (err) => {
        //errore estrazione inserzioni in vendita
        this.dettagliErrore.setMessage("Errore estrazione inserzioni in vendita");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni in vendita " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "opZ3":
/*!***************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/homepagestudente.component.ts ***!
  \***************************************************************************/
/*! exports provided: HomepagestudenteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepagestudenteComponent", function() { return HomepagestudenteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_offerta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/offerta */ "M2Ar");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _classi_inserzione__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../classi/inserzione */ "PZox");
/* harmony import */ var _classi_Libro__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classi/Libro */ "wlj1");
/* harmony import */ var src_app_classi_errore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/classi/errore */ "ZkY6");
/* harmony import */ var src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/classi/messaggio */ "aOD8");
/* harmony import */ var _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions/gestioneFiltro */ "dVQE");
/* harmony import */ var _functions_gestioneInvioMessaggio__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./functions/gestioneInvioMessaggio */ "qhXO");
/* harmony import */ var _functions_gestioneLayoutChat__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./functions/gestioneLayoutChat */ "rBy0");
/* harmony import */ var _functions_gestioneListaStudentiChattato__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./functions/gestioneListaStudentiChattato */ "JjdW");
/* harmony import */ var _functions_gestioneLogout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./functions/gestioneLogout */ "UX8w");
/* harmony import */ var _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./functions/gestioneSelezioneInserzioni */ "eZGc");
/* harmony import */ var _functions_gestioneSocket__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./functions/gestioneSocket */ "daP/");
/* harmony import */ var _functions_gestioneTipologiaChatSelezionata__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./functions/gestioneTipologiaChatSelezionata */ "OXFA");
/* harmony import */ var _functions_gestioneTipologieChat__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./functions/gestioneTipologieChat */ "/jjs");
/* harmony import */ var _functions_gestioneToken__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./functions/gestioneToken */ "TAZU");
/* harmony import */ var _functions_inizializzazione__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./functions/inizializzazione */ "S9Lb");
/* harmony import */ var _functions_gestioneInserzione__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./functions/gestioneInserzione */ "Itdg");
/* harmony import */ var _functions_nuovaOffertaInserzione__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./functions/nuovaOffertaInserzione */ "03fR");
/* harmony import */ var _functions_utility__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./functions/utility */ "LX5T");
/* harmony import */ var _functions_getInserzioniPerTipologia__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./functions/getInserzioniPerTipologia */ "orlk");
/* harmony import */ var src_app_servizi_socketio_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/servizi/socketio.service */ "uzJu");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../servizi/inserzione.service */ "NSdY");
/* harmony import */ var src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/servizi/libro.service */ "ZedN");
/* harmony import */ var src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/servizi/messaggio.service */ "bC/5");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/forms */ "3Pt+");































function HomepagestudenteComponent_li_17_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_17_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r47); const i_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r45.setInserzioneCreataSelezionata(i_r43.idInserzione); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r41.nome, "");
} }
function HomepagestudenteComponent_li_17_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_17_span_1_span_1_Template, 5, 1, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r43 = ctx.$implicit;
    const l_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r43.libro == l_r41.idLibro);
} }
function HomepagestudenteComponent_li_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_17_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.inserzioniCreate);
} }
function HomepagestudenteComponent_li_23_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_23_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56); const i_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r54.setInserzioneInVenditaSelezionata(i_r52.getIdInserzione()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r50.nome, "");
} }
function HomepagestudenteComponent_li_23_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_23_span_1_span_1_Template, 5, 1, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r52 = ctx.$implicit;
    const l_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r52.libro == l_r50.idLibro);
} }
function HomepagestudenteComponent_li_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_23_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.inserzioniInVendita);
} }
function HomepagestudenteComponent_button_25_Template(rf, ctx) { if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_button_25_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60); const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r59.filtraInserzioni(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Filtra");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagestudenteComponent_button_26_Template(rf, ctx) { if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_button_26_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r62); const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r61.annullaFiltro(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Annulla filtro");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagestudenteComponent_li_32_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const l_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro ", l_r63.nome, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0\u00A0\u00A0\u00A0\u00A0", i_r65.getPrezzoAttuale(), "\u20AC\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0");
} }
function HomepagestudenteComponent_li_32_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_32_span_1_span_1_Template, 5, 2, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r65 = ctx.$implicit;
    const l_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r65.libro == l_r63.idLibro);
} }
function HomepagestudenteComponent_li_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_32_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.inserzioniOfferteFatte);
} }
function HomepagestudenteComponent_li_38_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r76 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_38_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r76); const i_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r74.setInserzioneVintaSelezionata(i_r72.idInserzione); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r70.nome, "");
} }
function HomepagestudenteComponent_li_38_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_38_span_1_span_1_Template, 5, 1, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r72 = ctx.$implicit;
    const l_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r72.libro == l_r70.idLibro);
} }
function HomepagestudenteComponent_li_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_38_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r5.inserzioniVinte);
} }
function HomepagestudenteComponent_li_44_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r85 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_44_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r85); const i_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r83.setInserzionePartecipataSelezionata(i_r81.idInserzione); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r79.nome, "");
} }
function HomepagestudenteComponent_li_44_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_44_span_1_span_1_Template, 5, 1, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r81 = ctx.$implicit;
    const l_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r81.libro == l_r79.idLibro);
} }
function HomepagestudenteComponent_li_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_44_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r6.inserzioniPartecipate);
} }
function HomepagestudenteComponent_li_50_span_1_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 124);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_50_span_1_span_1_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r94); const i_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r92.setInserzioneVendutaSelezionata(i_r90.idInserzione); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Dettagli ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const l_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Libro: ", l_r88.nome, "");
} }
function HomepagestudenteComponent_li_50_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_50_span_1_span_1_Template, 5, 1, "span", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r90 = ctx.$implicit;
    const l_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r90.libro == l_r88.idLibro);
} }
function HomepagestudenteComponent_li_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_li_50_span_1_Template, 2, 1, "span", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r7.inserzioniVendute);
} }
function HomepagestudenteComponent_div_56_Template(rf, ctx) { if (rf & 1) {
    const _r98 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Nuovo messaggio da: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Contenuto: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_div_56_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r98); const ctx_r97 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r97.utenteMessaggioAppenaArrvato = ""; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.utenteMessaggioAppenaArrvato);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r8.messaggioAppenaArrivato, " ");
} }
function HomepagestudenteComponent_li_57_Template(rf, ctx) { if (rf & 1) {
    const _r101 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 116);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 127);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_li_57_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r101); const s_r99 = ctx.$implicit; const ctx_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r100.setChatSingolaPersona(); return ctx_r100.getListaMessaggiPersona(s_r99.getIdUser()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const s_r99 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", s_r99.getNome(), " ", s_r99.getCognome(), "");
} }
function HomepagestudenteComponent_div_83_Template(rf, ctx) { if (rf & 1) {
    const _r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Messaggio: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Reason: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_div_83_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r103); const ctx_r102 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); ctx_r102.dettagliErrore.setMessage(""); return ctx_r102.dettagliErrore.setReason(""); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "\u00D7");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r10.dettagliErrore.getMessage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r10.dettagliErrore.getReason(), " ");
} }
function HomepagestudenteComponent_div_168_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r22.messaggioErrore, " ");
} }
function HomepagestudenteComponent_div_169_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r23.messaggioConferma, " ");
} }
function HomepagestudenteComponent_div_170_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r24.messaggio, " ");
} }
function HomepagestudenteComponent_div_243_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "input", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "input", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "input", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "input", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.inserzione.dataInizio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.inserzione.dataFine);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.inserzione.getPrezzoIniziale());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.inserzione.getPrezzoAttuale());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.inserzione.getPrezzoRiserva());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r32.utente.getUsername());
} }
function HomepagestudenteComponent_button_249_Template(rf, ctx) { if (rf & 1) {
    const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_button_249_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r105); const ctx_r104 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r104.eliminaInserzione(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Elimina");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagestudenteComponent_div_259_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "input", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "input", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "input", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "input", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.nome);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.inserzione.dataInizio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.inserzione.dataFine);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.inserzione.getPrezzoIniziale());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.inserzione.getPrezzoAttuale());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.inserzione.getPrezzoRiserva());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r34.utente.getUsername());
} }
function HomepagestudenteComponent_div_274_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.utente.getUsername());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getNome());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.inserzione.dataInizio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.inserzione.dataFine);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r35.inserzione.getPrezzoAttuale());
} }
function HomepagestudenteComponent_div_293_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r106 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r106.inserzione.prezzoRiserva);
} }
function HomepagestudenteComponent_div_293_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, HomepagestudenteComponent_div_293_div_51_Template, 5, 1, "div", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.utente.getUsername());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getNome());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.inserzione.dataInizio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.inserzione.dataFine);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r36.inserzione && ctx_r36.inserzione.isScaduta());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r36.inserzione.prezzoAttuale);
} }
function HomepagestudenteComponent_div_310_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "input", 151);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r107 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r107.inserzione.prezzoRiserva);
} }
function HomepagestudenteComponent_div_310_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "input", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "input", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 136);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](45, "input", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "input", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](51, HomepagestudenteComponent_div_310_div_51_Template, 5, 1, "div", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](54, "input", 142);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "input", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.utente.getUsername());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getNome());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getCorsoDiStudi());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getUniversita());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getAutore());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getAnnoPubblicazione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getEdizione());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.libro.getIsbn());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.inserzione.dataInizio);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.inserzione.dataFine);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r37.inserzione && ctx_r37.inserzione.isScaduta());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r37.inserzione.prezzoAttuale);
} }
function HomepagestudenteComponent_div_327_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r109.messaggioErrore, " ");
} }
function HomepagestudenteComponent_div_327_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r110 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r110.messaggioConferma, " ");
} }
function HomepagestudenteComponent_div_327_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r111 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r111.messaggio, " ");
} }
function HomepagestudenteComponent_div_327_Template(rf, ctx) { if (rf & 1) {
    const _r113 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "input", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "input", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "input", 156, 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_div_327_Template_input_ngModelChange_10_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r113); const ctx_r112 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r112.nuovaOfferta.nuovaOfferta = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HomepagestudenteComponent_div_327_div_12_Template, 2, 1, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, HomepagestudenteComponent_div_327_div_13_Template, 2, 1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, HomepagestudenteComponent_div_327_div_14_Template, 2, 1, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r38.inserzione.getPrezzoAttuale());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx_r38.nuovaOfferta.nuovaOfferta);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r38.messaggioErrore);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r38.messaggioConferma);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r38.messaggio);
} }
function HomepagestudenteComponent_div_343_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 105);
} }
function HomepagestudenteComponent_div_343_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r121 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r121.getContenutoMessaggioRiferimento(lm_r114).getContenuto(), " ");
} }
function HomepagestudenteComponent_div_343_div_2_br_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
} }
function HomepagestudenteComponent_div_343_div_2_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r123 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate4"](" [", lm_r114.getDataFormatoStringa(), " ", lm_r114.getOraFormatoStringa(), " ", ctx_r123.getPersonaNellaChat(lm_r114.getMittente()).getNome(), "]: ", lm_r114.getContenuto(), " ");
} }
function HomepagestudenteComponent_div_343_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_div_343_div_2_div_1_Template, 2, 1, "div", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HomepagestudenteComponent_div_343_div_2_br_2_Template, 1, 0, "br", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HomepagestudenteComponent_div_343_div_2_div_3_Template, 2, 4, "div", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r116 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r116.getContenutoMessaggioRiferimento(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r116.getContenutoMessaggioRiferimento(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r116.getPersonaNellaChat(lm_r114.getMittente()));
} }
function HomepagestudenteComponent_div_343_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r129 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "img", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_div_343_div_3_Template_img_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r129); const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r127 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r127.setMessaggioRiferimento(lm_r114.getIdMessaggio()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagestudenteComponent_div_343_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r132 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "img", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_div_343_div_4_Template_img_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r132); const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r130 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r130.setMessaggioRiferimento(lm_r114.getIdMessaggio()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function HomepagestudenteComponent_div_343_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    const ctx_r133 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r133.getContenutoMessaggioRiferimento(lm_r114).getContenuto(), " ");
} }
function HomepagestudenteComponent_div_343_div_5_br_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "br");
} }
function HomepagestudenteComponent_div_343_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_div_343_div_5_div_1_Template, 2, 1, "div", 163);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HomepagestudenteComponent_div_343_div_5_br_2_Template, 1, 0, "br", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r119 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r119.getContenutoMessaggioRiferimento(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r119.getContenutoMessaggioRiferimento(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" [", lm_r114.getDataFormatoStringa(), " ", lm_r114.getOraFormatoStringa(), " Io]: ", lm_r114.getContenuto(), " ");
} }
function HomepagestudenteComponent_div_343_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 105);
} }
function HomepagestudenteComponent_div_343_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, HomepagestudenteComponent_div_343_div_1_Template, 1, 0, "div", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HomepagestudenteComponent_div_343_div_2_Template, 4, 3, "div", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HomepagestudenteComponent_div_343_div_3_Template, 3, 0, "div", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HomepagestudenteComponent_div_343_div_4_Template, 3, 0, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, HomepagestudenteComponent_div_343_div_5_Template, 5, 5, "div", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HomepagestudenteComponent_div_343_div_6_Template, 1, 0, "div", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const lm_r114 = ctx.$implicit;
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isDestinatario(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isDestinatario(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isDestinatario(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isMittente(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isMittente(lm_r114));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.isMittente(lm_r114));
} }
let HomepagestudenteComponent = /** @class */ (() => {
    class HomepagestudenteComponent {
        constructor(ss, us, is, ls, ms, router) {
            this.ss = ss;
            this.us = us;
            this.is = is;
            this.ls = ls;
            this.ms = ms;
            this.router = router;
            //variabile per filtrare i dati delle inserzioni
            this.filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };
            //variabile per memorizzare la nuova offerta
            this.nuovaOfferta = new _classi_offerta__WEBPACK_IMPORTED_MODULE_1__["Offerta"]();
            //variabile per accedere allo schema inserzione 
            this.inserzione = new _classi_inserzione__WEBPACK_IMPORTED_MODULE_3__["Inserzione"]();
            //variabile per accedere allo schema del libro
            this.libro = new _classi_Libro__WEBPACK_IMPORTED_MODULE_4__["Libro"]();
            //variabile per accedere allo schema dell utente
            this.utente = new _classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"]();
            //variabile per accedere allo schema dell utente loggato
            this.utenteLoggato = new _classi_user__WEBPACK_IMPORTED_MODULE_2__["Utente"]();
            //variabile per accedere alla lista di inserzioni create
            this.inserzioniCreate = new Array();
            //variabile per accedere alla lista di libri creati
            this.libriCreati = new Array();
            //variabile per accedere alla lista di inserzioni dove l utente attuale ha fatto una proposta che corrisponde a quella attuale
            this.inserzioniOfferteFatte = new Array();
            //variabile per accedere alla lista di libri nelle inserzioni dove ho fatto le offerte
            this.libriOfferte = new Array();
            //variabile per accedere alla lista di inserzioni che l utente ha vinto
            this.inserzioniVinte = new Array();
            //variabile per accedere alla lista di libri nelle inserzioni che ho vinto
            this.libriVinti = new Array();
            //variabile per accedere alla lista di inserzioni in vendita e quindi che non risultano essere nelle due liste precedenti
            this.inserzioniInVendita = new Array();
            //variabile per accedere alla lista di libri nelle inserzioni in vendita
            this.libriInVendita = new Array();
            //variabile per accedere alla lista delle inserzioni partecipate
            this.inserzioniPartecipate = new Array();
            //variabile per accedere alla lista di libri delle inserzioni partecipate
            this.libriPartecipate = new Array();
            //variabile per accedere alla lista delle inserzioni vendute
            this.inserzioniVendute = new Array();
            //variabile per accedere alla lista di libri delle inserzioni vendute
            this.libriVenduti = new Array();
            //variabile per memorizzare la lista di studenti che l utente loggato ha chattato insieme
            this.studentiConChat = new Array();
            //variabile per memorizzare i messaggi
            this.listaMessaggi = new Array();
            //variabile per memorizzare il nome e cognome del destinatario della chat selezionata
            this.destinatarioMessaggiChatSelezionata = "";
            //varibaile per accedere all id del destinatario del messaggio
            this.idUtenteDestinazione = 0;
            //variabile per memorizzare la lista di persone quando estraggo tutti i messaggi rispetto ad una certa categoria privata pubblica persona ecc
            this.listaPersoneMessaggi = new Array();
            //variabile per memorizzare il messaggio d riferimento prima di inviarlo
            this.messaggioRiferimento = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_6__["Messaggio"]();
            //variabile per memorizzare il messaggio da inviare
            this.messaggioDaInviare = new src_app_classi_messaggio__WEBPACK_IMPORTED_MODULE_6__["Messaggio"]();
            //messaggi che possono comparire durante l uso del form di login
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
            //variabile per memorizzare il messaggio appena arrivato tramite il socket
            this.messaggioAppenaArrivato = "";
            //variabile per memorizzare l utente del nuovo messaggio
            this.utenteMessaggioAppenaArrvato = "";
            //variabile per la gestione degli errori
            this.dettagliErrore = new src_app_classi_errore__WEBPACK_IMPORTED_MODULE_5__["Errore"]();
            //-----------------------------------------GESTIONE TOKEN--------------------------------------------
            //funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
            this.recuperaDatiUtenteToken = _functions_gestioneToken__WEBPACK_IMPORTED_MODULE_16__["recuperaDatiUtenteToken"];
            //-----------------------------------------INIZIALIZZAZIONE--------------------------------------------
            //funzione per init 
            this.initDati = _functions_inizializzazione__WEBPACK_IMPORTED_MODULE_17__["initDati"];
            //funzione per aggiornare i dati
            this.recuperaDatiAggiornati = _functions_inizializzazione__WEBPACK_IMPORTED_MODULE_17__["recuperaDatiAggiornati"];
            //funzione per inizializzazione variabili
            this.azzeramentoVariabili = _functions_inizializzazione__WEBPACK_IMPORTED_MODULE_17__["azzeramentoVariabili"];
            //-----------------------------------------GESTIONE SOCKET---------------------------------------
            //configurazione socket
            this.configurazioneSocket = _functions_gestioneSocket__WEBPACK_IMPORTED_MODULE_13__["configurazioneSocket"];
            //-----------------------------------------GESTIONE FILTRO--------------------------------------------
            //funzione per vedere se il filtro e attivato o disattivato
            this.verificaFiltro = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_7__["verificaFiltro"];
            //funzione per annullare il filtro
            this.annullaFiltro = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_7__["annullaFiltro"];
            //funzione per filtrare le inserzioni in vendita
            this.filtraInserzioni = _functions_gestioneFiltro__WEBPACK_IMPORTED_MODULE_7__["filtraInserzioni"];
            /*-----------------------------------------OTTENERE LISTA INSERZIONI DIVISE PER TIPOLOGIA--------------------------------------------*/
            //funzione per ottenere tutte le inserzioni create e quelle dove ce una proposta e quelle vinte
            this.getListaInserzioniCreateProposte = _functions_getInserzioniPerTipologia__WEBPACK_IMPORTED_MODULE_21__["getListaInserzioniCreateProposte"];
            //funzione per ottenere tutte le inserzioni che l utente loggato ha partecipato
            this.getListaInserzioniPartecipate = _functions_getInserzioniPerTipologia__WEBPACK_IMPORTED_MODULE_21__["getListaInserzioniPartecipate"];
            //funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
            this.getListaInserzioniInVendita = _functions_getInserzioniPerTipologia__WEBPACK_IMPORTED_MODULE_21__["getListaInserzioniInVendita"];
            //funzione per ottenere tutte le inserzioni vendute
            this.getListaInserzioniVendute = _functions_getInserzioniPerTipologia__WEBPACK_IMPORTED_MODULE_21__["getListaInserzioniVendute"];
            //-------------------------------SELEZIONARE INSERZIONE PER CIASCUNA TIPOLOGIA----------------------------------
            //funzione per settare l inserzione vinta che l utente ha selezionato dall elenco
            this.setInserzioneVintaSelezionata = _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__["setInserzioneVintaSelezionata"];
            //funzione per settare l inserzione partecipata dall elenco
            this.setInserzionePartecipataSelezionata = _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__["setInserzionePartecipataSelezionata"];
            //funzione per settare l inserzione creata che l utente ha selezionato dall elenco
            this.setInserzioneCreataSelezionata = _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__["setInserzioneCreataSelezionata"];
            //funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
            this.setInserzioneInVenditaSelezionata = _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__["setInserzioneInVenditaSelezionata"];
            //funzione per settare l inserzione venduta che l utente loggato ha premuto per visualizzare i dettagli
            this.setInserzioneVendutaSelezionata = _functions_gestioneSelezioneInserzioni__WEBPACK_IMPORTED_MODULE_12__["setInserzioneVendutaSelezionata"];
            /*----------------------------------INSERIMENTO NUOVA INSERZIONE-------------------------------------*/
            //funzione per inizializzare inserzione e libro in quanto ne devo inserire una nuova e devo azzerare i campi
            this.inizializzaNuovaInserzione = _functions_gestioneInserzione__WEBPACK_IMPORTED_MODULE_18__["inizializzaNuovaInserzione"];
            //funzione per inserire una nuova inserzione
            this.inserisciInserzione = _functions_gestioneInserzione__WEBPACK_IMPORTED_MODULE_18__["inserisciInserzione"];
            //funzione per eliminare un inserzione
            this.eliminaInserzione = _functions_gestioneInserzione__WEBPACK_IMPORTED_MODULE_18__["eliminaInserzione"];
            /*----------------------------------GESTIONE INVIO NUOVO MESSAGGIO-------------------------------------*/
            //funzione per inviare il messaggio
            this.inviaMessaggio = _functions_gestioneInvioMessaggio__WEBPACK_IMPORTED_MODULE_8__["inviaMessaggio"];
            //funzione per impostare l id dell messaggio di riferimento prima di inviarlo
            this.setMessaggioRiferimento = _functions_gestioneInvioMessaggio__WEBPACK_IMPORTED_MODULE_8__["setMessaggioRiferimento"];
            //funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
            this.getContenutoMessaggioRiferimento = _functions_gestioneInvioMessaggio__WEBPACK_IMPORTED_MODULE_8__["getContenutoMessaggioRiferimento"];
            /*----------------------------------GESTIONE LISTA UTENTI CHE L UTENTE HA CHATTATO INSIEME-------------------------------------*/
            //funzione per selezionare gli utenti che l utente loggato ha chattato ordinato per date decrescenti
            this.getListaUtentiChat = _functions_gestioneListaStudentiChattato__WEBPACK_IMPORTED_MODULE_10__["getListaUtentiChat"];
            /*----------------------------------GESTIONE LAYOUT CHAT MESSAGGI-------------------------------------*/
            //funzione per vedere se in un determinato messaggio l utente loggato sia il mittente
            this.isMittente = _functions_gestioneLayoutChat__WEBPACK_IMPORTED_MODULE_9__["isMittente"];
            //funzione per vedere se in un determinato messaggio l utente loggato sia il destinatario
            this.isDestinatario = _functions_gestioneLayoutChat__WEBPACK_IMPORTED_MODULE_9__["isDestinatario"];
            //funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
            this.getPersonaNellaChat = _functions_gestioneLayoutChat__WEBPACK_IMPORTED_MODULE_9__["getPersonaNellaChat"];
            /*----------------------------------GESTIONE LOGOUT-------------------------------------*/
            //funzione per effettuare il logout e reindirizzati alla pagina di login
            this.logout = _functions_gestioneLogout__WEBPACK_IMPORTED_MODULE_11__["logout"];
            /*----------------------------------GESTIONE NUOVA OFFERTA INSERZIONE-------------------------------------*/
            //funzione per fare una nuova offerta all inserzione selezionata
            this.nuovaOffertaSelezionata = _functions_nuovaOffertaInserzione__WEBPACK_IMPORTED_MODULE_19__["nuovaOffertaSelezionata"];
            /*----------------------------------GESTIONE BOTTONI CHAT PERSONA, PRIVATA E PUBBLICA-------------------------------------*/
            //funzione per verificare se un utente e gia dentro alla lista
            this.isUtentePresente = _functions_gestioneTipologieChat__WEBPACK_IMPORTED_MODULE_15__["isUtentePresente"];
            //funzione per la lista dei messaggi rispetto ad una certa persona
            this.getListaMessaggiPersona = _functions_gestioneTipologieChat__WEBPACK_IMPORTED_MODULE_15__["getListaMessaggiPersona"];
            //funzione per la lista dei messaggi sulla chat privata presente nell popup dell inserzione
            this.getListaMessaggiInserzioneChatPrivata = _functions_gestioneTipologieChat__WEBPACK_IMPORTED_MODULE_15__["getListaMessaggiInserzioneChatPrivata"];
            //funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
            this.getListaMessaggiInserzioneChatPubblica = _functions_gestioneTipologieChat__WEBPACK_IMPORTED_MODULE_15__["getListaMessaggiInserzioneChatPubblica"];
            /*----------------------------------GESTIONE TIPOLOGIA CHAT SELEZIONATA-------------------------------------*/
            //funzione per azzerare i flag delle chat
            this.azzeramentoFlagChat = _functions_gestioneTipologiaChatSelezionata__WEBPACK_IMPORTED_MODULE_14__["azzeramentoFlagChat"];
            //funzione per usare la chat singola persona
            this.setChatSingolaPersona = _functions_gestioneTipologiaChatSelezionata__WEBPACK_IMPORTED_MODULE_14__["setChatSingolaPersona"];
            //funzione per usare la chat privata dell inserzione
            this.setChatPrivataInserzione = _functions_gestioneTipologiaChatSelezionata__WEBPACK_IMPORTED_MODULE_14__["setChatPrivataInserzione"];
            //funzione per usare la chat pubblica dell inserzione
            this.setChatPubblicaInserzione = _functions_gestioneTipologiaChatSelezionata__WEBPACK_IMPORTED_MODULE_14__["setChatPubblicaInserzione"];
            /*----------------------------------UTILITY O MAI USATE-------------------------------------*/
            //funzione per ottenre il messaggio dall id
            this.getMessaggioById = _functions_utility__WEBPACK_IMPORTED_MODULE_20__["getMessaggioById"];
            //funzione per ottenere la lista dei libri associati alle varie inserzioni
            this.getLibriAssociatiInserzioni = _functions_utility__WEBPACK_IMPORTED_MODULE_20__["getLibriAssociatiInserzioni"];
            //funzione per vedere se una data e gia scaduta
            this.isScaduta = _functions_utility__WEBPACK_IMPORTED_MODULE_20__["isScaduta"];
            //funzione per vedere se la lista di utenti è vuota
            this.isVuota = _functions_utility__WEBPACK_IMPORTED_MODULE_20__["isVuota"];
        }
        //-------------------------------------------------------------------------------------
        ngOnInit() {
            //recupero i dati dell utente dal token altrimenti bisgona rifare il login
            this.recuperaDatiUtenteToken();
        }
    }
    HomepagestudenteComponent.ɵfac = function HomepagestudenteComponent_Factory(t) { return new (t || HomepagestudenteComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_socketio_service__WEBPACK_IMPORTED_MODULE_22__["SocketioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_23__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_24__["InserzioneService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_25__["LibroService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_26__["MessaggioService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_27__["Router"])); };
    HomepagestudenteComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomepagestudenteComponent, selectors: [["app-homepagestudente"]], decls: 360, vars: 43, consts: [[1, "container"], [1, "row", "row-cols-1", "row-cols-md-3"], [1, "col-md-4"], [1, "card", "text-center", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "card-body", "text-secondary"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#inserimentoinserzione", 1, "btn", "btn-block", "btn-secondary", "btn-sm", 3, "click"], [1, "card", "border", "border-secondary", "altezza-card", "mt-3", 2, "width", "100%"], [1, "card-header", "text-center", "sfondo-grigio-chiaro", "testo-bianco", "testo-grassetto"], [1, "list-group", "list-group-flush", "overflow-auto"], ["class", "list-group-item", 4, "ngFor", "ngForOf"], [1, "list-group-item"], ["type", "button", "class", "btn btn-block btn-secondary btn-sm float-right", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-block btn-danger btn-sm float-right", 3, "click", 4, "ngIf"], ["id", "alertnuovomessaggio", "class", "alert alert-secondary alert-dismissible fade show mt-3 ml-3 mr-3", "role", "alert", 4, "ngIf"], ["type", "button", 1, "btn", "btn-block", "btn-secondary", "btn-sm", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", "btn-sm", "btn-block", 3, "click", "submit"], [1, "card-body"], ["id", "alertnuovoerrore", "class", "alert alert-secondary alert-dismissible fade show mt-3 ml-3 mr-3", "role", "alert", 4, "ngIf"], ["id", "inserimentoinserzione", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], [1, "modal-dialog", "modal-xl"], [1, "modal-content"], [1, "modal-header", "text-center"], [1, "modal-title", "text"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close"], ["aria-hidden", "true"], ["action", "#", "method", "GET"], [1, "modal-body"], [1, "row"], [1, "col-md-3", "mt-3", "text-center"], ["type", "text", "readonly", "", "value", "Libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], [1, "col-md-9", "mt-3", "text-center"], ["name", "libro", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputLibro", "ngModel"], ["type", "text", "readonly", "", "value", "Corso di studi", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "corsodistudi", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputCorsoDiStudi", "ngModel"], ["type", "text", "readonly", "", "value", "Universita", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "universita", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputUniversita", "ngModel"], ["type", "text", "readonly", "", "value", "Autore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "autore", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAutore", "ngModel"], ["type", "text", "readonly", "", "value", "Anno di pubblicazione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "annodipubblicazione", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAnnoDiPubblicazione", "ngModel"], ["type", "text", "readonly", "", "value", "Edizione", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "edizione", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputEdizione", "ngModel"], ["type", "text", "readonly", "", "value", "Isbn", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "isbn", "type", "text", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputIsbn", "ngModel"], ["type", "text", "readonly", "", "value", "Data inizio", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datainizio", "type", "date", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputDataInizio", "ngModel"], ["type", "text", "readonly", "", "value", "Data fine", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "datafine", "type", "date", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputDataFine", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo iniziale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoiniziale", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoIniziale", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo riserva", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoriserva", "type", "number", "value", "", "required", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoRiserva", "ngModel"], ["class", "alert alert-danger mt-3", "role", "alert", 4, "ngIf"], ["class", "alert alert-success mt-3", "role", "alert", 4, "ngIf"], ["class", "alert alert-primary mt-3", "role", "alert", 4, "ngIf"], [1, "modal-footer"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger"], ["type", "submit", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-success", 3, "click", "submit"], ["id", "filtrareinserzioni", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "text", "readonly", "", "value", "Nome libro", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["inputNomeLibro", "ngModel"], ["name", "corsodistudi", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["name", "universita", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["type", "text", "readonly", "", "value", "Area gerografica", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "areaGeografica", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputAreaGeografica", "ngModel"], ["type", "text", "readonly", "", "value", "Venditore", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "venditore", "type", "text", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputVenditore", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale minimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMinimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMinimo", "ngModel"], ["type", "text", "readonly", "", "value", "Prezzo attuale massimo", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoMassimo", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputPrezzoMassimo", "ngModel"], ["id", "visualizzazioneinserzionecreata", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["class", "modal-body", 4, "ngIf"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger"], ["type", "button", "data-toggle", "modal", "data-target", "#vistachat", 1, "btn", "btn-warning", 3, "click"], ["type", "button", "class", "btn btn-danger", "data-dismiss", "modal", "aria-label", "Close", 3, "click", 4, "ngIf"], ["id", "visualizzazioneinserzionevenduta", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["id", "visualizzazioneinserzioneinvendita", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "button", "data-toggle", "modal", "data-target", "#inserimentopropostainserzione", 1, "btn", "btn-primary"], ["id", "visualizzazioneinserzionepartecipata", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-success"], ["id", "visualizzazioneinserzionevinta", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["id", "inserimentopropostainserzione", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "button", "onclick", "$('#inserimentopropostainserzione').modal('hide');$('#visualizzazioneinserzioneinvendita').modal('show');", 1, "btn", "btn-danger"], ["type", "button", "onclick", "$('#inserimentopropostainserzione').modal('hide');$('#visualizzazioneinserzioneinvendita').modal('hide');", 1, "btn", "btn-success", 3, "click"], ["id", "vistachat", "data-backdrop", "static", "data-keyboard", "false", "tabindex", "-1", "role", "dialog", "aria-hidden", "true", 1, "modal", "fade"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "close", 3, "click"], ["class", "row", 4, "ngFor", "ngForOf"], ["id", "textinviomess", 1, "row", "mt-3"], [1, "col-1"], [1, "col-10"], [1, "row", "border", "border-secondary", "rounded-lg"], ["id", "alertmessaggioriferimento", "role", "alert", 1, "mt-3", "alert", "float-left", "alert-secondary", "rounded-lg", 2, "width", "100%", "display", "none"], ["type", "button", "onclick", "$('#alertmessaggioriferimento').hide()", 1, "close", 3, "click"], ["id", "inputMessaggio", "rows", "4", "placeholder", "Inserisci il tuo messaggio...", 1, "form-control", 2, "width", "100%", 3, "ngModel", "ngModelChange"], ["inputMessaggio", "ngModel"], [1, "col-2"], ["type", "button", "onclick", "$('#alertmessaggioriferimento').hide(); document.getElementById('inputMessaggio').value='';", 1, "mt-3", "btn", "btn-secondary", 2, "width", "100%", 3, "click"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "align-middle", "text-secondary"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzionecreata", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzioneinvendita", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-toggle", "modal", "data-target", "#filtrareinserzioni", 1, "btn", "btn-block", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", 1, "btn", "btn-block", "btn-danger", "btn-sm", "float-right", 3, "click"], ["type", "button", 1, "btn", "btn-sm", "float-right"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzionevinta", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzionepartecipata", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#visualizzazioneinserzionevenduta", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["id", "alertnuovomessaggio", "role", "alert", 1, "alert", "alert-secondary", "alert-dismissible", "fade", "show", "mt-3", "ml-3", "mr-3"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", "data-toggle", "modal", "data-target", "#vistachat", 1, "btn", "btn-secondary", "btn-sm", "float-right", 3, "click"], ["id", "alertnuovoerrore", "role", "alert", 1, "alert", "alert-secondary", "alert-dismissible", "fade", "show", "mt-3", "ml-3", "mr-3"], ["role", "alert", 1, "alert", "alert-danger", "mt-3"], ["role", "alert", 1, "alert", "alert-success", "mt-3"], ["role", "alert", 1, "alert", "alert-primary", "mt-3"], ["name", "libro", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "corsodistudi", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "universita", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "autore", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "annodipubblicazione", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "edizione", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "isbn", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "datainizio", "type", "date", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "datafine", "type", "date", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "prezzoiniziale", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Prezzo attuale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoattuale", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["name", "prezzoriserva", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Utente prezzo attuale", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "utenteprezzoattuale", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "button", "data-dismiss", "modal", "aria-label", "Close", 1, "btn", "btn-danger", 3, "click"], ["type", "text", "readonly", "", "value", "Utente", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "utente", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["class", "row", 4, "ngIf"], ["type", "text", "readonly", "", "value", "Prezzo di riserva", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "prezzoRiserva", "type", "number", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Ultima proposta", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "ultimaproposta", "type", "text", "disabled", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "value"], ["type", "text", "readonly", "", "value", "Nuova proposta", 1, "form-control-plaintext", "text-center", "border", "border-light"], ["name", "nuovaofferta", "type", "number", "value", "", 1, "form-control-plaintext", "text-center", "border", "border-secondary", 3, "ngModel", "ngModelChange"], ["inputNuovaOfferta", "ngModel"], ["class", "col-1", 4, "ngIf"], ["class", "col-7 mt-3 alert float-left alert-secondary rounded-lg border border-secondary", "role", "alert", 4, "ngIf"], ["class", "col-4 mt-3 alert float-left rounded-lg", "role", "alert", 4, "ngIf"], ["class", "col-4 mt-3 alert text-right rounded-lg", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "col-7", "mt-3", "alert", "float-left", "alert-secondary", "rounded-lg", "border", "border-secondary"], ["style", "width: 100%;", "class", "mt-3 alert float-left alert-light rounded-lg border border-secondary", "role", "alert", 4, "ngIf"], ["role", "alert", 1, "mt-3", "alert", "float-left", "alert-light", "rounded-lg", "border", "border-secondary", 2, "width", "100%"], ["role", "alert", 1, "col-4", "mt-3", "alert", "float-left", "rounded-lg"], ["onclick", "$('#alertmessaggioriferimento').show()", "src", "./assets/img/freccia.png", "width", "30", "height", "40", 2, "vertical-align", "middle", 3, "click"], ["role", "alert", 1, "col-4", "mt-3", "alert", "text-right", "rounded-lg"]], template: function HomepagestudenteComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Creazione inserzione ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Vuoi inserire una nuova inserzione? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_10_listener() { return ctx.inizializzaNuovaInserzione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Inserisci inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Lista inserzioni create ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, HomepagestudenteComponent_li_17_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " Lista inserzioni in vendita ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, HomepagestudenteComponent_li_23_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, HomepagestudenteComponent_button_25_Template, 2, 0, "button", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, HomepagestudenteComponent_button_26_Template, 2, 0, "button", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, " Lista proposte nelle inserzioni ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, HomepagestudenteComponent_li_32_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, " Lista inserzioni vinte ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](38, HomepagestudenteComponent_li_38_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Lista inserzioni partecipate ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, HomepagestudenteComponent_li_44_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, " Lista inserzioni vendute ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, HomepagestudenteComponent_li_50_Template, 2, 1, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " Lista chat ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "ul", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](56, HomepagestudenteComponent_div_56_Template, 11, 2, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](57, HomepagestudenteComponent_li_57_Template, 5, 2, "li", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, " Aggiornamento dati ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, " Vuoi recuperare i dati pi\u00F9 aggiornati dal sistema? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](64, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "button", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_66_listener() { return ctx.recuperaDatiAggiornati(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Aggiorna dati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " Logout ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, " Sei sicuro di voler far il logout? Sarai obbligato a reinserire le credenziali ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "button", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_76_listener() { return ctx.logout(); })("submit", function HomepagestudenteComponent_Template_button_submit_76_listener() { return ctx.logout(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Effettua logout");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, " Gestione errori ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](83, HomepagestudenteComponent_div_83_Template, 11, 2, "div", 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "div", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, " Implementazione futura ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, " Funzionalita extra ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "Inserimento inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "form", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "input", 30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "input", 32, 33);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_106_listener($event) { return ctx.libro.nome = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](110, "input", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "input", 35, 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_112_listener($event) { return ctx.libro.corsoDiStudi = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](116, "input", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "input", 38, 39);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_118_listener($event) { return ctx.libro.universita = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "input", 40);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "input", 41, 42);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_124_listener($event) { return ctx.libro.autore = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](128, "input", 43);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "input", 44, 45);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_130_listener($event) { return ctx.libro.annoPubblicazione = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](134, "input", 46);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "input", 47, 48);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_136_listener($event) { return ctx.libro.edizione = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](140, "input", 49);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "input", 50, 51);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_142_listener($event) { return ctx.libro.isbn = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](146, "input", 52);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "input", 53, 54);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_148_listener($event) { return ctx.inserzione.dataInizio = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](152, "input", 55);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "input", 56, 57);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_154_listener($event) { return ctx.inserzione.dataFine = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](158, "input", 58);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "input", 59, 60);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_160_listener($event) { return ctx.inserzione.prezzoIniziale = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](164, "input", 61);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "input", 62, 63);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_166_listener($event) { return ctx.inserzione.prezzoRiserva = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](168, HomepagestudenteComponent_div_168_Template, 2, 1, "div", 64);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](169, HomepagestudenteComponent_div_169_Template, 2, 1, "div", 65);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](170, HomepagestudenteComponent_div_170_Template, 2, 1, "div", 66);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "button", 68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](173, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "button", 69);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_174_listener() { return ctx.inserisciInserzione(); })("submit", function HomepagestudenteComponent_Template_button_submit_174_listener() { return ctx.inserisciInserzione(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](175, "Inserisci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "div", 70);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](179, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](181, "Filtraggio inserzione");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "form", 26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](188, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](189, "input", 71);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "input", 32, 72);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_191_listener($event) { return ctx.filtraggioInserzioni.nomeLibro = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](194, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](195, "input", 34);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](196, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "input", 73, 36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_197_listener($event) { return ctx.filtraggioInserzioni.corsoDiStudi = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](201, "input", 37);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](202, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "input", 74, 39);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_203_listener($event) { return ctx.filtraggioInserzioni.universita = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](207, "input", 75);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "input", 76, 77);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_209_listener($event) { return ctx.filtraggioInserzioni.areaGeografica = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](213, "input", 78);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "input", 79, 80);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_215_listener($event) { return ctx.filtraggioInserzioni.venditore = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](217, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](218, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](219, "input", 81);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](221, "input", 82, 83);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_221_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMinimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "div", 28);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](224, "div", 29);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](225, "input", 84);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "div", 31);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](227, "input", 85, 86);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_input_ngModelChange_227_listener($event) { return ctx.filtraggioInserzioni.prezzoAttualeMassimo = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](230, "button", 68);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](231, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "button", 69);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_232_listener() { return ctx.filtraInserzioni(); })("submit", function HomepagestudenteComponent_Template_button_submit_232_listener() { return ctx.filtraInserzioni(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233, "Filtra");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "div", 87);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](238, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](239, "Visualizzazione inserzione creata");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](242, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](243, HomepagestudenteComponent_div_243_Template, 66, 13, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](244, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "button", 89);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](246, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_247_listener() { ctx.setChatPubblicaInserzione(); return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](248, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](249, HomepagestudenteComponent_button_249_Template, 2, 0, "button", 91);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](250, "div", 92);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](253, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](255, "Visualizzazione inserzione venduta");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](257, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](258, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](259, HomepagestudenteComponent_div_259_Template, 66, 13, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](260, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "button", 89);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_263_listener() { ctx.setChatPubblicaInserzione(); return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "div", 93);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](266, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](268, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](269, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](270, "Visualizzazione inserzione in vendita");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](271, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](272, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](273, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](274, HomepagestudenteComponent_div_274_Template, 56, 11, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](275, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](276, "button", 89);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](277, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](278, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_278_listener() { ctx.setChatPrivataInserzione(); return ctx.getListaMessaggiInserzioneChatPrivata(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](279, "Chat privata");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](280, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_280_listener() { ctx.setChatPubblicaInserzione(); return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](281, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](282, "button", 94);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](283, "Proposta");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](284, "div", 95);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](285, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](286, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](287, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](288, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](289, "Visualizzazione inserzione partecipata");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](290, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](291, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](292, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](293, HomepagestudenteComponent_div_293_Template, 57, 12, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](294, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](295, "button", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](296, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](297, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_297_listener() { ctx.setChatPrivataInserzione(); return ctx.getListaMessaggiInserzioneChatPrivata(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](298, "Chat privata");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](299, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_299_listener() { ctx.setChatPubblicaInserzione(); return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](300, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](301, "div", 97);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](302, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](303, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](304, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](305, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](306, "Visualizzazione inserzione vinta");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](307, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](308, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](309, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](310, HomepagestudenteComponent_div_310_Template, 57, 12, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](311, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](312, "button", 96);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](313, "Esci");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](314, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_314_listener() { ctx.setChatPrivataInserzione(); return ctx.getListaMessaggiInserzioneChatPrivata(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](315, "Chat privata");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](316, "button", 90);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_316_listener() { ctx.setChatPubblicaInserzione(); return ctx.getListaMessaggiInserzioneChatPubblica(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](317, "Chat pubblica");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](318, "div", 98);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](319, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](320, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](321, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](322, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](323, "Inserimento proposta");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](324, "button", 24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](325, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](326, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](327, HomepagestudenteComponent_div_327_Template, 15, 5, "div", 88);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](328, "div", 67);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](329, "button", 99);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](330, "Annulla");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](331, "button", 100);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_331_listener() { return ctx.nuovaOffertaSelezionata(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](332, "Invia proposta");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](333, "div", 101);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](334, "div", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](335, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](336, "div", 22);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](337, "h5", 23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](338);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](339, "button", 102);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_339_listener() { return ctx.azzeramentoFlagChat(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](340, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](341, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](342, "div", 27);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](343, HomepagestudenteComponent_div_343_Template, 7, 6, "div", 103);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](344, "div", 104);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](345, "div", 105);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](346, "div", 106);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](347, "div", 107);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](348, "div", 106);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](349, "div", 108);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](350, "button", 109);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_350_listener() { return ctx.setMessaggioRiferimento(0); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](351, "span", 25);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](352, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](353);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](354, "textarea", 110, 111);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function HomepagestudenteComponent_Template_textarea_ngModelChange_354_listener($event) { return ctx.messaggioDaInviare.contenuto = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](356, "div", 112);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](357, "button", 113);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomepagestudenteComponent_Template_button_click_357_listener() { ctx.inviaMessaggio(); return ctx.setMessaggioRiferimento(0); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](358, "Invia");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](359, "div", 105);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriCreati);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriInVendita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.verificaFiltro());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriOfferte);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriVinti);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriPartecipate);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.libriVenduti);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.utenteMessaggioAppenaArrvato);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.studentiConChat);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](26);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.dettagliErrore.getMessage());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.nome);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.corsoDiStudi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.universita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.autore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.annoPubblicazione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.edizione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.libro.isbn);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.dataInizio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.dataFine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.prezzoIniziale);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.inserzione.prezzoRiserva);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioErrore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioConferma);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.nomeLibro);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.corsoDiStudi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.universita);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.areaGeografica);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.venditore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMinimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.filtraggioInserzioni.prezzoAttualeMassimo);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione && ctx.utente && ctx.libro);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione && ctx.inserzione.isScaduta() && !ctx.inserzione.isVintaGenerico());
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione && ctx.utente && ctx.libro);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.inserzione);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Chat con ", ctx.destinatarioMessaggiChatSelezionata, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.listaMessaggi);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx.messaggioRiferimento.getContenuto(), " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.messaggioDaInviare.contenuto);
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_28__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_28__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_29__["NumberValueAccessor"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.altezza-card[_ngcontent-%COMP%]{\r\n    height: 250px;\r\n}\r\n\r\n.testo-grassetto[_ngcontent-%COMP%]{\r\n    font-weight: bold;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\r\n\r\n.testo-bianco[_ngcontent-%COMP%]{\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9ob21lcGFnZXN0dWRlbnRlL2hvbWVwYWdlc3R1ZGVudGUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRpL2hvbWVwYWdlc3R1ZGVudGUvaG9tZXBhZ2VzdHVkZW50ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhcmFncmFmby1jZW50cmF0b3tcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuZGl2IGF7XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuLmFsdGV6emEtY2FyZHtcclxuICAgIGhlaWdodDogMjUwcHg7XHJcbn1cclxuXHJcbi50ZXN0by1ncmFzc2V0dG97XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnRlc3RvLWdyaWdpb3tcclxuICAgIGNvbG9yOiBncmV5O1xyXG59XHJcblxyXG4uc2ZvbmRvLWdyaWdpb3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFNkVFRjA7XHJcbn1cclxuXHJcbi5zZm9uZG8tZ3JpZ2lvLWNoaWFyb3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM3NTgxOEQ7XHJcbn1cclxuXHJcbi5jYXJke1xyXG4gICAgbWFyZ2luOiBhdXRvO1xyXG4gICAgd2lkdGg6IDQwMHB4O1xyXG59XHJcblxyXG4udGVzdG8tYmlhbmNve1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59Il19 */"] });
    return HomepagestudenteComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomepagestudenteComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-homepagestudente",
                templateUrl: "./homepagestudente.component.html",
                styleUrls: ["./homepagestudente.component.css"]
            }]
    }], function () { return [{ type: src_app_servizi_socketio_service__WEBPACK_IMPORTED_MODULE_22__["SocketioService"] }, { type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_23__["PersonaService"] }, { type: _servizi_inserzione_service__WEBPACK_IMPORTED_MODULE_24__["InserzioneService"] }, { type: src_app_servizi_libro_service__WEBPACK_IMPORTED_MODULE_25__["LibroService"] }, { type: src_app_servizi_messaggio_service__WEBPACK_IMPORTED_MODULE_26__["MessaggioService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_27__["Router"] }]; }, null); })();


/***/ }),

/***/ "orlk":
/*!************************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/getInserzioniPerTipologia.ts ***!
  \************************************************************************************/
/*! exports provided: getListaInserzioniCreateProposte, getListaInserzioniPartecipate, getListaInserzioniInVendita, getListaInserzioniVendute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioniCreateProposte", function() { return getListaInserzioniCreateProposte; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioniPartecipate", function() { return getListaInserzioniPartecipate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioniInVendita", function() { return getListaInserzioniInVendita; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaInserzioniVendute", function() { return getListaInserzioniVendute; });
/* harmony import */ var src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/inserzione */ "PZox");

//funzione per ottenere tutte le inserzioni create e quelle dove ce una proposta e quelle vinte
function getListaInserzioniCreateProposte() {
    //resetto la lista delle varie inserzioni
    this.inserzioniCreate = [];
    this.inserzioniOfferteFatte = [];
    this.inserzioniVinte = [];
    //resetto la lista dei vari libri
    this.libriCreati = [];
    this.libriOfferte = [];
    this.libriVinti = [];
    //ottengo la lista delle inserzioni e poi guardo io dove metterle
    this.is.getListaInserzioniCreateProposte().subscribe((data) => {
        //dato che mi resistuisce le inserzioni dove l utente attuale le ha create OPPURE ha fatto un offerta le devo analizzare
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale e stata creata dall utente attuale
            if (data.inserzioni[i].utente === this.utenteLoggato.getIdUser()) {
                this.inserzioniCreate.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro creato nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriCreati.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
            //se l inserzione attuale ha la proposta del prezzo attuale dall utente loggato che e diverso dal creatore e se non e scaduta
            else if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser() && data.inserzioni[i].utentePrezzoAttuale === this.utenteLoggato.getIdUser() && !(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]).isScaduta())) {
                this.inserzioniOfferteFatte.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro con l offerta fatta nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriOfferte.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
            //se l inserzione attuale ha la proposta del prezzo attuale dall utente loggato che e diverso dal creatore e se e scaduta vuol dire che e stata vinta
            else if (new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]).isVinta(this.utenteLoggato.getIdUser())) {
                this.inserzioniVinte.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro vinto nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriVinti.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
        }
    }, (err) => {
        //errore estrazione inserzioni
        this.dettagliErrore.setMessage("Errore estrazione inserzioni");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni " + JSON.stringify(err));
    });
}
//funzione per ottenere tutte le inserzioni che l utente loggato ha partecipato
function getListaInserzioniPartecipate() {
    //resetto la lista delle varie inserzioni
    this.inserzioniPartecipate = [];
    //resetto la lista dei vari libri
    this.libriPartecipate = [];
    //ottengo la lista degli id delle inserzioni che ha partecipato l utente loggato
    this.us.getUtenteById(this.utenteLoggato.getIdUser()).subscribe((data) => {
        //estraggo gli indici delle inserzioni che ha partecipato l utente loggato
        var listaIdInserzioniPartecipate = new Array();
        for (let i = 0; i < data.utenti[0].astePartecipate.toString().split(',').length; ++i) {
            listaIdInserzioniPartecipate.push(Number(data.utenti[0].astePartecipate.toString().split(',')[i]));
        }
        //ottengo la lista delle inserzioni dall id precedentemente estratto
        this.is.getListaInserzioniPartecipate(listaIdInserzioniPartecipate).subscribe((data) => {
            //per tutte le inserzioni le inserisco nella lista giusta
            for (var i = 0; i < data.inserzioni.length; ++i) {
                //inserisco l inserzione nella lista giusta
                this.inserzioniPartecipate.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                //inserisco il libro in vendita nella lista relativa
                this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                    this.libriPartecipate.push(data1.libri[0]);
                }, (err) => {
                    //errore estrazione libro dell inserzione
                    this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                });
            }
        }, (err) => {
            //errore estrazione lista inserzioni
            this.dettagliErrore.setMessage("Errore estrazione lista inserzioni");
            this.dettagliErrore.setReason(JSON.stringify(err));
            console.log("Errore estrazione lista inserzioni " + JSON.stringify(err));
        });
    }, (err) => {
        //errore estrazione lista id inserzioni partecipate
        this.dettagliErrore.setMessage("Errore estrazione lista id inserzioni partecipate");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione lista id inserzioni partecipate " + JSON.stringify(err));
    });
}
//funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
function getListaInserzioniInVendita() {
    //resetto la lista delle varie inserzioni
    this.inserzioniInVendita = [];
    //resetto la lista dei vari libri
    this.libriInVendita = [];
    //ottengo la lista delle inserzioni in vendita
    this.is.getListaInserzioniInVendita().subscribe((data) => {
        //mi resistuisce tutte le inserzioni perche faccio tramite controllo lato client se e stata vinta oppure se e in vendita rispettando certi termini
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale non e stata creata dall utente attuale
            if (data.inserzioni[i].utente !== this.utenteLoggato.getIdUser()) {
                //verifico inoltre che l utente non abbia gia fatto una proposta perche altrimenti viene fuori nella sezione proposte
                if (data.inserzioni[i].utentePrezzoAttuale !== this.utenteLoggato.getIdUser()) {
                    //se non e ancora scaduta
                    if (!((new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i])).isScaduta()) && new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]).getDataInizio() <= new Date()) {
                        //inserisco l inserzione nella lista giusta
                        this.inserzioniInVendita.push(new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]));
                        //inserisco il libro in vendita nella lista relativa
                        this.ls.getLibroById(data.inserzioni[i].libro).subscribe((data1) => {
                            this.libriInVendita.push(data1.libri[0]);
                        }, (err) => {
                            //errore estrazione libro dell inserzione
                            this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                            this.dettagliErrore.setReason(JSON.stringify(err));
                            console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                        });
                    }
                }
            }
        }
    }, (err) => {
        //errore estrazione inserzioni in vendita
        this.dettagliErrore.setMessage("Errore estrazione inserzioni in vendita");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni in vendita " + JSON.stringify(err));
    });
}
//funzione per ottenere tutte le inserzioni vendute
function getListaInserzioniVendute() {
    //resetto la lista delle varie inserzioni
    this.inserzioniVendute = [];
    //resetto la lista dei vari libri
    this.libriVenduti = [];
    //ottengo la lista delle inserzioni create
    this.is.getListaInserzioniCreateProposte().subscribe((data) => {
        //scorro le varie inserzioni
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //se l inserzione attuale è stata creata dall utente loggato
            if (data.inserzioni[i].utente === this.utenteLoggato.getIdUser()) {
                //variabile temporanea per creare l oggetto inserzione per sfruttare alcune funzioni
                var inserzioneTemp = new src_app_classi_inserzione__WEBPACK_IMPORTED_MODULE_0__["Inserzione"](data.inserzioni[i]);
                //guardo se l inserzione e stata venduta
                if (inserzioneTemp.IsVenduta(this.utenteLoggato.getIdUser())) {
                    this.inserzioniVendute.push(inserzioneTemp);
                    //inserisco il libro venduto nella lista relativa
                    this.ls.getLibroById(inserzioneTemp.getLibro()).subscribe((data1) => {
                        this.libriVenduti.push(data1.libri[0]);
                    }, (err) => {
                        //errore estrazione libro dell inserzione
                        this.dettagliErrore.setMessage("Errore estrazione libro dell inserzione");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore estrazione libro dell inserzione " + JSON.stringify(err));
                    });
                }
            }
        }
    }, (err) => {
        //errore estrazione inserzioni create
        this.dettagliErrore.setMessage("Errore estrazione inserzioni create");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione inserzioni create " + JSON.stringify(err));
    });
}


/***/ }),

/***/ "owD/":
/*!*********************************************************************************!*\
  !*** ./src/app/componenti/passworddimenticata/passworddimenticata.component.ts ***!
  \*********************************************************************************/
/*! exports provided: PassworddimenticataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PassworddimenticataComponent", function() { return PassworddimenticataComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classi_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classi/user */ "YTg5");
/* harmony import */ var _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../servizi/persona.service */ "DYeW");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function PassworddimenticataComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.messaggioErrore, " ");
} }
function PassworddimenticataComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r2.messaggioConferma, " ");
} }
function PassworddimenticataComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.messaggio, " ");
} }
let PassworddimenticataComponent = /** @class */ (() => {
    class PassworddimenticataComponent {
        constructor(us, router) {
            this.us = us;
            this.router = router;
            //variabile per prelevare i dati dal form sfruttando oggetto utente
            this.u = new _classi_user__WEBPACK_IMPORTED_MODULE_1__["Utente"]();
            //eventuali messaggi da stampare
            this.messaggioErrore = undefined;
            this.messaggioConferma = undefined;
            this.messaggio = undefined;
        }
        ngOnInit() {
        }
        //funzione per resettare la password
        resettaPassword() {
            this.us.resettaPassword(this.u).subscribe((data) => {
                this.messaggioErrore = undefined;
                this.messaggioConferma = "Password resettata";
                this.messaggio = undefined;
                //this.router.navigate(["/"]);
            }, (err) => {
                //errore resettare password
                this.messaggioErrore = "Errore resettare password " + JSON.stringify(err.error.message);
                this.messaggioConferma = undefined;
                this.messaggio = undefined;
            });
        }
    }
    PassworddimenticataComponent.ɵfac = function PassworddimenticataComponent_Factory(t) { return new (t || PassworddimenticataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
    PassworddimenticataComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PassworddimenticataComponent, selectors: [["app-passworddimenticata"]], decls: 27, vars: 6, consts: [[1, "container", "mt-3"], [1, "card"], [1, "card-body"], [1, "card-title", "paragrafo-centrato", "text-secondary"], [1, "form-group"], ["type", "email", "id", "email", "name", "email", "placeholder", "Email", "value", "", "required", "", 1, "form-control", "sfondo-grigio", 3, "ngModel", "ngModelChange"], ["inputEmail", "ngModel"], [1, "alert", "alert-danger", 3, "hidden"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["class", "alert alert-primary", "role", "alert", 4, "ngIf"], ["type", "button", 1, "btn", "btn-lg", "btn-block", "sfondo-grigio-chiaro", 3, "disabled", "click", "submit"], [1, "paragrafo-centrato", "testo-grigio"], ["routerLink", "/registrazione"], ["routerLink", "/login"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-success"], ["role", "alert", 1, "alert", "alert-primary"]], template: function PassworddimenticataComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Recupera password");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "form");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 5, 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function PassworddimenticataComponent_Template_input_ngModelChange_9_listener($event) { return ctx.u.email = $event; });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Email non valida ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, PassworddimenticataComponent_div_13_Template, 2, 1, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, PassworddimenticataComponent_div_14_Template, 2, 1, "div", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, PassworddimenticataComponent_div_15_Template, 2, 1, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PassworddimenticataComponent_Template_button_click_16_listener() { return ctx.resettaPassword(); })("submit", function PassworddimenticataComponent_Template_button_submit_16_listener() { return ctx.resettaPassword(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Recupera Password");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Non hai ancora un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Registrati");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "br");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " Hai gia un account? ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Accedi");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.u.email);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hidden", _r0.valid || _r0.pristine);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioErrore);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggioConferma);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.messaggio);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !_r0.valid);
        } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgForm"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["RequiredValidator"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".paragrafo-centrato[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n}\r\n\r\n.testo-grigio[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n    color: grey;\r\n}\r\n\r\n.sfondo-grigio[_ngcontent-%COMP%]{\r\n    background-color: #E6EEF0;\r\n}\r\n\r\n.sfondo-grigio-chiaro[_ngcontent-%COMP%]{\r\n    background-color: #75818D;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]{\r\n    margin: auto;\r\n    width: 400px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50aS9wYXNzd29yZGRpbWVudGljYXRhL3Bhc3N3b3JkZGltZW50aWNhdGEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0FBQ2hCIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50aS9wYXNzd29yZGRpbWVudGljYXRhL3Bhc3N3b3JkZGltZW50aWNhdGEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wYXJhZ3JhZm8tY2VudHJhdG97XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi50ZXN0by1ncmlnaW97XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuZGl2IGF7XHJcbiAgICBjb2xvcjogZ3JleTtcclxufVxyXG5cclxuLnNmb25kby1ncmlnaW97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTZFRUYwO1xyXG59XHJcblxyXG4uc2ZvbmRvLWdyaWdpby1jaGlhcm97XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzU4MThEO1xyXG59XHJcblxyXG4uY2FyZHtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHdpZHRoOiA0MDBweDtcclxufSJdfQ== */"] });
    return PassworddimenticataComponent;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PassworddimenticataComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: "app-passworddimenticata",
                templateUrl: "./passworddimenticata.component.html",
                styleUrls: ["./passworddimenticata.component.css"]
            }]
    }], function () { return [{ type: _servizi_persona_service__WEBPACK_IMPORTED_MODULE_2__["PersonaService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }]; }, null); })();


/***/ }),

/***/ "qhXO":
/*!*********************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneInvioMessaggio.ts ***!
  \*********************************************************************************/
/*! exports provided: inviaMessaggio, setMessaggioRiferimento, getContenutoMessaggioRiferimento */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inviaMessaggio", function() { return inviaMessaggio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMessaggioRiferimento", function() { return setMessaggioRiferimento; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContenutoMessaggioRiferimento", function() { return getContenutoMessaggioRiferimento; });
//funzione per inviare il messaggio
function inviaMessaggio() {
    //imposto i campi del nuovo messaggio
    this.messaggioDaInviare.setDestinatario(this.idUtenteDestinazione);
    this.messaggioDaInviare.setMittente(this.utenteLoggato.getIdUser());
    this.messaggioDaInviare.setData(new Date());
    this.messaggioDaInviare.setMessaggioRiferimento(this.messaggioRiferimento.getIdMessaggio());
    this.messaggioDaInviare.setOggetto("vuoto");
    //verifico se sono sulla chat privata con una persona
    if (this.chatSingolaPersona) {
        this.messaggioDaInviare.setIdInserzione(this.messaggioRiferimento.getIdInserzione());
    }
    //verifico se e una chat privata dell inserzione
    else if (this.chatPrivataInserzione) {
        this.messaggioDaInviare.setIdInserzione(this.inserzione.getIdInserzione());
    }
    //verifico se e una chat pubblica dell inserzione
    else if (this.chatPubblicaInserzione) {
        this.messaggioDaInviare.setIdInserzione(this.inserzione.getIdInserzione());
    }
    //invio il messaggio
    this.ms.inviaMessaggio(this.messaggioDaInviare).subscribe((data) => {
        //inizializzazione
        this.messaggioRiferimento.setIdMessaggio(0);
        this.messaggioRiferimento.setContenuto("");
        this.messaggioRiferimento.setIdInserzione(0);
    }, (err) => {
        //errore invio messaggio
        this.dettagliErrore.setMessage("Errore inviare il messaggio");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore inviare il messaggio: " + JSON.stringify(err));
    });
}
//funzione per impostare l id dell messaggio di riferimento prima di inviarlo
function setMessaggioRiferimento(idMessaggio) {
    //scorro la lista di messaggi
    for (let i = 0; i < this.listaMessaggi.length; ++i) {
        //se l id coincide
        if (idMessaggio === this.listaMessaggi[i].getIdMessaggio()) {
            //mi salvo i dati del messaggio trovato
            this.messaggioRiferimento.setIdMessaggio(this.listaMessaggi[i].getIdMessaggio());
            this.messaggioRiferimento.setContenuto(this.listaMessaggi[i].getContenuto());
            this.messaggioRiferimento.setIdInserzione((typeof (this.listaMessaggi[i].getIdInserzione()) !== "undefined") ? (this.listaMessaggi[i].getIdInserzione()) : (0));
            return;
        }
    }
    //azzero i campi perche non uso il riferimento
    this.messaggioRiferimento.setIdMessaggio(0);
    this.messaggioRiferimento.setContenuto("");
    this.messaggioRiferimento.setIdInserzione(0);
}
//funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
function getContenutoMessaggioRiferimento(messaggio) {
    //controllo di avere un messaggio valido in input
    if (messaggio) {
        //scorro i messaggi in quanto il messaggio di riferimento fa parte della stessa tipologia di messaggi che avevo estratto precedentemente
        for (let i = 0; i < this.listaMessaggi.length; ++i) {
            //se l id di riferimento corrisponde
            if (messaggio.getMessaggioRiferimento() === this.listaMessaggi[i].getIdMessaggio()) {
                return this.listaMessaggi[i];
            }
        }
    }
    return null;
}


/***/ }),

/***/ "rBy0":
/*!*****************************************************************************!*\
  !*** ./src/app/componenti/homepagestudente/functions/gestioneLayoutChat.ts ***!
  \*****************************************************************************/
/*! exports provided: isMittente, isDestinatario, getPersonaNellaChat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMittente", function() { return isMittente; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDestinatario", function() { return isDestinatario; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPersonaNellaChat", function() { return getPersonaNellaChat; });
//funzione per vedere se in un determinato messaggio l utente loggato sia il mittente
function isMittente(messaggio) {
    //verifico che il messaggio sia valido
    if (messaggio) {
        //verifico che il mittente sia l utente loggato
        if (messaggio.getMittente() === this.utenteLoggato.getIdUser()) {
            //restituisco vero
            return true;
        }
    }
    //altrimenti errore e restituisco falso
    return false;
}
//funzione per vedere se in un determinato messaggio l utente loggato sia il destinatario
function isDestinatario(messaggio) {
    //verifico che il messaggio sia valido
    if (messaggio) {
        //verifico che il destinatario sia l utente loggato
        if ((messaggio.getDestinatario() === this.utenteLoggato.getIdUser()) || (messaggio.getDestinatario() === 0 && messaggio.getMittente() !== this.utenteLoggato.getIdUser())) {
            //restituisco vero
            return true;
        }
    }
    //altrimenti errore e restituisco falso
    return false;
}
//funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
function getPersonaNellaChat(idUtente) {
    //scorro tutte le persone nella chat selezionata
    for (let i = 0; i < this.listaPersoneMessaggi.length; ++i) {
        //verifico che l id della persona coincida con quello in input
        if (this.listaPersoneMessaggi[i].getIdUser() === idUtente) {
            return this.listaPersoneMessaggi[i];
        }
    }
    return null;
}


/***/ }),

/***/ "uzJu":
/*!*********************************************!*\
  !*** ./src/app/servizi/socketio.service.ts ***!
  \*********************************************/
/*! exports provided: SocketioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocketioService", function() { return SocketioService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "gFX4");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _persona_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./persona.service */ "DYeW");





let SocketioService = /** @class */ (() => {
    class SocketioService {
        constructor(us) {
            this.us = us;
        }
        connect() {
            this.socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2__(this.us.getUrl());
            return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"]((observer) => {
                this.socket.on("broadcast", (m) => {
                    console.log("Messaggio ricevuto: " + JSON.stringify(m));
                    observer.next(m);
                });
                this.socket.on("error", (err) => {
                    console.log("Errore socket: " + err);
                    observer.error(err);
                });
                return () => {
                    this.socket.disconnect();
                };
            });
        }
    }
    SocketioService.ɵfac = function SocketioService_Factory(t) { return new (t || SocketioService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"])); };
    SocketioService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SocketioService, factory: SocketioService.ɵfac, providedIn: "root" });
    return SocketioService;
})();

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SocketioService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: "root"
            }]
    }], function () { return [{ type: _persona_service__WEBPACK_IMPORTED_MODULE_3__["PersonaService"] }]; }, null); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _componenti_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./componenti/login/login.component */ "JwZQ");
/* harmony import */ var _componenti_registrazione_registrazione_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./componenti/registrazione/registrazione.component */ "SnxG");
/* harmony import */ var _componenti_passworddimenticata_passworddimenticata_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./componenti/passworddimenticata/passworddimenticata.component */ "owD/");
/* harmony import */ var _componenti_modificapassword_modificapassword_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./componenti/modificapassword/modificapassword.component */ "Gfvb");
/* harmony import */ var _componenti_homepagemoderatore_homepagemoderatore_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./componenti/homepagemoderatore/homepagemoderatore.component */ "SzPC");
/* harmony import */ var _componenti_homepagestudente_homepagestudente_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./componenti/homepagestudente/homepagestudente.component */ "opZ3");
/* harmony import */ var _componenti_homepagenonloggato_homepagenonloggato_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./componenti/homepagenonloggato/homepagenonloggato.component */ "02sP");











const routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: _componenti_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: "registrazione", component: _componenti_registrazione_registrazione_component__WEBPACK_IMPORTED_MODULE_3__["RegistrazioneComponent"] },
    { path: "passworddimenticata", component: _componenti_passworddimenticata_passworddimenticata_component__WEBPACK_IMPORTED_MODULE_4__["PassworddimenticataComponent"] },
    { path: "modificapassword", component: _componenti_modificapassword_modificapassword_component__WEBPACK_IMPORTED_MODULE_5__["ModificapasswordComponent"] },
    { path: "homepagemoderatore", component: _componenti_homepagemoderatore_homepagemoderatore_component__WEBPACK_IMPORTED_MODULE_6__["HomepagemoderatoreComponent"] },
    { path: "homepagestudente", component: _componenti_homepagestudente_homepagestudente_component__WEBPACK_IMPORTED_MODULE_7__["HomepagestudenteComponent"] },
    { path: "homepagenonloggato", component: _componenti_homepagenonloggato_homepagenonloggato_component__WEBPACK_IMPORTED_MODULE_8__["HomepagenonloggatoComponent"] }
];
let AppRoutingModule = /** @class */ (() => {
    class AppRoutingModule {
    }
    AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
    AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
    return AppRoutingModule;
})();

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "vtWd":
/*!*****************************************************************************!*\
  !*** ./src/app/componenti/homepagemoderatore/functions/gestioneStudenti.ts ***!
  \*****************************************************************************/
/*! exports provided: getListaStudenti, eliminaStudente */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getListaStudenti", function() { return getListaStudenti; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eliminaStudente", function() { return eliminaStudente; });
/* harmony import */ var src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/classi/user */ "YTg5");

//funzione per estrarre la lista di utenti
function getListaStudenti() {
    //estraggo la lista di studenti
    this.us.getListaStudenti().subscribe((data) => {
        //per ciascun studente trovato
        for (var i = 0; i < data.utenti.length; ++i) {
            //lo inserisco nella lista di studenti 
            this.utenti.push(new src_app_classi_user__WEBPACK_IMPORTED_MODULE_0__["Utente"](data.utenti[i]));
        }
    }, (err) => {
        //errore estrazione lista studenti
        this.dettagliErrore.setMessage("Errore estrazione lista studenti");
        this.dettagliErrore.setReason(JSON.stringify(err));
        console.log("Errore estrazione lista studenti " + JSON.stringify(err));
    });
}
//funzione per eliminare uno studente
function eliminaStudente(idStudente) {
    //mi creo la lista di indici delle inserzioni da eliminare
    var listaIndiciInserzioni = new Array();
    //mi creo la lista di indici dei libri collegati alle inserzioni da eliminare
    var listaIndiciLibriInserzioni = new Array();
    //estraggo tutte le inserzioni
    this.is.getListaInserzioni().subscribe((data) => {
        //per ciascuna inserzione estratta
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //controllo che l utente che voglio eliminare non abbia ultime offerte nelle inserzioni altrimenti errore
            if (data.inserzioni[i].utentePrezzoAttuale === idStudente) {
                //controllo che creatore dell inserzione e dell ultima offerta non coindano 
                if (data.inserzioni[i].utentePrezzoAttuale !== data.inserzioni[i].utente) {
                    //errore eliminazione studente perche ha delle ultime offerte
                    this.dettagliErrore.setMessage("Errore eliminazione studente perche ha ultime offerte nelle inserzioni");
                    this.dettagliErrore.setReason("");
                    console.log("Errore eliminazione studente perche ha ultime offerte nelle inserzioni");
                    return;
                }
            }
        }
        //per ciascuna inserzioni
        for (var i = 0; i < data.inserzioni.length; ++i) {
            //controllo che l inserzione sia stata creata dallo studente da eliminare
            if (data.inserzioni[i].utente === idStudente) {
                //inserisco l indice dell inserzione nella lista di id
                listaIndiciInserzioni.push(data.inserzioni[i].idInserzione);
                //inserisco l id del libro nella lista degli indici da eliminare
                listaIndiciLibriInserzioni.push(data.inserzioni[i].libro);
            }
        }
        //controllo se ha delle inserzioni 
        if (listaIndiciInserzioni.length !== 0) {
            //elimino le inserzioni
            this.is.eliminaInserzione(listaIndiciInserzioni).subscribe((data) => {
                //elimino i libri
                this.ls.eliminaLibro(listaIndiciLibriInserzioni).subscribe((data) => {
                    //elimino lo studente
                    this.us.eliminaStudente(idStudente).subscribe((data) => {
                        //aggiorno i dati
                        this.aggiornaDati();
                    }, (err) => {
                        //errore eliminazione studente
                        this.dettagliErrore.setMessage("Errore eliminazione studente");
                        this.dettagliErrore.setReason(JSON.stringify(err));
                        console.log("Errore eliminazione studente " + JSON.stringify(err));
                    });
                }, (err) => {
                    //errore eliminazione libro
                    this.dettagliErrore.setMessage("Errore eliminazione libri");
                    this.dettagliErrore.setReason(JSON.stringify(err));
                    console.log("Errore eliminazione libri " + JSON.stringify(err));
                });
            }, (err) => {
                //errore eliminazione inserzione
                this.dettagliErrore.setMessage("Errore eliminazione inserzioni");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore eliminazione inserzioni " + JSON.stringify(err));
            });
        }
        //se invece l utente non ha inserzioni
        else {
            //elimino lo studente
            this.us.eliminaStudente(idStudente).subscribe((data) => {
                //aggiorno i dati
                this.aggiornaDati();
            }, (err) => {
                //errore eliminazione studente
                this.dettagliErrore.setMessage("Errore eliminazione studente");
                this.dettagliErrore.setReason(JSON.stringify(err));
                console.log("Errore eliminazione studente " + JSON.stringify(err));
            });
        }
    });
}


/***/ }),

/***/ "wlj1":
/*!*********************************!*\
  !*** ./src/app/classi/Libro.ts ***!
  \*********************************/
/*! exports provided: Libro */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Libro", function() { return Libro; });
//classe per la gestione del libro
class Libro {
    constructor(libro) {
        if (libro) {
            if (libro.idLibro)
                this.setIdLibro(libro.idLibro);
            if (libro.nome)
                this.setNome(libro.nome);
            if (libro.corsoDiStudi)
                this.setCorsoDiStudi(libro.corsoDiStudi);
            if (libro.universita)
                this.setUniversita(libro.universita);
            if (libro.autore)
                this.setAutore(libro.autore);
            if (libro.annoPubblicazione)
                this.setAnnoPubblicazione(libro.annoPubblicazione);
            if (libro.edizione)
                this.setEdizione(libro.edizione);
            if (libro.isbn)
                this.setIsbn(libro.isbn);
        }
    }
    getIdLibro() {
        return this.idLibro;
    }
    setIdLibro(idLibro) {
        this.idLibro = idLibro;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getCorsoDiStudi() {
        return this.corsoDiStudi;
    }
    setCorsoDiStudi(corsoDiStudi) {
        this.corsoDiStudi = corsoDiStudi;
    }
    getUniversita() {
        return this.universita;
    }
    setUniversita(universita) {
        this.universita = universita;
    }
    getAutore() {
        return this.autore;
    }
    setAutore(autore) {
        this.autore = autore;
    }
    getAnnoPubblicazione() {
        return this.annoPubblicazione;
    }
    setAnnoPubblicazione(annoPubblicazione) {
        this.annoPubblicazione = annoPubblicazione;
    }
    getEdizione() {
        return this.edizione;
    }
    setEdizione(edizione) {
        this.edizione = edizione;
    }
    getIsbn() {
        return this.isbn;
    }
    setIsbn(isbn) {
        this.isbn = isbn;
    }
}


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
//document.addEventListener("deviceready", () => {//aggiunto
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));
//}, false);//aggiunto


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map