import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroments';
import { PerfilesInterfaces } from '../interfaces/Perfiles.interfaces';
import { Observable } from 'rxjs';
import { ResponseBackInterface } from 'src/app/shared/interfaces/ResponseBack.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  apiUrl:string = environment.usuarioApiUrl;
  constructor(private http: HttpClient) { }

  getData(dataInterface: PerfilesInterfaces){
    const url = `${this.apiUrl}/GetPerfiles`;
    return this.http.post<PerfilesInterfaces[]>(url, dataInterface)
  }
  delData(dataInterface: PerfilesInterfaces): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/DelPerfiles`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }

  setData(dataInterface: PerfilesInterfaces): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/SetPerfiles`;
    return this.http.post<ResponseBackInterface>(url, dataInterface);
  }

  updData(dataInterface: PerfilesInterfaces): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/UpdPerfiles`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }
}
