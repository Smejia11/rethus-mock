import { IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export enum IdentificationType {
  CEDULA_CIUDADANIA = 'Cedula de Ciudadania',
  CEDULA_EXTRANJERIA = 'Cedula de Extranjeria',
  PERMISO_PROTECCION_TEMPORAL = 'Permiso por protección temporal',
  TARJETA_IDENTIDAD = 'Tarjeta de Identidad',
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
