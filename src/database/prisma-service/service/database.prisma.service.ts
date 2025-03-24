import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Users } from 'src/types/types';

@Injectable()
export class PrismaDatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return await this.prisma.users.findMany({});
  }
  async addUser(user: User): Promise<Users> {
    const { firstName, lastName, email, vehicle, favoriteAnimal, jobTitle } =
      user;
    await this.prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        jobTitle,
        vehicle,
        favoriteAnimal,
      },
    });
    return await this.prisma.users.findMany({});
  }
  async deleteUserById(user: User): Promise<Users> {
    await this.prisma.users.delete({
      where: {
        id: user.id,
      },
    });
    return await this.prisma.users.findMany({});
  }
}
