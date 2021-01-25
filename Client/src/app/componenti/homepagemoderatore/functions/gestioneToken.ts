import { Utente } from "src/app/classi/user";

//funzione per recuperare i dati dell utente memorizzato sul token, altrimenti login
export function recuperaDatiUtenteToken(): void {
    //recupero dallo storage il token
    this.us.setToken();
    //recupero il token e controllo che se e vuoto effettuo il redirect
    if (this.us.getToken() === "") {
      this.router.navigate(["/login"]);
    }
    //altrimenti se non e vuoto
    else {
      //decodifico il token in stringa
      var tokenstring: string = atob(this.us.getToken().split('.')[1]);
      //creo un utente temporaneo con i dati del token
      let utenteTemp = new Utente(JSON.parse(tokenstring));
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