import { Controller, Post, Body, NotFoundException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../users/dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ErrorCodes, ErrorMessages } from 'src/common/constants/constants';

@Controller('api/auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const [emailExists, userCredentials] = await this.authService.signup(createUserDto);
    if(emailExists){
      throw new ConflictException({
        message:[ErrorMessages.USEREMAIL_ALREADY_EXISTS],
        statusCode:ErrorCodes.USEREMAIL_ALREADY_EXISTS
      })
    }
    return userCredentials
  }
  
  @Post('login')
  async login(@Body() loginUser:LoginUserDto) {
    const user = await this.authService.validateEmailAndPassword(loginUser.email, loginUser.password);
    if(!user){
      throw new NotFoundException('Invalid email or password.');
    }
    return this.authService.login(user)
  }

}
