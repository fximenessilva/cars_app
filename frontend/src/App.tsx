import { Route, Routes } from "react-router-dom";

import Home from "@pages/Home";
import CarsList from "@pages/CarsList";
import UsersList from "@pages/UsersList";
import "@styles/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<CarsList />} />
      <Route path="/users" element={<UsersList />} />
    </Routes>
  );
}

export default App;
