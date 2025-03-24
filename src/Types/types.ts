export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  vehicle: string;
  favoriteAnimal: string;
}

export type Users = User[];
