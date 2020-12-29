import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { PersonaService } from './persona.service';
import { Libro } from '../classi/Libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  //variabile per memorizzare l url del server
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private us: PersonaService) { }

  //funzione per ottenere l id del libro piu alto e quindi l ultimo aggiunto
  public getUltimoLibroInserito(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.url + "/libri", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per modificare i dati del libro
  public modificaLibro(libro: Libro): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.patch(this.url + "/libri", libro, options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per ottenere il libro dall id per vedere i dettagli nel popup dell inserzione
  public getLibroById(idLibro: number): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idLibro", idLibro.toString())
    };
    return this.http.get(this.url + "/libri", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione per eliminare il libro collegato ad un inserzione
  public eliminaLibro(idLibro: number[]): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      }),
      params: new HttpParams().append("idLibro", idLibro.toString())
    };
    return this.http.delete(this.url + "/libri", options).pipe(
      tap((data) => {
      })
    );
  }

  //funzione che inserisce un libro
  public inserisciLibro(libroDaInserire: Libro): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.put(this.url + "/libri", libroDaInserire, options).pipe(
      tap((data) => {
      })
    );
  }
}
