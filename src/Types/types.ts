export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string | null;
  orders: any;
}

export type Users = User[];
