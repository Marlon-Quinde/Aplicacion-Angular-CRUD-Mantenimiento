import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ClientesInterface } from '../interfaces/Clientes.interfaces';
import { ResponseBackInterface } from '../../../../../shared/interfaces/ResponseBack.interfaces';
import { environment } from '../../../../../../environments/enviroments';
import { BackErrorResponse } from 'src/app/shared/interfaces/BackErrorResponse.interfaces copy';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl: string = environment.clientesApiUrl;

  info:string = 'No se han registrado clientes nuevos';
  constructor(private http:HttpClient) { }

  getData(dataInterface: ClientesInterface){
    const url = `${this.apiUrl}/GetClientes`;
    return this.http.post<ClientesInterface[]>(url, dataInterface)
  };

  setData(dataInterface: ClientesInterface): Observable<ResponseBackInterface> {
    this.info = 'Ultimo Cliente registrado '+dataInterface.nombres+' '+dataInterface.apellidos;
    const url = `${this.apiUrl}/SetClientes`;
    return this.http.post<ResponseBackInterface>(url, dataInterface).pipe(
      catchError((error: ResponseBackInterface): Observable<ResponseBackInterface> => {
        console.error('Ha ocurrido un error:', error);
        return throwError(error);
      })
    );
  }

  delData(dataInterface: ClientesInterface): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/DelClientes`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }

  updData(dataInterface: ClientesInterface): Observable<ResponseBackInterface> {
    const url = `${this.apiUrl}/UpdClientes`;
    return this.http.post<ResponseBackInterface>(url,dataInterface);
  }
}
