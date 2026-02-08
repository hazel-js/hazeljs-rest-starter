import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UseGuards,
} from '@hazeljs/core';
import { Swagger, ApiOperation } from '@hazeljs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/users')
@Swagger({
  title: 'Users',
  description: 'User management endpoints (protected)',
  version: '1.0.0',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users (requires auth)',
    tags: ['Users'],
    responses: {
      '200': { description: 'List of all users' },
      '401': { description: 'Unauthorized' },
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a user by ID (requires auth)',
    tags: ['Users'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'User found' },
      '401': { description: 'Unauthorized' },
      '404': { description: 'User not found' },
    },
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new user (requires auth)',
    tags: ['Users'],
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
      '201': { description: 'User successfully created' },
      '400': { description: 'Invalid input data' },
      '401': { description: 'Unauthorized' },
    },
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update an existing user (requires auth)',
    tags: ['Users'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true,
        schema: { type: 'string' },
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'Jane Doe' },
              email: { type: 'string', example: 'jane@example.com' },
              password: { type: 'string', example: 'NewSecurePass456!' },
            },
          },
        },
      },
    },
    responses: {
      '200': { description: 'User successfully updated' },
      '401': { description: 'Unauthorized' },
      '404': { description: 'User not found' },
    },
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a user (requires auth)',
    tags: ['Users'],
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true,
        schema: { type: 'string' },
      },
    ],
    responses: {
      '200': { description: 'User successfully deleted' },
      '401': { description: 'Unauthorized' },
      '404': { description: 'User not found' },
    },
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
