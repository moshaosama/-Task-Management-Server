import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign_up')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('linkedinUrl') linkedinUrl: string,
  ) {
    return this.userService.register(email, password, linkedinUrl); //
  }

  @Post('/login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.login(email, password);
  }
}
