import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioInterface } from '../../../../auth/interfaces/Usuario.interfaces';
import { environment } from '../../../../../../environments/enviroments';
import { Observable } from 'rxjs';
import { ResponseBackInterface } from '../../../../../shared/interfaces/ResponseBack.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  apiUrl:string = environment.usuarioApiUrl;
  constructor(private http: HttpClient) { }

  getData(dataInterface: UsuarioInterface){
    const url = `${this.apiUrl}/GetUsuarios`;
    return this.http.post<UsuarioInterface[]>(url, dataInterface)
  }
  delData(dataInterface: UsuarioInterface): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/DelUsuarios`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }

  setData(dataInterface: UsuarioInterface): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/SetUsuarios`;
    return this.http.post<ResponseBackInterface>(url, dataInterface);
  }

  updData(dataInterface: UsuarioInterface): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/UpdUsuarios`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }
}
