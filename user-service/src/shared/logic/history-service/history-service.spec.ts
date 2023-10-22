import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from './history-service';

describe('HistoryService', () => {
  let provider: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryService],
    }).compile();

    provider = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
