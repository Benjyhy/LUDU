import { Injectable } from '@nestjs/common';
import { RentDto } from './dto/rent.dto';

@Injectable()
export class RentService {
  create(createRentDto: RentDto) {
    return 'This action adds a new rent';
  }

  findAll() {
    return `This action returns all rent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rent`;
  }

  update(id: number, updateRentDto: RentDto) {
    return `This action updates a #${id} rent`;
  }

  remove(id: number) {
    return `This action removes a #${id} rent`;
  }
}
