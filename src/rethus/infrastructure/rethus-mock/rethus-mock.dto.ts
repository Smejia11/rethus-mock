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
  CC = '1',
  CE = '2',
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
