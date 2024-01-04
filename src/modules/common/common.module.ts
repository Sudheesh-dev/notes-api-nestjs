import { Module } from '@nestjs/common';
import { ElasticsearchService } from 'src/modules/common/services/elastic-search.service';
import { SwaggerService } from 'src/modules/common/services/swagger.service';

@Module({
    imports: [],
    providers: [ElasticsearchService, SwaggerService],
    controllers: [],
    exports:[ElasticsearchService, SwaggerService]
})
export class CommonModule {}
