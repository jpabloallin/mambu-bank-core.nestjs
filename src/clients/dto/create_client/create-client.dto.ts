import { Type } from "class-transformer";
import { IsObject, IsOptional, IsString, IsUUID, MinLength, ValidateNested } from "class-validator";
import { _Personalizados } from './_personalizados.dto';

export class CreateClientDto {

    @MinLength(2)
    @IsString()
    firstName: string;

    @MinLength(2)
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    homePhone?: string;

    @IsOptional()
    @IsString()
    mobilePhone?: string;

    @IsOptional()
    @IsString()
    emailAddress?: string;

    @IsOptional()
    @IsString()
    preferredLanguage?: string;

    @IsOptional()
    @IsString()
    birthDate?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @ValidateNested()
    @Type(() => _Personalizados)
    _personalizados: _Personalizados;
}
