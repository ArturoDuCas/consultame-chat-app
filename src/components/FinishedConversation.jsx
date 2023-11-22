import {useNavigate} from "react-router-dom";

export default function FinishedConversation({finished}) {
  const navigate = useNavigate();

  return(
    <>
      {finished && (
        <div className="absolute top-0 right-0 h-full w-full bg-neutral bg-opacity-95 z-10 flex flex-col gap-5 justify-center items-center pb-36">
          <ul className="steps steps-horizontal mb-10">
            <li className="step step-primary text-primary-content">Ingresa</li>
            <li className="step step-primary text-primary-content">Chatea</li>
            <li className="step step-primary text-primary-content">Finaliza</li>
          </ul>

          <h3 className="text-4xl text-primary-content">
            Sesión Finalizada
          </h3>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>


        </div>
      )}
    </>
  );
}