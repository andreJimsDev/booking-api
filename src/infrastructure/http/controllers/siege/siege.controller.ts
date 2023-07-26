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
import { CreateSiegeUseCase } from '../../../../application/use-cases/siege/create-siege.use-case';
import { FetchByIdSiegeUseCase } from '../../../../application/use-cases/siege/fetch-by-id-siege.use-case';
import { JwtAuthGuard } from '../../../security/jwt-auth.guard';
import { CreateSiegeDto } from '../../dtos/siege/create-siege.dto';
import { UpdateSiegeDto } from '../../dtos/siege/update-siege.dto';
import { UpdateSiegeUseCase } from '../../../../application/use-cases/siege/update-siege.use-case';
import { DeleteSiegeUseCase } from '../../../../application/use-cases/siege/delete-siege.use-case';
import { FetchAllSiegeByTrajetUseCase } from '../../../../application/use-cases/siege/fetch-all-siege-by-trajet.use-case';

@Controller('sieges')
export class SiegeController {
  constructor(
    private readonly createSiegeUseCase: CreateSiegeUseCase,
    private readonly fetchByIdUseCase: FetchByIdSiegeUseCase,
    private readonly deleteSiegeUseCase: DeleteSiegeUseCase,
    private readonly fetchAllSiegeByTrajetUseCase: FetchAllSiegeByTrajetUseCase,
    private readonly updateSiegeUseCase: UpdateSiegeUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateSiegeDto) {
    return this.createSiegeUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() body: UpdateSiegeDto) {
    return this.updateSiegeUseCase.execute(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by_trajet/:id')
  async getAllByTrajet(@Param('id') id: number) {
    return this.fetchAllSiegeByTrajetUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by_id/:id')
  async getById(@Param('id') id: number) {
    return this.fetchByIdUseCase.execute(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.deleteSiegeUseCase.execute(id);
  }
}
