import { useEffect, useState }  from 'react';
import "../../css/editForm.css"

export default function EditForm({textTask,setTextTask}) {

const handlerChange=(e)=>{
    setTextTask(e.target.value);
    console.log(e.target.value);
}


    return (

<textarea onChange={handlerChange} className="taskContentEditForm" value={textTask} ></textarea>
    )
}
