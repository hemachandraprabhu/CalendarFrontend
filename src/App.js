import React, { useState, createContext} from "react";
import Navbar from "./components/Navbar/Navbar";
import Widget from "./components/Widget/Widget";

export const DateContext = createContext();

function App() {
  const [date, setDate] = useState(new Date());

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <DateContext.Provider value={{date, setDate, isMenuClicked}}>
      <Navbar  setIsMenuClicked={setIsMenuClicked}/>
      <Widget />
    </DateContext.Provider>
  );
}

export default App;