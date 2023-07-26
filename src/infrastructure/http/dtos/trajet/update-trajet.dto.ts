import { IsNotEmpty } from 'class-validator';

export class UpdateTrajetDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  depart: string;
  @IsNotEmpty()
  arrivee: string;
}
