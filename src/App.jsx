import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvide";
import { Provider } from "react-redux";
import store from "./store";

import Login from "./pages/Registraction/Login";
import Signup from "./pages/Registraction/Signup";

import StuffDashboard from "./pages/Stuffs/StuffDashboard";
import UserDashboard from "./pages/Users/UserDashboard";

export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/users" element={<UserDashboard />} />
            {/* <Route path="/user/profile" element={< />} /> */}
            <Route path="/stuffs" element={<StuffDashboard />} />
            
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="*" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}
