import {useState} from "react";

export default function EditMessage({id, message, isFromUser, name, created_at}){
  const [editedMessage, setEditedMessage] = useState(message);



  console.log(id);
  return (
    <textarea
      className={` textarea textarea-bordered textarea-primary w-full
        ${isFromUser ? "chat chat-end" : "chat chat-start"}
      `}
      value={editedMessage}
      onChange={(e) => setEditedMessage(e.target.value)}
    />
    // <textarea
    //   className="bg-red-700 w-1/"
    //   type="text"
    //   value={editedMessage}
    //   onChange={(e) => setEditedMessage(e.target.value)}
    //
    // />
  )
}