import express from "express";
import NoteContaroller from "./controllers/noteController";
import { attachControllers } from "@decorators/express";
import {DataSource} from 'typeorm'
import Note from './Entites/note'
import cores from 'cors'
const app = express();
app.use(express.json())
app.use(cores())



attachControllers(app,[NoteContaroller]).then((res)=>{
    console.log("the controller has been attachment")
})

const dataSource = new DataSource({
    username:"postgres",
    password:"512005usBA",
    database:"noteapp",
    type:"postgres",
    port:5432,
    synchronize:true,
    entities:[
        Note
    ]
});


async function excute(){
   try{
    await dataSource.initialize().then((e)=>{
        console.log("the DB Connected")
        app.listen(2000,()=>console.log("the server started"))
    })
   }catch(err){
        console.log(err)
    }
}

excute()

