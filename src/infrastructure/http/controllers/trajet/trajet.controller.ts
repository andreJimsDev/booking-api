import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateTrajetUseCase } from '../../../../application/use-cases/trajet/create-trajet.use-case';
import { FetchByIdTrajetUseCase } from '../../../../application/use-cases/trajet/fetch-by-id-trajet.use-case';
import { FetchAllTrajetUseCase } from '../../../../application/use-cases/trajet/fetch-all-trajet.use-case';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import { CreateTrajetDto } from '../../dtos/trajet/create-trajet.dto';
import { UpdateTrajetDto } from '../../dtos/trajet/update-trajet.dto';
import { UpdateTrajetUseCase } from '../../../../application/use-cases/trajet/update-trajet.use-case';
import { DeleteTrajetUseCase } from '../../../../application/use-cases/trajet/delete-trajet.use-case';

@Controller('trajets')
export class TrajetController {
  constructor(
    private readonly createTrajetUseCase: CreateTrajetUseCase,
    private readonly fetchByIdUseCase: FetchByIdTrajetUseCase,
    private readonly deleteTrajetUseCase: DeleteTrajetUseCase,
    private readonly fetchAllTrajetUseCase: FetchAllTrajetUseCase,
    private readonly updateTrajetUseCase: UpdateTrajetUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateTrajetDto) {
    return this.createTrajetUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UpdateTrajetDto) {
    return this.updateTrajetUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.fetchAllTrajetUseCase.execute();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.fetchByIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteTrajetUseCase.execute(id);
  }
}
