import { NormalizedEmail } from './normalized-email.decorator.js';

export class CheckEmailDto {
  @NormalizedEmail()
  email: string;
}
