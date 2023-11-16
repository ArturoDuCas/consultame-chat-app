import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext.jsx";
import {toast} from "react-toastify";
import Header from "../components/Header.jsx";
import DoctorMessage from "../components/DoctorMessage.jsx";
import PatientMessage from "../components/PatientMessage.jsx";


export default function ChatPage() {
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const socket = useWebSocket();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/");
      return;
    }

    if(!socket) {
      return;
    }

    socket.emit("Connect to Room", token, (response) => {
      if(!response.success) {
        localStorage.removeItem("token");
        navigate("/");
        toast.error(response.message);
      } else {
        toast.dismiss();
        toast.success(response.message);
      }
    });

  }, [socket]);

  return(
    <div className="h-screen">
      {finished && (
        <div className="absolute top-0 right-0 h-full w-full bg-neutral bg-opacity-95 z-10 flex flex-col gap-10 justify-center items-center pb-20">
          <ul className="steps steps-horizontal">
            <li className="step step-primary text-primary-content">Ingresa</li>
            <li className="step step-primary text-primary-content">Chatea</li>
            <li className="step step-primary text-primary-content">Finaliza</li>
          </ul>

          <h3
            className="text-4xl text-primary-content"
          >
            Sesión Finalizada
          </h3>


        </div>
      )}


    <Header finished={finished} setFinished={setFinished}/>

    <div className="py-6 px-4 h-5/6  overflow-y-scroll">
      <DoctorMessage
        name="Doctor García"
        time="10:40 pm"
        message="Hola, Jhon. ¿Cómo has estado?"
      />

      <PatientMessage
        name="Jhon Doe"
        time="10:42 pm"
        message="Hola, Doctor. He estado bien, gracias."
      />

    </div>
    </div>
  );
}