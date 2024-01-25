import Note from "./note.model"

const createTable = () => {
    Note.sync().then(()=>console.log('Created table'))
}
export default createTable;