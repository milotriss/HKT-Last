import NoteRepository from "../repositories/notes.repository";
import { INote } from "../types/notes.type";

export default class NoteService {
    private noteRepository: NoteRepository;
    constructor() {
        this.noteRepository = new NoteRepository();
    }

    async getAll(): Promise<INote[]> {
        const data:INote[] = await this.noteRepository.getAll();
        return data;
    }
    async getOne(id:number): Promise<INote[]> {
        const data:INote[] = await this.noteRepository.getOne(id);
        return data;
    }
    async create(data:INote){
        await this.noteRepository.create(data);
    }
    async delete(id:number): Promise<any> {
        const data = await this.noteRepository.delete(id);
        return data;
    }
    async update(id:number,updateData:any): Promise<any> {
        const data = await this.noteRepository.update(id,updateData);
        return data;
    }
}