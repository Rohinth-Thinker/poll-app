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
  // console.log(authUser);

  return (
      <Routes>
        <Route path="/app/signup" element={ authUser ? <Navigate to={`/app/presentation/${authUser.userId}`} /> : <SignupPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/presentation/:userId/" element={ authUser ? <Provider store={store} > <CreatePresentationContainer /> </Provider> : <Navigate to="/app/signup" /> } />
        <Route path="/participate/:participationId?" element={ authUser ? <ParticipatePage /> : <Navigate to="/app/signup" /> } />
      </Routes>
  )
}

export default App
