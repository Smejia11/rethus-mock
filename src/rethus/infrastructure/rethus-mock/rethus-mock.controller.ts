import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RethusMockDto } from './rethus-mock.dto';
import { RethusService } from '../../domain/rethus-mock/rethus-mock-repository';
import { ApiKeyGuard } from 'src/common/api-key.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
