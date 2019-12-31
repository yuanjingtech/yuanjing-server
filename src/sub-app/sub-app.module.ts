import {Module} from '@nestjs/common';
import { ViewerResolver} from "./sub-app.resolver";
import { SubAppService } from './sub-app.service';

@Module({
    providers: [ ViewerResolver, SubAppService]
})
export class SubAppModule {
}

