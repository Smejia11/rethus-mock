import { IRethusPersonPrimitive } from './rethus-mock-primitive';

export abstract class RethusRepository {
  abstract getInfoRethus(PersonaDto: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    primerApellido: string;
  }): Promise<IRethusPersonPrimitive | null>;
}

export abstract class RethusService {
  abstract getInfoRethus(PersonaDto: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    primerApellido: string;
  }): Promise<IRethusPersonPrimitive | null>;
}
