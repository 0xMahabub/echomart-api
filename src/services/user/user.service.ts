import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { userRepository } from './user.repository';

export class UserService {
  async addUser(data: Partial<User>): Promise<User | Error> {
    return await userRepository.save(data);
  }

  async getUsers(): Promise<User[]> {
    return await userRepository.find();
  }

  async getUser(id: string): Promise<User | null> {
    return await userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await userRepository.findByEmail(email);
  }

  async getUserByPhone(phone: string): Promise<User | null> {
    return await userRepository.findByPhone(phone);
  }

  async getUsersByName(name: string): Promise<User[]> {
    return await userRepository.findByName(name);
  }

  async updateUser(id: string, updates: Partial<User>): Promise<UpdateResult> {
    return await userRepository.update(id, updates);
  }

  async removeUser(id: string): Promise<DeleteResult> {
    return await userRepository.delete(id);
  }
}
