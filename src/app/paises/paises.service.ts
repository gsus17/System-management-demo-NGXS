import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from 'src/api/entities/pais.entity';
import { PaisesApiService } from 'src/api/paises/paises-api.service';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private paisesApiService: PaisesApiService) { }

  /**
   * Devuelve el listado de personas.
   */
  public getPaises$(): Observable<Pais[]> {
    return this.paisesApiService.getPaises$();
  }
}
