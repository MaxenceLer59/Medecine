import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hello_World from "./pages/Hello_World";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello_World />} />
        {/* // if nothing was found*/}
        <Route path="*" element={<Hello_World />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;