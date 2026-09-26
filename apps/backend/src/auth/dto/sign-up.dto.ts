import { IsString, MaxLength, MinLength } from 'class-validator';
import { NormalizedEmail } from './normalized-email.decorator.js';

export class SignUpDto {
  @NormalizedEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
