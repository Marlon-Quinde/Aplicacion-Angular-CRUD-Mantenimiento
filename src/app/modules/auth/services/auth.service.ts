import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UsuarioInterface } from '../interfaces/Usuario.interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/enviroments';
import { Router } from '@angular/router';
import { ResponseBackInterface } from 'src/app/shared/interfaces/ResponseBack.interfaces';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces copy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.authApiUrl;
  loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }

  login(data:UsuarioInterface){
    return this.http.post(this.apiUrl, data).pipe(
      catchError((error: BackErrorResponse): Observable<BackErrorResponse> => {
        console.error('Ha ocurrido un error:', error);
        return throwError(error);
      })
    );
  }

  get getUsername(){
    return localStorage.getItem('userName');
  }

  get isAutenticado(){
    return !!localStorage.getItem('token_value');
  }

  logout(): void {
    // Aquí se realizaría la lógica para cerrar la sesión del usuario, por ejemplo, se podría eliminar el token de autenticación.

    localStorage.removeItem('token_value');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }
}
