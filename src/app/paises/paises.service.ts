import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from 'src/api/entities/pais.entity';
import { PaisesApiService } from 'src/api/paises/paises-api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesServiceSingleton {

  /**
   * Tamano total del listado.
   */
  private dataLength: number = 0;

  constructor(private paisesApiService: PaisesApiService) { }

  /**
   * Devuelve el listado de personas.
   */
  public getPaises$(): Observable<Pais[]> {
    return this.paisesApiService.getPaises$()
      .pipe(
        map((items) => {
          const countries: Pais[] = <any>items;
          countries.forEach((country, idx) => {
            country.id = idx;
          });

          this.dataLength = countries.length;
          return countries;
        })
      );
  }

  /**
   * Crea un pais.
   */
  public createContry(country: Pais): Promise<void> {
    return this.paisesApiService.post(country, this.dataLength + 1);
  }

  /**
   * Edita un pais.
   */
  public editCountry(country: Pais): Promise<void> {
    return this.paisesApiService.put(country);
  }

  /**
   * Elimina un pais.
   */
  public deleteCountry(id: number): Promise<void> {
    return this.paisesApiService.deleteById(id);
  }

}
