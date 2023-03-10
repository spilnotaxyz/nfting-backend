import { Module, CacheModule } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { TransactionsModule } from './transactions/transactions.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from './config/config.service'
import { CardModule } from './card/card.module'
import { TwitterModule } from './twitter/twitter.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('mongodb.uri')
      })
    }),
    CacheModule.register({ ttl: 600 * 1000, isGlobal: true }),
    TransactionsModule,
    TwitterModule,
    CardModule
  ],
  providers: [AppService]
})
export class AppModule {}
