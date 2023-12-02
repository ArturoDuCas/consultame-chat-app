export default function PatientMessage({name, created_at, message}) {
  return(
    <div className="chat chat-end">
      <div className="chat-header pr-2">
        {name}
        <time className="text-xs opacity-50 ml-2">{created_at}</time>
      </div>
      <div className="chat-bubble max-w-xl chat-bubble-primary text-white">
        {message}

      </div>
    </div>
  );
}