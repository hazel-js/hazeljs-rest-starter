import { Injectable } from '@hazeljs/core';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to HazelJS!',
      timestamp: new Date().toISOString(),
    };
  }

  getInfo() {
    return {
      name: 'hazeljs-starter',
      version: '1.0.0',
      framework: 'HazelJS',
      documentation: '/swagger',
      health: '/health',
    };
  }
}
