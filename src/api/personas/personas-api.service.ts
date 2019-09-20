import { Injectable } from '@angular/core';
import { Persona } from '../entities/persona.entity';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AccountStatus } from '../entities/account-status.entity';
import { map } from 'rxjs/operators';
import { Form } from 'src/app/personas/formulario/interfaces/formulario';

@Injectable({
  providedIn: 'root'
})
export class PersonasApiService {


  constructor(
    private db: AngularFirestore) { }

  /**
   * Obtiene una lista de personas.
   */
  public getPersonas$(pageIndex: number = 1, pageSize: number = 1, accountStatus: AccountStatus = null): Observable<Persona[]> {
    console.log(`${PersonasApiService.name}::getPersona`);

    const personList: AngularFirestoreCollection<Persona> = this.db.collection('/personas', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref.limit(pageSize);
      if (accountStatus !== null) { query = query.where('estado', '==', accountStatus); }
      return query;
    });

    return personList.valueChanges();
  }

  /**
   * Obtiene una lista de personas.
   */
  public getPersonForm$(id: number, editMode: boolean): Observable<Form> {
    console.log(`${PersonasApiService.name}::getPersona`);

    const personList: AngularFirestoreCollection<Persona> = this.db.collection('/personas', ref => ref.where('id', '==', id));

    return personList.valueChanges()
      .pipe(
        map((persons: Persona[]) => {
          const personFiltered: Persona = persons[0];
          const form: Form = {
            id: personFiltered.id === undefined ? null : personFiltered.id,
            address: personFiltered.direccion,
            regionalData: personFiltered.regionalData,
            bienes: personFiltered.bienes === null || personFiltered.bienes === undefined ? [] : personFiltered.bienes,
            ahorro: personFiltered.totalAhorro,
            ahorroPercentage: personFiltered.porcAhorro,
            birthdate: new Date(),
            editMode: editMode,
            email: personFiltered.eMail,
            enableNotify: false,
            gender: personFiltered.sexo,
            name: personFiltered.nombreCompleto,
            status: personFiltered.estado,
            obs: personFiltered.obs,
            nacionalidad:
              personFiltered.nacionalidad === null
                || personFiltered.nacionalidad === undefined
                ? null : personFiltered.nacionalidad,
          };

          return form;
        }));
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
