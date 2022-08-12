import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // prints hello world
    return 'Hello World!';
  }
}
