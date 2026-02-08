import { Controller, Get, Post, Body, HttpCode, UseGuards } from '@hazeljs/core';
import { Swagger, ApiOperation } from '@hazeljs/swagger';
import { AuthLocalService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestContext } from '@hazeljs/core';

@Controller('/auth')
@Swagger({
  title: 'Authentication API',
  description: 'Authentication and registration endpoints',
  version: '1.0.0',
  tags: [{ name: 'Auth', description: 'Authentication operations' }],
})
export class AuthController {
  constructor(private readonly authService: AuthLocalService) {}

  @Post('/register')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Register a new user',
    tags: ['Auth'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'John Doe' },
              email: { type: 'string', example: 'john@example.com' },
              password: { type: 'string', example: 'SecurePass123!' },
            },
            required: ['name', 'email', 'password'],
          },
        },
      },
    },
    responses: {
      '201': { description: 'User registered successfully' },
      '400': { description: 'Email already registered or invalid input' },
    },
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login with email and password',
    tags: ['Auth'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', example: 'john@example.com' },
              password: { type: 'string', example: 'SecurePass123!' },
            },
            required: ['email', 'password'],
          },
        },
      },
    },
    responses: {
      '200': { description: 'Login successful, returns access token' },
      '401': { description: 'Invalid email or password' },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get current user profile (requires Bearer token)',
    tags: ['Auth'],
    responses: {
      '200': { description: 'Current user profile' },
      '401': { description: 'Unauthorized' },
    },
  })
  getProfile(context: RequestContext) {
    return this.authService.getProfile(context);
  }
}
