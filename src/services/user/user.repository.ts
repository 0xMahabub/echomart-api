import { db } from '../../configs';
import { User } from './user.entity';

export const userRepository = db.getRepository(User).extend({
  findByName(name: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.name = :name', { name })
      .getMany();
  },

  findByEmail(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  },

  findByPhone(phone: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .where('user.phone = :phone', { phone })
      .getOne();
  },
});
