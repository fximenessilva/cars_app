import { Suspense } from "react";
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
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/cars"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CarsList />
            </Suspense>
          }
        />
        <Route
          path="/users"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <UsersList />
            </Suspense>
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
