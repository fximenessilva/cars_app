import { ReactNode, FC } from "react";

import AppProvider from "@contexts/AppContext";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <AppProvider>
      <Header />
      {children}
      <Footer />
    </AppProvider>
  );
};

export default Wrapper;
