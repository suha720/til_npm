import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Line from "./components/Line";
import Bar from "./components/Bar";

function App() {
  const test = 1;
  console.log(test);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈</h1>}></Route>
        <Route path="/about" element={<h1>About</h1>}></Route>
        <Route path="/bar" element={<Bar></Bar>}></Route>
        <Route path="/line" element={<Line></Line>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
