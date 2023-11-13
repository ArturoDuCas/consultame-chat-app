import {Routes, Route} from "react-router-dom";
import ChatPage from "./pages/ChatPage.jsx";
import JoinRoomPage from "./pages/JoinRoomPage.jsx"

function App() {

  return (
  <Routes>
    <Route index element={<JoinRoomPage />}/>
    <Route path="/chat" element={<ChatPage/>} />
  </Routes>
  )
}

export default App
