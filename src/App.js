import React from "react";
import Call from "./pages/Call";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/react-rtc-demo' element={<Call />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
