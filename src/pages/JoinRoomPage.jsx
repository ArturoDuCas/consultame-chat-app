import {useEffect, useState} from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext.jsx";

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const navigate = useNavigate();
  const socket = useWebSocket();


  useEffect(() => {
    // navigate("/chat")

    if (!socket) {
      return;
    }

    if(localStorage.getItem("token")) {
      navigate("/chat");
      return;
    }

    return () => {
      socket.off("Send Consultation Data");
    }
  }, [socket]);

  useEffect(() => {
    if(!socket) {
      return;
    }
    if(confirmation == null) {
      return;
    }

    socket.emit("Save Messages Confirmation", { confirmation, roomKey: roomCode });
    navigate(`/chat`);


  }, [confirmation]);



  function handleJoinRoom(event) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      toast.error("El código de la sesión no puede estar vacío");
      return;
    }

    if(!socket.connected) {
      toast.dismiss();
      toast.error("No se pudo conectar con el servidor");
      return;
    }

    socket.emit("Room Connection Verification", roomCode, (response) => {
      if(response.success) {
        document.getElementById('save-conversation-modal').showModal();
        toast.dismiss();
        toast.success(response.message)

        localStorage.setItem("token", response.token);
      } else {
        toast.error(response.message);
      }
    });
  }


  return(
    <div className="w-full h-screen flex">
      <dialog id="save-conversation-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">¡Hola!</h3>
          <p className="py-4">¿Confirmas tu autorización para que la conversación se guarde y el paciente pueda acceder a ella posterior a la consulta?</p>
          <div className="flex flex-row justify-end gap-3">
            <button
              className="btn btn-primary"
              onClick={() => setConfirmation(true)}
            >
              Confirmo
            </button>
            <button
              className="btn btn-outline btn-primary"
              onClick={() => setConfirmation(false)}
            >
              No Confirmo
            </button>
          </div>

        </div>
      </dialog>

      <div className="w-1/2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-r shadow-2xl">
        <img
          src="/background.svg"
          alt="Join Room"
          className="object-cover w-full h-full rounded-r-md"
        />
      </div>
      <div className="flex flex-col items-center w-1/2 my-24">
        <ul className="steps steps-horizontal mb-10">
          <li className="step step-primary">Ingresa</li>
          <li className="step">Chatea</li>
          <li className="step">Finaliza</li>
        </ul>

        <h1 className="text-4xl mb-2">Ingresa a una sesión</h1>
        <p
          className="mb-6 text-gray-500 px-24 text-center"
        >
          Ingresa el código de la sesión que se muestra dentro de la aplicación Consultame
        </p>
        <form>
          <input
            type="text"
            placeholder="Type here"
           className="input input-bordered w-full max-w-xs mb-2"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button
            className="btn btn-primary w-full max-w-xs"
            onClick={(e) => handleJoinRoom(e)}
            // onClick={(e) => handleJoinRoom(e)}
          >
            Ingresar
          </button>
        </form>

      </div>

    </div>
  )
}