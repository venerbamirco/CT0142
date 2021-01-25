import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";

//classi
import { Utente } from "../classi/user";

@Injectable({
  providedIn: "root"
})
export class PersonaService {

  //variabile per memorizzare l id dell utente loggato
  private idUtente: number = 0;

  //variabile per memorizzare lo username dell utente loggato
  private username: string = "";

  //variabile per memorizzare il token di accesso dell utente
  private token: string = "";

  //variabile per memorizzare l url del server
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  //metodo per sistemare tutti i parametri dal token
  setPrametriToken(token: string): void {
    var dati = JSON.parse(token);
    this.idUtente = dati.idUser;
    this.username = dati.username;
  }

  //metodo getter per estrarre il token di accesso
  getToken(): string {
    return this.token;
  }

  //metodo getter per estrarre lo username dell utente loggato
  getUsername(): string {
    return this.username;
  }

  //metodo getter per estrarre l url di connessione
  getUrl(): string {
    return this.url;
  }

  //meetodo getter per avere l id dell utente loggato
  getIdUtente(): number {
    return this.idUtente;
  }

  //funzione per eliminare gli studenti
  public eliminaStudente(idStudente: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idUtente", idStudente.toString())
    };
    return this.http.delete(this.url + "/studenti", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per estrarre la lista di studenti
  public getListaStudenti(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.url + "/studenti", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per inserire un nuovo moderatore
  public inserisciModeratore(moderatore: Utente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.put(this.url + "/moderatori", moderatore, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per ottenere l utente dall id per vedere i dettagli nel popup dell inserzione
  public getUtenteByUsername(username: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("username", username)
    };
    return this.http.get(this.url + "/studenti", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per ottenere l utente dallo username
  public getUtenteById(idUtente: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idUser", idUtente.toString())
    };
    return this.http.get(this.url + "/studenti", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che fa la richiesta http per effettuare il login
  public login(u: Utente): Observable<any> {
    //creo header per chiamata http
    const options = {
      headers: new HttpHeaders({
        authorization: "Basic " + btoa(u.username + ":" + u.password),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    //faccio richiesta http metodo get per effettuare il login
    return this.http.get(this.url + "/login", options).pipe(
      tap((data) => {
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
  public resettaPassword(persona: Utente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.post(this.url + "/studenti", persona, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che cambia la password
  public cambiaPasswordStudente(persona: Utente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.token,
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.patch(this.url + "/studenti", persona, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che cambia la password
  public cambiaPasswordModeratore(persona: Utente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.token,
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.patch(this.url + "/moderatori", persona, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che fa la richiesta http per effettuare la registrazione
  public registrazione(persona: Utente): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.put(this.url + "/studenti", persona, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che fa la richiesta http per effettuare il rinnovo del token però non implementata ma solo impostata
  public rinnovoToken(): Observable<any> {
    const tk = localStorage.getItem("progetto_token");
    if (!tk || tk.length < 1) {
      return throwError({ error: { errormessage: "Errore trovare token nel localStorage" } });
    }
    const options = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + tk,
        "cache-control": "no-cache",
        "Content-Type": "application/json",
      })
    };
    return this.http.get(this.url + "/renew", options).pipe(
      tap((data) => {
        this.token = data.token;
        localStorage.setItem("progetto_token", this.token);
      }));
  }

  //funzione per ottenere il token
  public setToken(): void {
    this.token = localStorage.getItem("progetto_token");
  }

  //funzione per effettuare il logout
  public logout(): void {
    this.token = "";
    localStorage.setItem("progetto_token", this.token);
  }

}
