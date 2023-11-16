import {Routes, Route} from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import JoinRoomPage from "./pages/JoinRoomPage.jsx"
import { WebSocketProvider } from "./context/WebSocketContext.jsx";

function App() {

  return (
      <WebSocketProvider>
        <Routes>
          <Route index element={<JoinRoomPage />}/>
          <Route path="/chat" element={<ChatPage/>} />
        </Routes>
      </WebSocketProvider>
  )
}

export default App
