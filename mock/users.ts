import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id: string;
  name: string;
  surname: string;
  height: number;
  dateOfBirth: string;
}

export const users = [
  {
    id: uuidv4(),
    name: 'John',
    surname: 'Doe',
    dateOfBirth: '1990-01-01',
    height: 1.80,
  },
  {
    id: uuidv4(),
    name: 'Anderson',
    surname: 'Poe',
    dateOfBirth: '1990-01-01',
    height: 1.55,
  },
  {
    id: uuidv4(),
    name: 'Erick',
    surname: 'Wick',
    dateOfBirth: '1994-01-12',
    height: 1.60,
  },
];