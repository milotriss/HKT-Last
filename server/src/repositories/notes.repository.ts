import Note from "../models/note.model";
import { INote } from "../types/notes.type";

export default class NoteRepository {
    async getAll():Promise<any>{
       return await Note.findAll()
    }
    async getOne(id:number):Promise<any>{
        return await Note.findAll({where: {id}})
    }
    async create(data:any){
        return await Note.create(data)
    }
    async delete(id:number){
        return await Note.destroy({where: {id}})
    }
    async update(id:number,updateData:any){
        return await Note.update(updateData,{where: {id}})
    }
}