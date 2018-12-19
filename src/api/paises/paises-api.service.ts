import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { Pais } from '../entities/pais.entity';

@Injectable({
  providedIn: 'root'
})
export class PaisesApiService {

  constructor(public db: AngularFireDatabase) { }

  /**
   * Obtiene una lista de paises.
   */
  public getPaises$(): Observable<Pais[]> {
    console.log(`${PaisesApiService.name}::getPaises`);

    const personList: any = this.db.list('/paises');

    return personList.valueChanges();
  }

  /**
   * Crea una persona.
   */
  public post(country: Pais, newId: number): Promise<void> {
    console.log(`${PaisesApiService.name}::post`);

    return this.db.object(`/paises/${newId}`).set(country);
  }

  /**
   * Actualiza el pais especificado.
   */
  public put(country: Pais): Promise<void> {
    console.log(`${PaisesApiService.name}::put`);

    return this.db.object(`/paises/${country.id}`).set(country);
  }

  /**
   * Elimina un pais.
   */
  public deleteById(id: number): Promise<void> {
    console.log(`${PaisesApiService.name}::deleteById`);
    // return this.db.database.ref(`/paises/${id}`).remove();
    return this.db.database.ref(`/paises`).child(`${id}`).remove();

  }
}
