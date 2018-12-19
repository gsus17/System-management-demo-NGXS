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
}
