import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

export default function Header({finished, setFinished}) {

  const navigate = useNavigate();


  return(
    <div className="navbar bg-neutral text-neutral-content flex items-center px-10 h-1/7 overflow-y-hidden">
      <div className="flex w-1/3">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
            <span className="text-xl">J</span>
          </div>
        </div>
        <h3 className="text-lg ml-2">
          Jhon Doe
        </h3>
      </div>


      <div className="w-1/3 flex justify-center">
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

      <div className="w-1/3 flex justify-end gap-4">

        <button
          className="btn btn-secondary"
          onClick={() => {
            localStorage.removeItem("token");
            toast.dismiss();
            navigate("/");

          }}
        >
          Exit
        </button>
      </div>

    </div>
  );
}