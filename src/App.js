import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Widget from "./components/Widget";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Widget userPicked="Day" />} />
        <Route path="/month" element={<Widget userPicked="Month" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;