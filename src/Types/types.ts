import { Decimal } from '@prisma/client/runtime/library';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
}

export interface Order {
  id: number;
  total: Decimal | null;
  customer_id: number;
}
