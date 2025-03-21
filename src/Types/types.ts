export interface Movie {
  id: number;
  title: string;
  director: string;
}

export type Movies = Movie[];

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  vehicle: string;
  favoriteAnimal: string;
}

export type Users = Movie[];
