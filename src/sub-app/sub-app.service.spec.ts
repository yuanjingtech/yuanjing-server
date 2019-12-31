import { Test, TestingModule } from '@nestjs/testing';
import { SubAppService } from './sub-app.service';

describe('SubAppService', () => {
  let service: SubAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubAppService],
    }).compile();

    service = module.get<SubAppService>(SubAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
