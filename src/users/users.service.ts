import { Injectable, NotFoundError } from '@hazeljs/core';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundError(`User with id "${id}" not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const now = new Date().toISOString();
    const user: User = {
      id: String(this.idCounter++),
      name: createUserDto.name,
      email: createUserDto.email,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    if (updateUserDto.name !== undefined) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.email !== undefined) {
      user.email = updateUserDto.email;
    }
    user.updatedAt = new Date().toISOString();
    return user;
  }

  remove(id: string): { deleted: boolean } {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundError(`User with id "${id}" not found`);
    }
    this.users.splice(index, 1);
    return { deleted: true };
  }
}
