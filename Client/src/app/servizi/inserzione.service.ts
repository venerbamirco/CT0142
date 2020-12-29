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

@Injectable({
  providedIn: "root"
})
export class InserzioneService {

  //variabile per memorizzare l url del server
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private us: PersonaService) { }

  //funzione che inserisce un inserzione
  public inserisciInserzione(inserzioneDaInserire: Inserzione): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.put(this.url + "/inserzioni", inserzioneDaInserire, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per estrarre la lista di inserzioni create dall utente loggato
  public getListaInserzioniPartecipate(listaIdInserzioni: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idInserzione", listaIdInserzioni.toString())
    };
    return this.http.get(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per estrarre la lista di inserzioni create dall utente loggato
  public getListaInserzioniCreateProposte(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("username", this.us.getUsername())
    };
    return this.http.get(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per estrarre la lista di inserzioni in vendita
  public getListaInserzioniInVendita(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per fare una nuova offerta all inserzione in vendita
  public nuovaOfferta(nuovaOfferta: Offerta): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.post(this.url + "/inserzioni", { idInserzione: nuovaOfferta.getIdInserzione(), idUser: this.us.getIdUtente(), nuovaOfferta: nuovaOfferta.getNuovaOfferta() }, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per estrarre la lista di tutte le inserzioni
  public getListaInserzioni(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per eliminare delle inserzioni
  public eliminaInserzione(idInserzioni: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idInserzione", idInserzioni.toString())
    };
    return this.http.delete(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per modificare l inserzione
  public modificaInserzione(inserzione: Inserzione): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.patch(this.url + "/inserzioni", inserzione, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per avere le inserzioni filtrate
  public filtraInserzioni(filtraggio: any): Observable<any> {
    var params = new HttpParams();
    //aggiungo i campi alla richiesta solo se necessari
    if (filtraggio.nomeLibro1 !== "") params = params.append("nomeLibro", filtraggio.nomeLibro)
    if (filtraggio.corsoDiStudi !== "") params = params.append("corsoDiStudi", filtraggio.corsoDiStudi)
    if (filtraggio.universita !== "") params = params.append("universita", filtraggio.universita)
    if (filtraggio.areaGeografica !== "") params = params.append("areaGeografica", filtraggio.areaGeografica)
    if (filtraggio.venditore !== "") params = params.append("username", filtraggio.venditore)
    if (filtraggio.prezzoAttualeMinimo !== "") params = params.append("prezzoAttualeMinimo", filtraggio.prezzoAttualeMinimo)
    if (filtraggio.prezzoAttualeMassimo !== "") params = params.append("prezzoAttualeMassimo", filtraggio.prezzoAttualeMassimo)
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: params
    };
    return this.http.get(this.url + "/inserzioni", options).pipe(
      tap((data) => {
      })
    );
  }
}
