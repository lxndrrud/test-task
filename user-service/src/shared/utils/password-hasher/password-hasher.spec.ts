import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHasher } from './password-hasher';

describe('PasswordHasher', () => {
  let provider: PasswordHasher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordHasher],
    }).compile();

    provider = module.get<PasswordHasher>(PasswordHasher);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
