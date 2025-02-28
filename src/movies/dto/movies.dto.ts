import { IsString, IsNotEmpty } from 'class-validator';

export class AddMovieDto {
  @IsString()
  @IsNotEmpty()
  movie: string;
}
