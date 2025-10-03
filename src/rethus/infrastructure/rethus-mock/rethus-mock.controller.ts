import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RethusMockDto } from './rethus-mock.dto';
import { RethusService } from '../../domain/rethus-mock/rethus-mock-repository';

import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeyGuard } from '../../../common/api-key.guard';

@Controller('api/v1/rethus-mock')
export class RethusMockController {
  constructor(private readonly rethusService: RethusService) {}
  @UseGuards(ApiKeyGuard)
  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Obtener información de Rethus por identificación' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key para autenticación',
    required: true,
    example: 'mi-api-key-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Información obtenida correctamente',
    content: {
      'application/json': {
        example: {
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
              title: 'Enfermería',
              professionOrOccupation: 'Enfermería',
              startPracticeDate: '2010-01-06',
              administrativeAct: '21',
              reportingEntity: 'DTS SECRETARIA DE SALUD DE CUNDINAMARCA',
            },
            {
              programType: 'AUX',
              obtainmentOrigin: 'Local',
              title: 'Auxiliar de enfermería',
              professionOrOccupation: 'Auxiliar de enfermería',
              startPracticeDate: '2001-02-26',
              administrativeAct: '251',
              reportingEntity: 'GOBERNACION DEL TOLIMA',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - validación fallida',
    content: {
      'application/json': {
        example: {
          statusCode: 400,
          error: 'Bad Request',
          message: [
            'identificationType must be Cedula de Ciudadania,Cedula de Extranjeria,Permiso por protección temporal,Tarjeta de Identidad',
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - API Key inválida o ausente',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          error: 'Unauthorized',
          message: 'Invalid or missing API key',
        },
      },
    },
  })
  @ApiBody({
    type: RethusMockDto,
    examples: {
      example1: {
        summary: 'Ejemplo de entrada',
        description: 'Body de ejemplo para probar el endpoint',
        value: {
          identificationType: 'Cedula de Ciudadania',
          identificationNumber: '12332327',
          firstName: 'John',
          lastName: 'Doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Información obtenida correctamente',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request - validación fallida' })
  async getInfoRethus(@Body() dto: RethusMockDto) {
    return await this.rethusService.getInfoRethus({
      tipoIdentificacion: dto.identificationType,
      numeroIdentificacion: dto.identificationNumber,
      primerNombre: dto.firstName,
      primerApellido: dto.lastName,
    });
  }
}
