import { Module } from '@nestjs/common';
import { ConfigurationsService } from './configurations.service';
import { ConfigurationsController } from './configurations.controller';

@Module({
  providers: [ConfigurationsService],
  controllers: [ConfigurationsController]
})
export class ConfigurationsModule {}
