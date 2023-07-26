import { IsNotEmpty } from 'class-validator';

export class CreateSiegeDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  trajetId: number;
}
