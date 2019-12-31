import {Module} from '@nestjs/common';
import {CoinService} from './coin.service';
import {CoinResolver, CoinRecordResolver, CoinMutationResolver, ViewerResolver} from './coin.resolver';

@Module({
    providers: [CoinService, ViewerResolver, CoinMutationResolver, CoinResolver, CoinRecordResolver]
})
export class CoinModule {
}
