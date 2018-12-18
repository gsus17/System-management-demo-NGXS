import { Injectable } from '@angular/core';
import { Persona } from '../entities/persona.entity';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonasApiService {


  constructor(public db: AngularFireDatabase) { }

  /**
   * Obtiene una lista de personas.
   */
  public getPersonas$(pageIndex: number = 1, pageSize: number = 1): Observable<Persona[]> {
    console.log(`${PersonasApiService.name}::getPersona`);

    const personList: any = this.db.list('/personas');
    return personList.valueChanges()
      .pipe(
        map(item => {
          const persons: Persona[] = <any>item;
          persons.filter((items, index) => index < pageSize);

          const filtrado = this.paginate(persons, pageSize, pageIndex);
          return filtrado;
        })
      );
  }

  /**
   * Obtiene una persona segun su id.
   */
  public getById$(id: string): Observable<Persona> {
    console.log(`${PersonasApiService.name}::getById`);

    const personList = this.db.list(`/personas/${id}`);
    return <any>personList.valueChanges();
  }

  /**
   * Crea una persona.
   */
  public post(person: Persona): Promise<void> {
    console.log(`${PersonasApiService.name}::post`);

    return this.db.object(`/personas/${person.id}`).set(person);
  }

  /**
   * Actualiza la persona especificada.
   */
  public put(person: Persona): Promise<void> {
    console.log(`${PersonasApiService.name}::put`);

    return this.db.object(`/personas/${person.id}`).set(person);
  }

  /**
   * Elimina una persona.
   */
  public deleteById(id: string): Promise<void> {
    console.log(`${PersonasApiService.name}::deleteById`);
    return this.db.database.ref('personas/').child(id).remove();
  }

  /**
   * Devuelve el listado paginado.
   */
  private paginate(array, page_size, page_number): Persona[] {
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  }
}
