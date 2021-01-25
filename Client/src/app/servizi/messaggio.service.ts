import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";

import { PersonaService } from "../servizi/persona.service";

//classi
import { Utente } from "../classi/user";
import { Inserzione } from '../classi/inserzione';
import { Libro } from '../classi/Libro';
import { URLSearchParams } from 'url';
import { Offerta } from '../classi/offerta';
import { Messaggio } from "../classi/messaggio";

@Injectable({
  providedIn: 'root'
})
export class MessaggioService {

  //variabile per memorizzare l url del server
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private us: PersonaService) { }

  //funzione per estrarre la lista di messaggi dato un mittente e un destinatario
  public getListaMessaggi(mittente: number, destinatario: number, inserzione: number): Observable<any> {
    //creo la lista dei parametri da passare nella richiesta http
    var params = new HttpParams();
    //aggiungo i parametri dinamicamente solo se richiesti
    if (mittente) params = params.append("mittente", mittente.toString());
    if (destinatario != null) params = params.append("destinatario", destinatario.toString());
    if (inserzione) params = params.append("idInserzione", inserzione.toString());
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params
    };
    return this.http.get(this.url + "/messaggi", options).pipe(
      tap((data) => {

      })
    );
  }

  //funzione per eliminare dei messaggi sfruttando diversi parametri
  public eliminaMessaggi(idMessaggio: number[], idInserzione: number[], idUtente: number[]): Observable<any> {
    //creo la lista dei parametri da passare nella richiesta http
    var params = new HttpParams();
    //aggiungo i parametri dinamicamente solo se richiesti
    if (idMessaggio) params = params.append("idMessaggio", idMessaggio.toString());
    if (idInserzione) params = params.append("idInserzione", idInserzione.toString());
    if (idUtente) params = params.append("idUtente", idUtente.toString());
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params
    };
    return this.http.delete(this.url + "/messaggi", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per inviare un messaggio
  public inviaMessaggio(messaggio: Messaggio): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.put(this.url + "/messaggi", messaggio, options).pipe(
      tap((data) => {
      })
    );
  }

}
