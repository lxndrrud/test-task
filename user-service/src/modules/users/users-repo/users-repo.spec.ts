import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepo } from './users-repo';

describe('UsersRepo', () => {
  let provider: UsersRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepo],
    }).compile();

    provider = module.get<UsersRepo>(UsersRepo);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
