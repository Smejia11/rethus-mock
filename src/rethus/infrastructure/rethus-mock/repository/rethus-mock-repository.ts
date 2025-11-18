import { Injectable } from '@nestjs/common';
import { RethusRepository } from '../../../domain/rethus-mock/rethus-mock-repository';
import { IRethusPersonPrimitive } from '../../../domain/rethus-mock/rethus-mock-primitive';

@Injectable()
export class InMemoryRethus extends RethusRepository {
  private rethusPerson: IRethusPersonPrimitive = {
    identificationType: 'CC',
    identificationNumber: '38140065213',
    firstName: 'NOMBRE',
    lastName: 'APELLIDO',
    secondLastName: 'APELLIDO 2',
    middleName: 'NOMBRE 2',
    identificationStatus: 'Vigente',
    academicInformation: [
      {
        programType: 'UNV',
        obtainmentOrigin: 'Local',
        profession: 'Enfermería',
        startPracticeDate: '2010-01-06',
        administrativeAct: '21',
        reportingEntity: 'DTS SECRETARIA DE SALUD DE CUNDINAMARCA',
      },
      {
        programType: 'AUX',
        obtainmentOrigin: 'Local',
        profession: 'Auxiliar de enfermería',
        startPracticeDate: '2001-02-26',
        administrativeAct: '251',
        reportingEntity: 'GOBERNACION DEL TOLIMA',
      },
    ],
  };
  private rethusPersonDead: IRethusPersonPrimitive = {
    identificationType: 'CC',
    identificationNumber: '72179862',
    firstName: 'NOMBRE',
    lastName: 'APELLIDO',
    secondLastName: 'APELLIDO 2',
    middleName: 'NOMBRE 2',
    identificationStatus: 'Fallecido',
    academicInformation: [],
  };
  private rethusPersonNotFound: IRethusPersonPrimitive | null = null;
  private rethusPersonInactive: IRethusPersonPrimitive = {
    identificationType: 'CC',
    identificationNumber: '95052323216',
    firstName: 'NOMBRE',
    lastName: 'APELLIDO',
    secondLastName: 'APELLIDO 2',
    middleName: 'NOMBRE 2',
    identificationStatus: 'No vigente',
    academicInformation: [],
  };
  async getInfoRethus(PersonaDto: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    primerApellido: string;
  }): Promise<IRethusPersonPrimitive | null> {
    if (PersonaDto.numeroIdentificacion === '72179862')
      return Promise.resolve(this.rethusPersonDead);
    if (PersonaDto.numeroIdentificacion === '1129536242')
      return Promise.resolve(this.rethusPersonNotFound);
    if (PersonaDto.numeroIdentificacion === '95052323216')
      return Promise.resolve(this.rethusPersonInactive);
    return Promise.resolve(this.rethusPerson);
  }
}
