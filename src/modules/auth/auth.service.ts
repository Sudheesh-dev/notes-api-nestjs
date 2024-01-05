import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { CreateUserDto } from '../users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateEmailAndPassword(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      return user
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
        return {
            accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      return [true, null]
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.usersService.create({
      email,
      passwordHash: hashedPassword,
      name, 
    });

    return [false, this.login(newUser)];
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 5;
    return bcrypt.hash(password, saltRounds);
  }

}
