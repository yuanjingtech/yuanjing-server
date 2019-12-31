import { Test, TestingModule } from '@nestjs/testing';
import { CoinResolver } from './coin.resolver';

describe('CoinResolver', () => {
  let resolver: CoinResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinResolver],
    }).compile();

    resolver = module.get<CoinResolver>(CoinResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
