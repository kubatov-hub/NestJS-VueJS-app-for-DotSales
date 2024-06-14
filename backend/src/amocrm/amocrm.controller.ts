import {Controller, Get, Query} from '@nestjs/common';
import { AmocrmService } from './amocrm.service';

@Controller('leads') // Updated endpoint path
export class AmocrmController {
  constructor(private readonly amocrmService: AmocrmService) {}

  @Get()
  async findAll(@Query('query') query?: string): Promise<any> {
    if (query && query.length >= 3) {
      return this.amocrmService.findAllWithFilter(query);
    } else {
      return this.amocrmService.findAll();
    }
  }
}