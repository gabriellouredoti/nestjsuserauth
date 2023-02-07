import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/signup.dto';
import { User } from './models/users.model';
import { SignInDto } from './dtos/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signup(@Body() signupDto: SignUpDto): Promise<User> {
    return this.usersService.signup(signupDto);
  }

  @Post('signin')
  public async signin(
    @Body() signInDto: SignInDto,
  ): Promise<{ name: string; jwtToken: string; email: string }> {
    return this.usersService.signin(signInDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
