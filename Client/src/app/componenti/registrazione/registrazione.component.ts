import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonaService } from "../../servizi/persona.service";

import { Utente } from "../../classi/user";

@Component( {
  selector: "app-registrazione",
  templateUrl: "./registrazione.component.html",
  styleUrls: [ "./registrazione.component.css" ]
} )
export class RegistrazioneComponent implements OnInit {

  //variabile per prelevare i dati dal form sfruttando oggetto utente
  user: Utente = new Utente();

  //eventuali messaggi da stampare
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  constructor ( private us: PersonaService, private router: Router ) { }

  ngOnInit (): void {
  }

  //funzione per verificare che i dati del form di registrazione siano corretti
  private controlliRegistrazione (): boolean {
    //verifico che la password e conferma password coincidano
    if ( this.user.password === this.user.confermaPassword ) {
      return true;
    }
    else {
      return false;
    }
  }

  //funzione per effettuare la registrazione tramite la chiamata del servizio
  public registrazione (): void {
    //imposto i parametri mancanti come le aste partecipate settate ad array vuoto perche devo ancora fare nessuna inserzione partecipata
    this.user.setAstePartecipate( [] );
    if ( !this.controlliRegistrazione() ) {
      this.messaggioErrore = "Password e conferma password diversi";
      this.messaggioConferma = undefined;
      this.messaggio = undefined;
      return;
    }
    this.us.registrazione( this.user ).subscribe( ( d ) => {
      this.messaggioErrore = undefined;
      this.messaggioConferma = "Registrazione effettuata";
      this.messaggio = undefined;
      //this.router.navigate( [ "/login" ] );
    }, ( err ) => {
      this.messaggioErrore = err.error.errormessage || err.error.message;
    } );
  }

}
