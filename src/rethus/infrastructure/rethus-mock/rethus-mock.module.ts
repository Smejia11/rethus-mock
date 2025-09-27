import { Module } from '@nestjs/common';
import { RethusMockController } from './rethus-mock.controller';
import { InMemoryRethus } from './repository/rethus-mock-repository';
import { RethusMockPrimitiveService } from '../../application/rethus-mock/rethus-mock-primitive.service';
import {
  RethusRepository,
  RethusService,
} from '../../domain/rethus-mock/rethus-mock-repository';

@Module({
  controllers: [RethusMockController],
  providers: [
    InMemoryRethus,
    RethusMockPrimitiveService,

    {
      provide: RethusRepository,
      useExisting: InMemoryRethus,
    },
    {
      provide: RethusService,
      useExisting: RethusMockPrimitiveService,
    },
  ],
})
export class RethusMockModule {}
