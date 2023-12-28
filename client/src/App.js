// import React from 'react'
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRouts";
import { UserProvider } from "./context/contactContext";

const App = () => {
  return (
    <div>
      <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </UserProvider>
    </div>
  );
};

export default App;
