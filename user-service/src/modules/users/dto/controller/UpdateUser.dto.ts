import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  idUser: number;
  @ValidateIf((obj, value) => !!value)
  @IsEmail()
  email?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  dateOfBirth?: string;
}
