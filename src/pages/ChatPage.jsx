import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext.jsx";
import {toast} from "react-toastify";
import Header from "../components/Header.jsx";
import DoctorMessage from "../components/DoctorMessage.jsx";
import PatientMessage from "../components/PatientMessage.jsx";
import FinishedConversation from "../components/FinishedConversation.jsx";


export default function ChatPage() {
  const [doctorName, setDoctorName] = useState("Doctor Garcia");
  const [patientName, setPatientName] = useState("Jhon Doe");
  const [finished, setFinished] = useState(false);
  const [messages, setMessages] = useState([]);
  const [actualDoctorMessage, setActualDoctorMessage] = useState("");
  const [actualPatientMessage, setActualPatientMessage] = useState("");
  const navigate = useNavigate();
  const socket = useWebSocket();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/");
      return;
    }

    if(!socket) {
      toast.error("No se pudo conectar con el servidor");
      return;
    }


    socket.on("Room Closed", message => {
      toast.dismiss();
      toast.error(message);
      localStorage.removeItem("token");
      setFinished(true);
    })


    socket.on("Send Complete Message", message => {
      console.log(message);
      if(message.is_from_user) {
        setActualPatientMessage("");
      } else {
        setActualDoctorMessage("");
      }

      let created_at = new Date();
      let formattedTime = created_at.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      setMessages(prevMessages => [...prevMessages, {
        is_from_user: message.is_from_user,
        message: message.message,
        id: message.id,
        created_at: formattedTime,
        is_starred: message.is_starred,
      }]);

      });

    socket.on("Send Message Being Written", message => {
      if(message.is_from_user) {
        setActualPatientMessage(message.message);
      } else {
        setActualDoctorMessage(message.message);
      }
      console.log(message);
    })



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

    return () => {
      socket.off("Room Closed");
      socket.off("Send Complete Message");
      socket.off("Send Message Being Written");
    };

  }, [socket]);

  return(
    <div className="h-screen flex flex-col">
    <FinishedConversation finished={finished}/>

    <Header finished={finished} setFinished={setFinished}/>

    <div className="py-6 px-4 h-4/6 overflow-y-scroll">
      {messages.map((message, index) => {
        if(message.is_from_user) {
          return(
            <PatientMessage
              key={index}
              name={patientName}
              created_at={message.created_at}
              message={message.message}
            />
          );
        } else {
          return(
            <DoctorMessage
              key={index}
              name={doctorName}
              created_at={message.created_at}
              message={message.message}
            />
          );
        }
      })}
    </div>

      <div className="flex flex-row h-2/6 border">

        <div className="w-1/2 h-full border-r p-4 overflow-y-scroll">
          <div className="chat chat-start">
            <div className="chat-header pl-2">
              {doctorName}
            </div>
            <div className="chat-bubble  chat-bubble-info">{actualDoctorMessage}</div>
          </div>
        </div>

        <div className="w-1/2 h-full p-4 overflow-y-scroll">
          <div className="chat chat-end">
            <div className="chat-header pl-2">
              {patientName}
            </div>
            <div className="chat-bubble  chat-bubble-info">{actualPatientMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}