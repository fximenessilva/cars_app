import { ReactNode, FC } from "react";

import AppProvider from "@contexts/AppContext";
import CarsProvider from "@contexts/CarsContext";
import UsersProvider from "@contexts/UsersContext";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <AppProvider>
      <UsersProvider>
        <CarsProvider>
          <Header />
          {children}
          <Footer />
        </CarsProvider>
      </UsersProvider>
    </AppProvider>
  );
};

export default Wrapper;
