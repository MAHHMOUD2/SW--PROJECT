import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationLogsService } from './authentication_logs.service';

describe('AuthenticationLogsService', () => {
  let service: AuthenticationLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationLogsService],
    }).compile();

    service = module.get<AuthenticationLogsService>(AuthenticationLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
