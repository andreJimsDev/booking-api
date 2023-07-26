import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from './infrastructure/http/http.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SecurityModule } from './infrastructure/security/security.module';
import { MessagingModule } from './infrastructure/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
    SecurityModule,
    MessagingModule,
  ],
})
export class AppModule {}
