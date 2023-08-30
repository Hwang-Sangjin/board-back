import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {

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

    findAll() {
        return this.boards;
    }

    find(id: number) {
        const index = this.getBoardId(id);
        return this.boards[index];
    }

    create(data : CreateBoardDto){
      const newBoard = {id: this.getNextId(), ...data};
      this.boards.push(newBoard);
      return newBoard;
    }

    update(id: number, data : UpdateBoardDto){
      const index = this.getBoardId(id);

      if(index > -1){
         this.boards[index] = {
            ...this.boards[index], 
            ...data,
         };
         return this.boards[index];
      }
      return null;
    }

    remove(id: number){
      const index = this.getBoardId(id);
      
      if(index > -1) {
         const deleteBoard = this.boards[index];
         this.boards.splice(index,1);
         return deleteBoard;
      }
      return null;
    }

    getBoardId(id: number){
      return this.boards.findIndex((board) => board.id ===id);
    }

    getNextId(){
      return this.boards.sort((a,b) => (b.id - a.id))[0].id + 1;
    }
}
