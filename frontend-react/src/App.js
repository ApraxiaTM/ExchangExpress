import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsMember from "./pages/NewsMember";
import FinishSetup from "./pages/login/FinishSetup";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/ProfileEdit";
import AddReceiver from "./pages/receiver/AddReceiver";
import Receivers from "./pages/receiver/Receivers";
import Successful from "./pages/transaction/Successful";
import TransactionHistory from "./pages/transaction/TransactionHistory";
import TransferForeign from "./pages/transaction/TransferForeign";
import TransferLocal from "./pages/transaction/TransferLocal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/finishsetup" element={<FinishSetup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/newsmember" element={<NewsMember/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profileEdit" element={<ProfileEdit/>}/>
          <Route path="/transactionHistory" element={<TransactionHistory/>}/>
          <Route path="/transferLocal" element={<TransferLocal/>}/>
          <Route path="/transferForeign" element={<TransferForeign/>}/>
          <Route path="/successful" element={<Successful/>}/>
          <Route path="/receivers" element={<Receivers/>}/>
          <Route path="/addReceiver" element={<AddReceiver/>}/>
          {/* <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
