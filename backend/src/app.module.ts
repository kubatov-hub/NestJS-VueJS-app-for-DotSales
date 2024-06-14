import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmocrmModule } from './amocrm/amocrm.module';
import { ServeStaticModule} from '@nestjs/serve-static'; // New
import { join } from 'path'; // New

@Module({
  imports: [
    AmocrmModule,
    ServeStaticModule.forRoot({ // New
      rootPath: join(__dirname, '..', '../../frontend/dist'), // New
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
