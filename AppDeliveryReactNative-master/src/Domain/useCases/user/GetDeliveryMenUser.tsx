import React from 'react'
import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository'
const { getDeliveryMen } =  new UserRepositoryImpl();

export const GetDeliveryMenUserUseCase = async () => {
  return await getDeliveryMen();
}
