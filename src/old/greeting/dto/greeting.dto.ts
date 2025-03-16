import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateGreetingDto {
  @IsString()
  @IsNotEmpty()
  greeting: string;
}
