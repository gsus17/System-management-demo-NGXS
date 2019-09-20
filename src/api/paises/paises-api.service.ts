import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pais } from '../entities/pais.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesApiService {

  constructor(public db: AngularFirestore) { }

  /**
   * Obtiene una lista de paises.
   */
  public getPaises$(): Observable<Pais[]> {
    console.log(`${PaisesApiService.name}::getPaises`);
    return this.db.collection('/paises').valueChanges()
      .pipe(
        map((items: Pais[]) => {
          const countries: Pais[] = items;
          return countries;
        })
      );
  }

  /**
   * Crea una persona.
   */
  public post(country: Pais): Promise<void> {
    console.log(`${PaisesApiService.name}::post`);

    return this.db.collection(`/paises`).doc(`${country.id}`).set(country);
  }

  /**
   * Actualiza el pais especificado.
   */
  public put(country: Pais): Promise<void> {
    console.log(`${PaisesApiService.name}::put`);

    return this.db.collection(`/paises`).doc(`${country.id}`).set(country);
  }

  /**
   * Elimina un pais.
   */
  public deleteById(id: number): Promise<void> {
    console.log(`${PaisesApiService.name}::deleteById`);
    return this.db.doc(`paises/${id}`)
      .delete();
  }
}
