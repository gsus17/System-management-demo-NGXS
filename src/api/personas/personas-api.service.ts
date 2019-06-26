import { Injectable } from '@angular/core';
import { Persona } from '../entities/persona.entity';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PersonasApiService {


  constructor(private db: AngularFirestore) { }

  /**
   * Obtiene una lista de personas.
   */
  public getPersonas$(pageIndex: number = 1, pageSize: number = 1): Observable<Persona[]> {
    console.log(`${PersonasApiService.name}::getPersona`);

    const personList: any = this.db.collection('/personas');
    return personList.valueChanges();
  }

  /**
   * Obtiene una persona segun su id.
   */
  public getById$(id: string): Observable<Persona> {
    console.log(`${PersonasApiService.name}::getById`);

    const personList = this.db.collection(`/personas/${id}`);
    return <any>personList.valueChanges();
  }

  /**
   * Crea una persona.
   */
  public post(person: Persona): Promise<void> {
    console.log(`${PersonasApiService.name}::post`);
    return this.db.collection(`/personas`).doc(`${person.id}`).set(person);
  }

  /**
   * Actualiza la persona especificada.
   */
  public put(person: Persona): Promise<void> {
    console.log(`${PersonasApiService.name}::put`);

    return this.db.collection(`/personas`).doc(`${person.id}`).update(person);
  }

  /**
   * Elimina una persona.
   */
  public deleteById(id: number): Promise<void> {
    console.log(`${PersonasApiService.name}::deleteById id %o`, id);
    return this.db.doc(`personas/${id}`)
      .delete();
  }
}
