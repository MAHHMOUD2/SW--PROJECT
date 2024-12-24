import { Module } from '@nestjs/common';
import { AuthenticationLogsService } from './authentication_logs.service';
import { AuthenticationLogsController } from './authentication_logs.controller';

@Module({
  providers: [AuthenticationLogsService],
  controllers: [AuthenticationLogsController]
})
export class AuthenticationLogsModule {}
