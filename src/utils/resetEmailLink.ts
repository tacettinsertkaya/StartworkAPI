/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//import { v4 } from 'uuid';
//import { redis } from '../redis';
import { BadRequestException } from '@nestjs/common';

export const resetEmailLink = async (email: string) => {
  // const id = v4();

  console.log("Email ---> : ",email);
  const user = await this.userRepository.findOne({ where: { email } });
  console.log("user ---> : ",user);
  if (!user) {
    throw new BadRequestException('Böyle Bir email bulunulmadı!');
  }
  const token = await this.login(user);
  console.log("Token --->",token);
  const forgetLink = `http://localhost:4000/api/users/forgotPassword?token=${token}`;
  //await redis.set(id, userId, 'ex', 60 * 60 * 15);

  return forgetLink;
};
