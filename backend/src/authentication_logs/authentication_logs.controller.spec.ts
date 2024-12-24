import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationLogsController } from './authentication_logs.controller';

describe('AuthenticationLogsController', () => {
  let controller: AuthenticationLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationLogsController],
    }).compile();

    controller = module.get<AuthenticationLogsController>(AuthenticationLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
