import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateGreetingDto {
  @IsString()
  @IsNotEmpty()
  greeting: string;
}
export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  movie: string;
}
