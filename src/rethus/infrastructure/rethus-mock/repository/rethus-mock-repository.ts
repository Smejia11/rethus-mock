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
  async getInfoRethus(PersonaDto: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    primerApellido: string;
  }): Promise<IRethusPersonPrimitive | null> {
    console.log(PersonaDto);
    return Promise.resolve(this.rethusPerson);
  }
}
