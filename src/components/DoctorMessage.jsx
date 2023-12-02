import ReactQuill from 'react-quill';
import axios from "../services/axios.js";
import 'react-quill/dist/quill.snow.css';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";

export default function DoctorMessage({name, created_at, message, id, updateSpecificMessage, index, socket}) {
  const [editedMessage, setEditedMessage] = useState(message);
  let modalId = `my_modal_${id}`;

  const handleModalClose = () => {
    setEditedMessage(message);
  };


  useEffect(() => {
    const modal = document.getElementById(modalId);
    modal.addEventListener('close', handleModalClose);

    return () => {
      modal.removeEventListener('close', handleModalClose);
    };
  }, [message, modalId]);

  async function updateMessage() {
    let cleanMessage = editedMessage.replace(/<(?!\/?em\b)[^>]*>/gi, "");
    if(cleanMessage === "") {
      toast.dismiss()
      toast.error("El mensaje no puede estar vacío");
      return;
    }
    if (cleanMessage === message) {
      document.getElementById(modalId).close();
      return;
    }


    axios.put(`/message/${id}`, {message: cleanMessage})
      .then(response => {
        updateSpecificMessage(index, response.data.message);

        let data = {
          token: localStorage.getItem("token"),
          message: response.data.message,
          id,
        }

        socket.emit("Update Message", data);
        setEditedMessage(response.data.message);

      })
      .catch(error => {
        console.error(error);
      });

    document.getElementById(modalId).close();

  }

  return(
    <div className="chat chat-start">
      <div className="chat-header pl-2 flex justify-center items-center cursor-pointer"
           onClick={() => {
             document.getElementById(modalId).showModal()
           }}
      >
        {name}
        <time className="text-xs  opacity-50 ml-2">{created_at}</time>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>


      </div>
      <div className="chat-bubble max-w-xl text-white" style={{backgroundColor: "#78a889"}}>
        {message}
      </div>

      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Modificar mensaje</h3>
          <ReactQuill theme="snow"
                      value={editedMessage}
                      onChange={setEditedMessage}
                      modules={{
                        toolbar: [
                          ['italic'],
                        ],
                      }}
                      className="mb-4"
          />

          <div className="flex justify-center">
            <button
              className="btn btn-outline btn-success"
              onClick={updateMessage}
            >
              Guardar
            </button>
          </div>



        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}