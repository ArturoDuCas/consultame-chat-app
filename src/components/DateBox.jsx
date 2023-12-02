import {useState} from "react";

export default function DateBox() {
  const [date, setFecha] = useState(new Date());
  const month = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  return (
    <div className="flex items-center justify-center bg-gray-100 rounded-full">
        <p className="text-xs font-medium text-gray-500">
          {`${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()}`}
        </p>
    </div>
  );
}