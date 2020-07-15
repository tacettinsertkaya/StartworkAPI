/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

//import { v4 } from 'uuid';
//import { redis } from '../redis';

export const confirmEmailLink = async () => {
  //const id = v4();
  //await redis.set(id, userId, 'ex', 60 * 60 * 15);
  return `http://localhost:4000/api/users/email/verify/`;
};
