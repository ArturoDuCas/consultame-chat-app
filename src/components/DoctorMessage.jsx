export default function DoctorMessage({name, created_at, message}) {
  return(
    <div className="chat chat-start">
      <div className="chat-header pl-2">
        {name}
        <time className="text-xs opacity-50 ml-2">{created_at}</time>
      </div>
      <div className="chat-bubble max-w-xl chat-bubble-accent">{message}</div>
    </div>
  );
}