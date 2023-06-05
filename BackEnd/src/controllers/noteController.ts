import { Controller,Get,Res,Req,Post, Delete, Patch } from "@decorators/express";
import { Response,Request } from "express";
import Note from '../Entites/note'
import { Equal } from "typeorm";

@Controller('/note')
class NoteContaroller {

    @Get('/')
    async getAllNotes(@Res() res: Response,@Req() req: Request) {
      try{
        const notes = await Note.find()
        res.json(notes)
      }catch(e){
        return res.status(500);
      }
    }

    @Post('/')
     async createNote(@Res() res:Response,@Req() req:Request){
         let newNote = new Note();
         newNote.title = req.body.title;
         newNote.body = req.body.body;
         const createdNote = await newNote.save();
         res.json(createdNote)
     }

     @Patch("/:id")
     async UpdatedNote(@Res() res:Response,@Req() req:Request){
     
            const noteUpdatedId = Number(req.params.id);
            let note = await Note.findOne({
                where:{
                    id:Equal(noteUpdatedId)
                }
            })
            if(note == null){
                return res.status(404)
            }
            note.title = req.body.title;
            note.body = req.body.body;
            try {
             const updated = await note.save();
            return res.json({
                note:updated
            })
        }catch(err){
            console.log(err)
        }
     }

     @Delete("/:id")
     async deleteNote(@Res() res:Response,@Req() req:Request){
        try {
            const numberId = Number(req.params.id);
            let note = await Note.findOne({
               where:{
                   id:Equal(numberId)
               }
            });
            if(note == null){
                return res.status(404);
            }
            await note.remove()
            return res.json({
                success:true
            })
        }catch(err){
            console.log(err)
        }
     }
}


export default NoteContaroller;