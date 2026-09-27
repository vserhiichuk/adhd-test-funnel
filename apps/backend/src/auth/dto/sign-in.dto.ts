import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { NormalizedEmail } from './normalized-email.decorator.js';

export class SignInDto {
  @NormalizedEmail()
  email: string;

  // Sign-up caps passwords at 128, so a longer one can't match; don't spend a hash on it.
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  password: string;
}
