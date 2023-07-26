import { IsNotEmpty } from 'class-validator';

export class CreateTrajetDto {
  @IsNotEmpty()
  depart: string;
  @IsNotEmpty()
  arrivee: string;
}
