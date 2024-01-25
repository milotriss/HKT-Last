import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./main.css";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import PopUpUpdate from "../popUpUpdate/popUpUpdate";
import { INote } from "../../types/notes.type";
import baseAxios from "../../configs/axios.config";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess, notifyWarning } from "../../common/toastify.common";
import formatDate from "../../common/date.common";

const Main = (): JSX.Element => {
  const [isPopUp, setIsPopUp] = useState<boolean>(false)
  const [notes,setNotes] = useState<INote[]>([])
  const [dataNote,setDataNote] = useState<INote>({
    content:''
  })
  const idUpdate = useRef(0)
  const title:any = useRef()
  const offPopUp = ():void => {
    setIsPopUp(false)
  }
  const handleGetNotes = async ():Promise<void> => {
    const data = await baseAxios.get('/notes')
    setNotes(data.data)
  }
  useEffect(()=> {
    handleGetNotes()
  },[])
  const changeNote = (e:ChangeEvent<HTMLTextAreaElement>):void => {
    setDataNote({
        ...dataNote,
        [e.target.name]: e.target.value
    })
  }
  
  const handleCreate = async():Promise<void> => {
    if (dataNote.content.length > 0) {
        try {
            await baseAxios.post('/notes', dataNote)
            title.current.focus()
            dataNote.content = ''
            notifySuccess('Note Created Successfully')
            handleGetNotes()
        } catch (error) {
            console.log('Error creating');
        }
    }else {
        notifyWarning('Enter title pls!')
    }
  }
  const handleDeleteNote = async(id:number):Promise<void> => {
    try {
        await baseAxios.delete(`/notes/${id}`)
        notifySuccess('Note Deleted Successfully')
        handleGetNotes()
    } catch (error) {
        notifyWarning('Delete note failed')
    }
  }
  return (
    <main>
      <section className="enterNotes">
        <div className="enterGroup">
          <h2>Title</h2>
          <div className="enterNote">
            <textarea autoFocus ref={title} onChange={changeNote} value={dataNote.content} placeholder="Enter your note" name="content" id=""></textarea>
          </div>
          <FaCirclePlus onClick={handleCreate} className="iconEnter"/>
        </div>
      </section>
      <section className="noteItems">
        {notes.length > 0 && notes.map((note:INote) => {
            return(
                <div key={note.id} className="noteItem">
                <p>{note.content}</p>
                <div className="noteItemActions">
                  <span>Create: {formatDate(String(note.createdAt))}</span>
                  <span>Update: {formatDate(String(note.updatedAt))}</span>
                  <FaRegTrashCan onClick={() => handleDeleteNote(Number(note.id))} className="iconNote"/>
                  <FaRegEdit onClick={() => {
                        idUpdate.current = Number(note.id);
                      setIsPopUp(true)
                  }} className="iconNote"/>
                </div>
              </div>
            )
        })}
       
      </section>
      {isPopUp ? <PopUpUpdate handleGetNotes={handleGetNotes} id={idUpdate.current} offPopUp={offPopUp}/> : null}
      <ToastContainer/>
    </main>
  );
};

export default Main;
