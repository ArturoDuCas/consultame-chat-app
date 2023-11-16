export default function PatientMessage({name, time, message}) {
  return(
    <div className="chat chat-end">
      <div className="chat-header pr-2">
        {name}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>
      <div className="chat-bubble max-w-xl chat-bubble-accent ">{message}</div>
    </div>
  );
}