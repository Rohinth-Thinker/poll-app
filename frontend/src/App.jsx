import { Provider } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import CreatePresentationContainer from "./pages/CreatePresentationContainer/CreatePresentationContainer";
import ParticipatePage from "./pages/ParticipatePage/ParticipatePage";
import store from "./app/store"
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useAuthContext } from "./context/AuthContext";

function App() {

  const { authUser } = useAuthContext();

  return (
      <Routes>
        <Route index element={ authUser ? <Navigate to={`/app/presentation/${authUser.userId}`} /> : <SignupPage />} />
        <Route path="/app/signup" element={ authUser ? <Navigate to={`/app/presentation/${authUser.userId}`} /> : <SignupPage />} />

        <Route path="/app/login" element={authUser ? <Navigate to={`/app/presentation/${authUser.userId}`} /> : <LoginPage />} />
        <Route path="/app/presentation/:userId/" element={ authUser ? <Provider store={store} > <CreatePresentationContainer /> </Provider> : <Navigate to="/app/login" /> } />
        <Route path="/participate/:participationId?" element={<ParticipatePage />} />
      </Routes>
  )
}

export default App
