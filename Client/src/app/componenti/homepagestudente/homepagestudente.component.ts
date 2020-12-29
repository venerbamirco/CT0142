import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Offerta } from "../../classi/offerta";
import { Utente } from "../../classi/user";
import { Inserzione } from "../../classi/inserzione";
import { Libro } from '../../classi/Libro';
import { Errore } from "src/app/classi/errore";

import { LibroService } from 'src/app/servizi/libro.service';
import { Messaggio } from 'src/app/classi/messaggio';
import { MessaggioService } from 'src/app/servizi/messaggio.service';
import { SocketioService } from "src/app/servizi/socketio.service";
import { PersonaService } from "../../servizi/persona.service";
import { InserzioneService } from "../../servizi/inserzione.service";

import * as gestioneFiltro from "./functions/gestioneFiltro";
import * as gestioneInvioMessaggio from "./functions/gestioneInvioMessaggio";
import * as gestioneLayoutChat from "./functions/gestioneLayoutChat";
import * as gestioneListaStudentiChattato from "./functions/gestioneListaStudentiChattato";
import * as gestioneLogout from "./functions/gestioneLogout";
import * as gestioneSelezioneInserzioni from "./functions/gestioneSelezioneInserzioni";
import * as gestioneSocket from "./functions/gestioneSocket";
import * as gestioneTipologiaChatSelezionata from "./functions/gestioneTipologiaChatSelezionata";
import * as gestioneTipologieChat from "./functions/gestioneTipologieChat";
import * as gestioneToken from "./functions/gestioneToken";
import * as inizializzazione from "./functions/inizializzazione";
import * as gestioneInserzione from "./functions/gestioneInserzione";
import * as nuovaOffertaInserzione from "./functions/nuovaOffertaInserzione";
import * as utility from "./functions/utility";
import * as getInserzioniPerTipologia from "./functions/getInserzioniPerTipologia";

@Component({
  selector: "app-homepagestudente",
  templateUrl: "./homepagestudente.component.html",
  styleUrls: ["./homepagestudente.component.css"]
})
export class HomepagestudenteComponent implements OnInit {

