import { Route, Routes } from "react-router-dom";

import Wrapper from "@components/utils/Wrapper";
import Home from "@pages/Home";
import CarsList from "@pages/CarsList";
import UsersList from "@pages/UsersList";
import "@styles/app.scss";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/users" element={<UsersList />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
