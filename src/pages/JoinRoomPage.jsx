import {useEffect, useState} from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext.jsx";

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }

    if(localStorage.getItem("token")) {
      navigate("/chat");
      return;
    }

  }, [socket]);


  function handleJoinRoom(event) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      toast.error("El código de la sesión no puede estar vacío");
      return;
    }

    socket.emit("Room Connection Verification", roomCode, (response) => {
      if(response.success) {
        localStorage.setItem("token", response.token);
        toast.dismiss();
        toast.success(response.message)
        navigate(`/chat`);
      } else {
        toast.error(response.message);
      }
    });
  }
  return(
    <div className="w-full h-screen flex">
      <div className="w-1/2">
        <img
          src="/join-room.png"
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
          >
            Ingresar
          </button>
        </form>

      </div>

    </div>
  )
}