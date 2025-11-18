import { NotFoundException, Injectable } from '@nestjs/common';
import {
  RethusRepository,
  RethusService,
} from '../../domain/rethus-mock/rethus-mock-repository';

@Injectable()
export class RethusMockPrimitiveService extends RethusService {
  constructor(private readonly rethusRepository: RethusRepository) {
    super();
  }
  async getInfoRethus(PersonaDto: {
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    primerNombre: string;
    primerApellido: string;
  }) {
    const rethus = await this.rethusRepository.getInfoRethus(PersonaDto);
    if (!rethus) throw new NotFoundException('Persona no encontrada en Rethus');
    return rethus;
  }
}
