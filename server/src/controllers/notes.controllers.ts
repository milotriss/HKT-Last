import express from 'express'
import NoteService from '../services/notes.service'
import { INote } from '../types/notes.type'

const noteController = express.Router()
const noteService = new NoteService()
noteController
.get('/',async (req: express.Request, res: express.Response) => {
    try {
        const data = await noteService.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Get all"})
    }
})
.get('/:id',async (req: express.Request, res: express.Response) => {
    try {
        const id = +req.params.id
        const data = await noteService.getOne(id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"Get one"})
    }
})
.post('/',async (req: express.Request, res: express.Response) => {
    try {
        const data:INote = {content: req.body.content}
        await noteService.create(data)
        res.status(201).json('Created success')
    } catch (error) {
        res.status(500).json({message:"Create"})
    }
})
.delete('/:id', async (req: express.Request, res:express.Response) => {
    try {
        const id = +req.params.id
        const data = await noteService.delete(id) 
        if (data) {
            res.status(204).json('Deleted success')
        }else {
            res.status(404).json('not found')
        }
    } catch (error) {
        res.status(500).json({message:'Delete'})
    }
})
.patch('/:id', async (req: express.Request, res:express.Response)=>{
    try {
        try {
            const id = +req.params.id
            const updateData = {...req.body}
            const data = await noteService.update(id,updateData)
            if (data[0] === 0) {
                res.status(404).json('not found')
            }else {
                res.status(200).json('Update success')
            }
        } catch (error) {
            res.status(500).json({message: "update"})
        }
    } catch (error) {
        
    }
})
export default noteController;