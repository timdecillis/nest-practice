export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  jobTitle: string;
  vehicle: string;
  favoriteAnimal: string;
}

export type Users = User[];
