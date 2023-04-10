import { HttpErrorResponse } from '@angular/common/http';

export interface BackErrorResponse extends HttpErrorResponse {
  error:{
    respuesta: string;
    leyenda: string;
  }

}
