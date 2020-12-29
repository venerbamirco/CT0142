import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonaService } from "../../servizi/persona.service";

import { Utente } from "../../classi/user";

@Component({
  selector: "app-passworddimenticata",
  templateUrl: "./passworddimenticata.component.html",
  styleUrls: ["./passworddimenticata.component.css"]
})
export class PassworddimenticataComponent implements OnInit {

  //variabile per prelevare i dati dal form sfruttando oggetto utente
  u: Utente = new Utente();

  //eventuali messaggi da stampare
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  constructor(private us: PersonaService, private router: Router) { }

  ngOnInit(): void {
  }

  //funzione per resettare la password
  public resettaPassword(): void {
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
