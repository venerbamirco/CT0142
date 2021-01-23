import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { tap } from "rxjs/operators";

//classi
import { PersonaService } from './persona.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {

  //variabile per memorizzare l url del server
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient, private us: PersonaService) { }

  //funzione per estrarre le statistiche
  public getStatistiche(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        "authorization": "Bearer " + this.us.getToken(),
        "cache-control": "no-cache",
        "Content-Type": "application/json"
      })
    };
    return this.http.get(this.url + "/statistiche", options).pipe(
      tap((data) => {
      })
    );
  }
}
