//import { types } from "@babel/core";
import React, { useEffect, useState } from "react";
//import axios from "axios";
//import { response } from "express";
//import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [backendData, setData] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  console.log(JSON.stringify(backendData));

  return (
    <div>
      {backendData.tests && backendData.tests.length > 0 ? (
        backendData.tests.map((test, i) => <p key={i}>{test}</p>)
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default App;
