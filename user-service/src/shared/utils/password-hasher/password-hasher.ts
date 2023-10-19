import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

export const UTILS_PASSWORD_HASHER = 'UTILS_PASSWORD_HASHER';

export interface IPasswordHasher {
  compare(password: string, hashedPassword: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}

@Injectable()
export class PasswordHasher implements IPasswordHasher {
  private readonly rounds: number;
  constructor() {
    this.rounds = 5;
  }

  async compare(password: string, hashedPassword: string) {
    return compare(password, hashedPassword);
  }

  async hash(password: string) {
    const hashedPassword = await hash(password, this.rounds);
    return hashedPassword;
  }
}
