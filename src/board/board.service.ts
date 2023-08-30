import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Board } from 'src/entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  private boards = [
    {
      name: 'jin',
      contents: 'contents 1',
      id: 1,
    },
    {
      name: 'lee',
      contents: 'contents 2',
      id: 2,
    },
    {
      name: 'kim',
      contents: 'contents 3',
      id: 3,
    },
    {
      name: 'hyun',
      contents: 'contents 4',
      id: 4,
    },
    {
      name: 'park',
      contents: 'contents 5',
      id: 5,
    },
    {
      name: 'hwang',
      contents: 'contents 6',
      id: 6,
    },
    {
      name: 'cha',
      contents: 'contents 7',
      id: 7,
    },
    {
      name: 'jo',
      contents: 'contents 8',
      id: 8,
    },
    {
      name: 'bae',
      contents: 'contents 9',
      id: 9,
    },
  ];

  async findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (!board) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    return board;
  }

  async create(data: CreateBoardDto) {
    const board = this.boardRepository.create(data);
    await this.boardRepository.save(board);
  }

  async update(id: number, data: UpdateBoardDto) {
    const board = await this.boardRepository.findOneBy({
      id,
    });

    if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    this.boardRepository.update(id, {
      ...data,
    });
  }

  remove(id: number) {
    const index = this.getBoardId(id);

    if (index > -1) {
      const deleteBoard = this.boards[index];
      this.boards.splice(index, 1);
      return deleteBoard;
    }
    return null;
  }

  getBoardId(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
