import { useEffect, useState }  from 'react';
import "../../css/editForm.css"

export default function EditForm() {
const [text, setText] = useState("")
    useEffect(() => {
        const getTaskContent = async () => {
            console.log("hola");
        //   const data = await getTask();
          
        };
        getTaskContent();
      },[]);
    return (

<textarea className="taskContentEditForm"  value={text} />
    )
}
