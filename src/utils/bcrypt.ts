import { hash, compare } from 'bcrypt'

export const generateHash = async (plainText: string) =>
  await hash(plainText, 10)

export const comparePassword = async (plainText: string, hashedData: string) =>
  await compare(plainText, hashedData)
