import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
  ResponseAccountDetails,
  ResponseCreateRequestToken,
  ResponseCreateSession,
  ResponseDeleteSession,
} from "../interfaces/authorization.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login() {
    let requestToken: string;
    this.createRequestToken().subscribe((token) => {
      if (token.success) {
        requestToken = token.request_token;
        this.createSession(requestToken);
        window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=https://nmdbii.web.app/auth/login`; //!Cambiar ip por nombre de pagina web
      } else {
        console.log("Error al pedir o recoger el token de logueo");
      }
    });
  }
  logout() {
    this.deleteSession(localStorage.getItem("sessionId") as string).subscribe();
    localStorage.removeItem("sessionId");
    localStorage.removeItem("accountId");
  }

  createRequestToken(): Observable<ResponseCreateRequestToken> {
    return this.http.get<ResponseCreateRequestToken>(
      `${environment.movieDB.apiBaseUrl}/authentication/token/new?api_key=${environment.movieDB.apiKey}`
    );
  }
  createSession(requestToken: string): Observable<ResponseCreateSession> {
    return this.http.post<ResponseCreateSession>(
      `${environment.movieDB.apiBaseUrl}/authentication/session/new?api_key=${environment.movieDB.apiKey}`,
      { request_token: requestToken }
    );
  }
  deleteSession(sessionId: string): Observable<ResponseDeleteSession> {
    return this.http.request<ResponseDeleteSession>(
      "delete",
      `${environment.movieDB.apiBaseUrl}/authentication/session?api_key=${environment.movieDB.apiKey}`,
      {
        body: {
          session_id: sessionId,
        },
      }
    );
  }
  getAccountDetails(sessionId: string): Observable<ResponseAccountDetails> {
    return this.http.get<ResponseAccountDetails>(
      `${environment.movieDB.apiBaseUrl}/account?session_id=${sessionId}&api_key=${environment.movieDB.apiKey}`
    );
  }
}
