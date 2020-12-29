import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Errore } from 'src/app/classi/errore';
import { Inserzione } from 'src/app/classi/inserzione';
import { Libro } from 'src/app/classi/Libro';
import { Messaggio } from 'src/app/classi/messaggio';
import { Utente } from 'src/app/classi/user';

import { InserzioneService } from 'src/app/servizi/inserzione.service';
import { LibroService } from 'src/app/servizi/libro.service';
import { MessaggioService } from 'src/app/servizi/messaggio.service';
import { PersonaService } from 'src/app/servizi/persona.service';

import * as gestioneFiltroInserzioni from "./functions/gestioneFiltroInserzioni";
import * as gestioneInserzioni from "./functions/gestioneInserzioni";
import * as gestioneChat from "./functions/gestioneChat";
import * as gestioneLoginRegistrazione from "./functions/gestioneLoginRegistrazione";
import * as utility from "./functions/utility";

@Component({
  selector: 'app-homepagenonloggato',
  templateUrl: './homepagenonloggato.component.html',
  styleUrls: ['./homepagenonloggato.component.css']
})
export class HomepagenonloggatoComponent implements OnInit {

  //variabile per filtrare i dati delle inserzioni
  filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };

  //variabile per accedere allo schema inserzione 
  inserzione: Inserzione = new Inserzione();

  //variabile per accedere allo schema del libro
  libro: Libro = new Libro();

  //variabile per accedere allo schema dell utente
  utente: Utente = new Utente();

  //variabile per accedere alla lista di inserzioni in vendita
  inserzioniInVendita: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri in vendita
  libriInVendita: Libro[] = new Array();

  //variabile per memorizzare id persona che l utente sta chattando insieme
  idPersonaChatAttuale: number;

  //variabile per memorizzare il messaggio appena arrivato tramite il socket
  messaggioAppenaArrivato: string = "";

  //variabile per memorizzare l utente del nuovo messaggio
  utenteMessaggioAppenaArrvato: string = "";

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

  //variabile per la gestione degli errori
  dettagliErrore: Errore = new Errore();

  constructor(private ms: MessaggioService, private us: PersonaService, private is: InserzioneService, private ls: LibroService, private router: Router) { }

  //----------------------------------------------GESTIONE INIZIALIZZAZIONE----------------------------------------

  ngOnInit(): void {
    //azzero le variabili
    this.dettagliErrore.setMessage("");
    this.dettagliErrore.setReason("");
    //recupero le inserzioni in vendita
    this.recuperaDatiAggiornati();
  }

  //----------------------------------------------GESTIONE FILTRO----------------------------------------

  //funzione per vedere se il filtro e attivato o disattivato
  public verificaFiltro = gestioneFiltroInserzioni.verificaFiltro;

  //funzione per annullare il filtro
  public annullaFiltro = gestioneFiltroInserzioni.annullaFiltro;

  //funzione per aggiornare i dati
  public recuperaDatiAggiornati = gestioneFiltroInserzioni.recuperaDatiAggiornati;

  //funzione per filtrare le inserzioni in vendita
  public filtraInserzioni = gestioneFiltroInserzioni.filtraInserzioni;

  //----------------------------------------------GESTIONE LISTA INSERZIONI----------------------------------------

  //funzione per ottenere tutte le inserzioni in vendita e quindi non scadute
  public getListaInserzioniInVendita = gestioneInserzioni.getListaInserzioniInVendita;

  //----------------------------------------------GESTIONE SELEZIONARE INSERZIONE----------------------------------------

  //funzione per settare l inserzione in vendita che l utente loggato ha premuto per visualizzare i dettagli
  public setInserzioneInVenditaSelezionata = gestioneInserzioni.setInserzioneInVenditaSelezionata;

  //------------------------------------------------GESTIONE CHAT----------------------------------------------

  //funzione per ottenere il messaggio di riferimento rispetto ad un messaggio dato in input
  public getContenutoMessaggioRiferimento = gestioneChat.getContenutoMessaggioRiferimento;

  //funzione per ottenere l utente appartenente alla lista di quelli appartenenti alla chat tramite id
  public getPersonaNellaChat = gestioneChat.getPersonaNellaChat;

  //funzione per la lista dei messaggi sulla chat pubblica presente nell popup dell inserzione
  public getListaMessaggiInserzioneChatPubblica = gestioneChat.getListaMessaggiInserzioneChatPubblica;

  //------------------------------------------------GESTIONE UTILITY----------------------------------------------

  //funzione per verificare se un utente e gia dentro alla lista
  public isUtentePresente = utility.isUtentePresente;

  //--------------------------------------------GESTIONE LOGINE REGISTRAZIONE-------------------------------------

  //funzione per il reindirizzamento nella pagina del login
  public effettuaLogin = gestioneLoginRegistrazione.effettuaLogin;

  //funzione per il reindirizzamento nella pagina della registrazione
  public effettuaRegistrazione = gestioneLoginRegistrazione.effettuaRegistrazione;

}
