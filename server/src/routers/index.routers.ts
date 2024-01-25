 import {Express} from 'express';
import noteController from '../controllers/notes.controllers';
const Router = (server:Express) => {
    server.use('/api/v1/notes',noteController)
}

export default Router;