  //variabile per filtrare i dati delle inserzioni
  filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };

  //variabile per memorizzare la nuova offerta
  nuovaOfferta: Offerta = new Offerta();

  //variabile per accedere allo schema inserzione 
  inserzione: Inserzione = new Inserzione();

  //variabile per accedere allo schema del libro
  libro: Libro = new Libro();

  //variabile per accedere allo schema dell utente
  utente: Utente = new Utente();

  //variabile per accedere allo schema dell utente loggato
  utenteLoggato: Utente = new Utente();

  //variabile per accedere alla lista di inserzioni create
  inserzioniCreate: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri creati
  libriCreati: Libro[] = new Array();

  //variabile per accedere alla lista di inserzioni dove l utente attuale ha fatto una proposta che corrisponde a quella attuale
  inserzioniOfferteFatte: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri nelle inserzioni dove ho fatto le offerte
  libriOfferte: Libro[] = new Array();

  //variabile per accedere alla lista di inserzioni che l utente ha vinto
  inserzioniVinte: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri nelle inserzioni che ho vinto
  libriVinti: Libro[] = new Array();

  //variabile per accedere alla lista di inserzioni in vendita e quindi che non risultano essere nelle due liste precedenti
  inserzioniInVendita: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri nelle inserzioni in vendita
  libriInVendita: Libro[] = new Array();

  //variabile per accedere alla lista delle inserzioni partecipate
  inserzioniPartecipate: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri delle inserzioni partecipate
  libriPartecipate: Libro[] = new Array();

  //variabile per accedere alla lista delle inserzioni vendute
  inserzioniVendute: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri delle inserzioni vendute
  libriVenduti: Libro[] = new Array();

  //variabile per memorizzare la lista di studenti che l utente loggato ha chattato insieme
  studentiConChat: Utente[] = new Array();

  //variabile per memorizzare i messaggi
  listaMessaggi: Messaggio[] = new Array();

  //variabile per memorizzare il nome e cognome del destinatario della chat selezionata
  destinatarioMessaggiChatSelezionata: string = "";

  //varibaile per accedere all id del destinatario del messaggio
  idUtenteDestinazione: number = 0;

  //variabile per memorizzare la lista di persone quando estraggo tutti i messaggi rispetto ad una certa categoria privata pubblica persona ecc
  listaPersoneMessaggi: Utente[] = new Array();

  //variabile per memorizzare il messaggio d riferimento prima di inviarlo
  messaggioRiferimento: Messaggio = new Messaggio();

  //variabile per memorizzare il messaggio da inviare
  messaggioDaInviare: Messaggio = new Messaggio();

  //flag per sapere quale tipo di chat l utente loggato ha selezionato
  chatSingolaPersona: boolean;
  chatPrivataInserzione: boolean;
  chatPubblicaInserzione: boolean;

  //messaggi che possono comparire durante l uso del form di login
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  //variabile per memorizzare id persona che l utente sta chattando insieme
  idPersonaChatAttuale: number;

  //variabile per memorizzare il messaggio appena arrivato tramite il socket
  messaggioAppenaArrivato: string = "";

  //variabile per memorizzare l utente del nuovo messaggio
  utenteMessaggioAppenaArrvato: string = "";

  //variabile per la gestione degli errori
  dettagliErrore: Errore = new Errore();

  constructor(private ss: SocketioService, private us: PersonaService, private is: InserzioneService, private ls: LibroService, private ms: MessaggioService, private router: Router) { }

  //-------------------------------------------------------------------------------------

  ngOnInit(): void {
    //recupero i dati dell utente dal token altrimenti bisgona rifare il login
    this.recuperaDatiUtenteToken();
  }

  //-----------------------------------------GESTIONE TOKEN--------------------------------------------

  //funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
  public recuperaDatiUtenteToken = gestioneToken.recuperaDatiUtenteToken;

  //-----------------------------------------INIZIALIZZAZIONE--------------------------------------------

  //funzione per init 
  public initDati = inizializzazione.initDati;

  //funzione per aggiornare i dati
  public recuperaDatiAggiornati = inizializzazione.recuperaDatiAggiornati;

  //funzione per inizializzazione variabili
  public azzeramentoVariabili = inizializzazione.azzeramentoVariabili;

  //-----------------------------------------GESTIONE SOCKET---------------------------------------

  //configurazione socket
  public configurazioneSocket = gestioneSocket.configurazioneSocket;

  //-----------------------------------------GESTIONE FILTRO--------------------------------------------

  //funzione per vedere se il filtro e attivato o disattivato
  public verificaFiltro = gestioneFiltro.verificaFiltro;

  //funzione per annullare il filtro
  public annullaFiltro = gestioneFiltro.annullaFiltro;

  //funzione per filtrare le inserzioni in vendita
  public filtraInserzioni = gestioneFiltro.filtraInserzioni;

  /*-----------------------------------------OTTENERE LISTA INSERZIONI DIVISE PER TIPOLOGIA--------------------------------------------*/

  //funzione per ottenere tutte le inserzioni create e quelle dove ce una proposta e quelle vinte
  public getListaInserzioniCreateProposte = getInserzioniPerTipologia.getListaInserzioniCreateProposte;

  //funzione per ottenere tutte le inserzioni che l utente loggato ha partecipato
  public getListaInserzioniPartecipate = getInserzioniPerTipologia.getListaInserzioniPartecipate;

  //funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
  public getListaInserzioniInVendita = getInserzioniPerTipologia.getListaInserzioniInVendita;

  //funzione per ottenere tutte le inserzioni vendute
  public getListaInserzioniVendute = getInserzioniPerTipologia.getListaInserzioniVendute;

  //-------------------------------SELEZIONARE INSERZIONE PER CIASCUNA TIPOLOGIA----------------------------------

  //funzione per settare l inserzione vinta che l utente ha selezionato dall elenco
  public setInserzioneVintaSelezionata = gestioneSelezioneInserzioni.setInserzioneVintaSelezionata;

  //funzione per settare l inserzione partecipata dall elenco
  public setInserzionePartecipataSelezionata = gestioneSelezioneInserzioni.setInserzionePartecipataSelezionata;

  //funzione per settare l inserzione creata che l utente ha selezionato dall elenco
  public setInserzioneCreataSelezionata = gestioneSelezioneInserzioni.setInserzioneCreataSelezionata;

  //funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
  public setInserzioneInVenditaSelezionata = gestioneSelezioneInserzioni.setInserzioneInVenditaSelezionata;

  //funzione per settare l inserzione venduta che l utente loggato ha premuto per visualizzare i dettagli
  public setInserzioneVendutaSelezionata = gestioneSelezioneInserzioni.setInserzioneVendutaSelezionata;

  /*----------------------------------INSERIMENTO NUOVA INSERZIONE-------------------------------------*/

  //funzione per inizializzare inserzione e libro in quanto ne devo inserire una nuova e devo azzerare i campi
  public inizializzaNuovaInserzione = gestioneInserzione.inizializzaNuovaInserzione;

  //funzione per inserire una nuova inserzione
  public inserisciInserzione = gestioneInserzione.inserisciInserzione;

  //funzione per eliminare un inserzione
  public eliminaInserzione = gestioneInserzione.eliminaInserzione;

  /*----------------------------------GESTIONE INVIO NUOVO MESSAGGIO-------------------------------------*/

  //funzione per inviare il messaggio
  public inviaMessaggio = gestioneInvioMessaggio.inviaMessaggio;

  //funzione per impostare l id dell messaggio di riferimento prima di inviarlo
  public setMessaggioRiferimento = gestioneInvioMessaggio.setMessaggioRiferimento;

  //funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
  public getContenutoMessaggioRiferimento = gestioneInvioMessaggio.getContenutoMessaggioRiferimento;

  /*----------------------------------GESTIONE LISTA UTENTI CHE L UTENTE HA CHATTATO INSIEME-------------------------------------*/

  //funzione per selezionare gli utenti che l utente loggato ha chattato ordinato per date decrescenti
  public getListaUtentiChat = gestioneListaStudentiChattato.getListaUtentiChat;

  /*----------------------------------GESTIONE LAYOUT CHAT MESSAGGI-------------------------------------*/

  //funzione per vedere se in un determinato messaggio l utente loggato sia il mittente
  public isMittente = gestioneLayoutChat.isMittente;

  //funzione per vedere se in un determinato messaggio l utente loggato sia il destinatario
  public isDestinatario = gestioneLayoutChat.isDestinatario;

  //funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
  public getPersonaNellaChat = gestioneLayoutChat.getPersonaNellaChat;

  /*----------------------------------GESTIONE LOGOUT-------------------------------------*/

  //funzione per effettuare il logout e reindirizzati alla pagina di login
  public logout = gestioneLogout.logout;

  /*----------------------------------GESTIONE NUOVA OFFERTA INSERZIONE-------------------------------------*/

  //funzione per fare una nuova offerta all inserzione selezionata
  public nuovaOffertaSelezionata = nuovaOffertaInserzione.nuovaOffertaSelezionata;

  /*----------------------------------GESTIONE BOTTONI CHAT PERSONA, PRIVATA E PUBBLICA-------------------------------------*/

  //funzione per verificare se un utente e gia dentro alla lista
  public isUtentePresente = gestioneTipologieChat.isUtentePresente;

  //funzione per la lista dei messaggi rispetto ad una certa persona
  public getListaMessaggiPersona = gestioneTipologieChat.getListaMessaggiPersona;

  //funzione per la lista dei messaggi sulla chat privata presente nell popup dell inserzione
  public getListaMessaggiInserzioneChatPrivata = gestioneTipologieChat.getListaMessaggiInserzioneChatPrivata;

  //funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
  public getListaMessaggiInserzioneChatPubblica = gestioneTipologieChat.getListaMessaggiInserzioneChatPubblica;

  /*----------------------------------GESTIONE TIPOLOGIA CHAT SELEZIONATA-------------------------------------*/

  //funzione per azzerare i flag delle chat
  public azzeramentoFlagChat = gestioneTipologiaChatSelezionata.azzeramentoFlagChat;

  //funzione per usare la chat singola persona
  public setChatSingolaPersona = gestioneTipologiaChatSelezionata.setChatSingolaPersona;

  //funzione per usare la chat privata dell inserzione
  public setChatPrivataInserzione = gestioneTipologiaChatSelezionata.setChatPrivataInserzione;

  //funzione per usare la chat pubblica dell inserzione
  public setChatPubblicaInserzione = gestioneTipologiaChatSelezionata.setChatPubblicaInserzione;

  /*----------------------------------UTILITY O MAI USATE-------------------------------------*/

  //funzione per ottenre il messaggio dall id
  public getMessaggioById = utility.getMessaggioById;

  //funzione per ottenere la lista dei libri associati alle varie inserzioni
  public getLibriAssociatiInserzioni = utility.getLibriAssociatiInserzioni;

  //funzione per vedere se una data e gia scaduta
  public isScaduta = utility.isScaduta;

  //funzione per vedere se la lista di utenti è vuota
  public isVuota = utility.isVuota;
}
