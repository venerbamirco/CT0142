import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonaService } from "../../servizi/persona.service";

import { Utente } from "../../classi/user";

@Component({
  selector: 'app-modificapassword',
  templateUrl: './modificapassword.component.html',
  styleUrls: ['./modificapassword.component.css']
})
export class ModificapasswordComponent implements OnInit {

  //variabile per accedere allo schema utente per estrarre i dati dal login
  u: Utente = new Utente();

  //messaggi che possono comparire durante l uso del form di login
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  constructor(private us: PersonaService, private router: Router) { }

  ngOnInit(): void {
  }

  //funzione per cambiare la password temporanea
  public cambiaPassword(): void {
    //creo un utente temporaneo tramite la decodifica del token
    var uTemp: Utente = new Utente(JSON.parse(atob(this.us.getToken().split('.')[1])));
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
