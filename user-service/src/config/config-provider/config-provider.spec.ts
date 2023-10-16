import { Test, TestingModule } from '@nestjs/testing';
import { ConfigProvider } from './config-provider';

describe('ConfigProvider', () => {
  let provider: ConfigProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigProvider],
    }).compile();

    provider = module.get<ConfigProvider>(ConfigProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
