import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonaService } from "../../servizi/persona.service";

import { Utente } from "../../classi/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {

  //variabile per accedere allo schema utente per estrarre i dati dal login
  u: Utente = new Utente();

  //messaggi che possono comparire durante l uso del form di login
  messaggioErrore = undefined;
  messaggioConferma = undefined;
  messaggio = undefined;

  constructor(private us: PersonaService, private router: Router) { }

  ngOnInit(): void {
  }

  //funzione per richiamare la funzione login del servizio
  public login(): void {
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
