import { IsNotEmpty } from 'class-validator';

export class UpdateSiegeDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  trajetId: number;
}
