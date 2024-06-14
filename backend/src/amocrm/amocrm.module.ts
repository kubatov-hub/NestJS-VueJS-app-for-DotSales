import { Module } from '@nestjs/common';
import { AmocrmService } from './amocrm.service';
import { AmocrmController } from './amocrm.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [AmocrmController],
  providers: [AmocrmService],
})
export class AmocrmModule {}
