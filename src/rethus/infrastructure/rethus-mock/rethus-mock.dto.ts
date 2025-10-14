import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum IdentificationType {
  CC = '1', // CÉDULA DE CIUDADANÍA
  CE = '2', // CÉDULA DE EXTRANJERÍA
  NIT = '3', // NRO DE NIT
  TI = '4', // TARJETA DE IDENTIDAD
  PS = '5', // PASAPORTE
  TSS = '6', // TARJETA DEL SEGURO SOCIAL EXTR
  SEN = '7', // SOC. EXTRANJERA SIN NIT EN COL
  FDI = '8', // FIDEICOMISO
  RC = '9', // REGISTRO CIVIL
  SI = '10', // SIN IDENTIFICACIÓN
  DM = '11', // DOCUMENTO DE MIGRACIÓN
  ADT = '12', // ASOCIADO AL DTO. DEL TITULAR
  CD = '13', // CERTIFICADO DE DEFUNCIÓN
  NV = '14', // NACIDO VIVO
  TV = '15', // TARJETA DE VIAJERO
  RUT = '16', // REGISTRO ÚNICO TRIBUTARIO
  NME = '17', // NIT MIGRACIÓN ESCOLARES
  NUI = '18', // NÚMERO ÚNICO DE IDENTIFICACIÓN
  JUD = '19', // DOCUMENTOS JUDICIALES
  DC = '21', // DOCUMENTO JUDICIAL Y CONTRALOR
  PEP = '22', // PERMISO ESPECIAL PERMANENCIA
  PPT = '23', // PERMISO PROTECCIÓN TEMPORAL
  NAD = '99', // ALERTA PERSONA NO ADJUDICATARIO
}

export class RethusMockDto {
  @IsEnum(IdentificationType, {
    message: `identificationType must be ${Object.values(IdentificationType).join()}`,
  })
  identificationType!: IdentificationType;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/, {
    message: 'identificationNumber must contain only digits',
  })
  @Length(5, 15, {
    message: 'identificationNumber must be between 5 and 15 digits',
  })
  identificationNumber!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string'
      ? value
          .trim() // remove leading/trailing spaces
          .replace(/\s+/g, ' ') // collapse multiple spaces
          .replace(/[^a-zA-ZÀ-ÿ'\s-]/g, '') // remove unwanted characters
      : value,
  )
  firstName!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) =>
    typeof value === 'string'
      ? value
          .trim() // remove leading/trailing spaces
          .replace(/\s+/g, ' ') // collapse multiple spaces
          .replace(/[^a-zA-ZÀ-ÿ'\s-]/g, '') // remove unwanted characters
      : value,
  )
  lastName!: string;
}
