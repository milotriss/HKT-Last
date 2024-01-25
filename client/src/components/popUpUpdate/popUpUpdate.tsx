import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import "./popUpUpdate.css";
import { INote } from "../../types/notes.type";
import baseAxios from "../../configs/axios.config";

interface Props {
  offPopUp: Function;
  id: number;
  handleGetNotes: Function;
}
const PopUpUpdate = (props: Props): JSX.Element => {
  const [notes, setNotes] = useState<INote>();
  const [data, setData] = useState<INote>({
    content: "",
  });
  const handleGetNote = async (id: number): Promise<void> => {
    const data = await baseAxios.get(`/notes/${id}`);
    setNotes(data.data);
  };
  useEffect(() => {
    handleGetNote(props.id);
  }, []);
  const changeUpdate = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setData({
      ...data,
      content: e.target.value,
    });
  };
  const handleUpdateNote = async (id:number): Promise<void> => {
    try {
        await baseAxios.patch(`/notes/${id}`,data)
        props.handleGetNotes()
        props.offPopUp()
    } catch (error) {
        console.log('Err');
        
    }
  }
  
  return (
    <div onClick={() =>{setData({
        content:''
    }) ;props.offPopUp()}} className="popUpUpdateOverlay">
      <div
        onClick={(e: MouseEvent<HTMLElement>) => e.stopPropagation()}
        className="popUpUpdate"
      >
        <textarea onChange={changeUpdate} value={data.content} id="">
          {notes?.content}
        </textarea>
        <button
          onClick={() => {
            handleUpdateNote(props.id);
            props.offPopUp();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default PopUpUpdate;
