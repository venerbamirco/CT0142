import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Utente } from "../../classi/user";
import { Inserzione } from "../../classi/inserzione";
import { Libro } from '../../classi/Libro';
import { Errore } from "src/app/classi/errore";

import { LibroService } from 'src/app/servizi/libro.service';
import { StatisticheService } from "src/app/servizi/statistiche.service";
import { PersonaService } from "../../servizi/persona.service";
import { InserzioneService } from "../../servizi/inserzione.service";

import * as aggiornamentoDati from "./functions/aggiornamentoDati";
import * as gestioneFiltro from "./functions/gestioneFiltro";
import * as gestioneInserzioni from "./functions/gestioneInserzioni";
import * as gestioneLogout from "./functions/gestioneLogout";
import * as gestioneModeratore from "./functions/gestioneModeratore";
import * as gestioneStatistiche from "./functions/gestioneStatistiche";
import * as gestioneStudenti from "./functions/gestioneStudenti";
import * as gestioneToken from "./functions/gestioneToken";
import * as inizializzazione from "./functions/inizializzazione";


@Component({
  selector: 'app-homepagemoderatore',
  templateUrl: './homepagemoderatore.component.html',
  styleUrls: ['./homepagemoderatore.component.css']
})
export class HomepagemoderatoreComponent implements OnInit {

  //variabile per filtrare i dati delle inserzioni
  filtraggioInserzioni = { "nomeLibro": "", "corsoDiStudi": "", "universita": "", "areaGeografica": "", "venditore": "", "prezzoAttualeMinimo": "", "prezzoAttualeMassimo": "" };

  //variabile per accedere allo schema inserzione 
  inserzione: Inserzione = new Inserzione();

  //variabile per accedere allo schema del libro
  libro: Libro = new Libro();

  //variabile per accedere allo schema dell utente che ha creato l inserzione
  utenteInserzioneCreata: Utente = new Utente();

  //variabile per accedere allo schema dell utente che ha fatto l ultima proposta all inserzione
  utenteInserzioneUltimaOfferta: Utente = new Utente();

  //variabile per memorizzare il nuovo moderatore
  moderatore: Utente = new Utente();

  //variabile per accedere alla lista di tutti gli studenti
  utenti: Utente[] = new Array();

  //variabile per accedere alla lista di tutte le inserzioni
  inserzioni: Inserzione[] = new Array();

  //variabile per accedere alla lista di libri associati a tutte le inserzioni
  libri: Libro[] = new Array();

  //varibaile per memorizzare le statistiche e quindi array di 3 posizioni
  statistiche: number[] = new Array();

  //messaggi che possono comparire durante l uso del form di login
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  //variabile per la gestione degli errori
  dettagliErrore: Errore = new Errore();

  constructor(private us: PersonaService, private is: InserzioneService, private ls: LibroService, private ss: StatisticheService, private router: Router) { }

  //-----------------------------------------INIZIALIZZAZIONE------------------------------------

  ngOnInit(): void {
    //recupero i dati dell utente dal token altrimenti bisgona rifare il login
    this.recuperaDatiUtenteToken();
  }

  //-----------------------------------------RECUPERO TOKEN ACCESSO------------------------------------

  //funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
  public recuperaDatiUtenteToken = gestioneToken.recuperaDatiUtenteToken;

  //-----------------------------------------AGGIORNAMENTO DATI------------------------------------

  //funzione per aggiornare tutti i dati
  public aggiornaDati = aggiornamentoDati.aggiornaDati;

  //-----------------------------------------GESTIONE FILTRO------------------------------------

  //funzione per vedere se il filtro e attivato o disattivato
  public verificaFiltro = gestioneFiltro.verificaFiltro;

  //funzione per annullare il filtro
  public annullaFiltro = gestioneFiltro.annullaFiltro;

  //funzione per filtrare le inserzioni in vendita
  public filtraInserzioni = gestioneFiltro.filtraInserzioni;

  //-----------------------------------------GESTIONE INSERZIONI------------------------------------

  //funzione per ottenere tutte le inserzioni dato che sono un moderatore
  public getListaInserzioni = gestioneInserzioni.getListaInserzioni;

  //funzione per settare l inserzione che il moderatore ha selezionato dall elenco
  public setInserzioneSelezionata = gestioneInserzioni.setInserzioneSelezionata;

  //funzione per eliminare un inserzione
  public eliminaInserzione = gestioneInserzioni.eliminaInserzione;

  //funzione per modificare i dati dell inserzione
  public modificaInserzione = gestioneInserzioni.modificaInserzione;

  //-----------------------------------------GESTIONE STUDENTI------------------------------------

  //funzione per estrarre la lista di utenti
  public getListaStudenti = gestioneStudenti.getListaStudenti;

  //funzione per eliminare uno studente
  public eliminaStudente = gestioneStudenti.eliminaStudente;

  //-----------------------------------------GESTIONE MODERATORE------------------------------------

  //funzione per inserire il nuovo moderatore
  public inserisciModeratore = gestioneModeratore.inserisciModeratore;

  //-----------------------------------------GESTIONE STATISTICHE------------------------------------

  //funzione per estrarre le statistiche
  public getStatistiche = gestioneStatistiche.getStatistiche;

  //-----------------------------------------GESTIONE LOGOUT------------------------------------

  //funzione per effettuare il logout
  public logout = gestioneLogout.logout;

}
