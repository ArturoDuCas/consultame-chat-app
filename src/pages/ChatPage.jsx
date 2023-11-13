import {useState} from "react";

export default function ChatPage() {
  const [finished, setFinished] = useState(false);


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



    <div className="navbar bg-neutral text-neutral-content flex justify-between items-center px-10 h-1/7 overflow-y-hidden">
      <div className="flex">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
            <span className="text-xl">J</span>
          </div>
        </div>
          <h3 className="text-lg ml-2">
            Jhon Doe
          </h3>
        </div>

      {!finished && (
        <ul className="steps steps-horizontal">
          <li className="step step-primary">Ingresa</li>
          <li className="step step-primary">Chatea</li>
          <li
            className="step"
            onClick={() => setFinished(true)}
          >Finaliza</li>
        </ul>
      )}

      </div>

    <div className="py-6 px-4 h-5/6  overflow-y-scroll">
      <div className="chat chat-start">
        <div className="chat-header pl-2">
          Doctor García
          <time className="text-xs opacity-50 ml-2">10:41 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent"> ¡Buenos días! Soy el Dr. García. Estoy aquí para ayudarte hoy. ¿Cómo te has estado sintiendo?</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header pr-2">
          Jhon Doe
          <time className="text-xs opacity-50 ml-2">10:43 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent ">Buenos días, Doctor. He estado bien, pero me preocupa un poco mi presión arterial.</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-header pl-2">
          Doctor García
          <time className="text-xs opacity-50 ml-2">10:45 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent"> Entiendo. ¿Has notado algún síntoma en particular, como dolores de cabeza o mareos?</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header pr-2">
          Jhon Doe
          <time className="text-xs opacity-50 ml-2">10:47 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent ">Sí, he tenido algunos dolores de cabeza recientemente.</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-header pl-2">
          Doctor García
          <time className="text-xs opacity-50 ml-2">10:48 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent">¿Has llevado un registro de tu presión arterial en casa?</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header pr-2">
          Jhon Doe
          <time className="text-xs opacity-50 ml-2">10:49 pm</time>
        </div>
        <div className="chat-bubble max-w-xl chat-bubble-accent ">Sí, la he medido y parece estar más alta de lo normal.</div>
      </div>
    </div>
    </div>
  );
}