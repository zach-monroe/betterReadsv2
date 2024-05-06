import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [backendData, setData] = useState({});
  console.log(id);

  useEffect(() => {
    fetch(`/api/edit/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  const { book } = backendData;
  console.log(JSON.stringify(backendData));

  return <h1>{JSON.stringify(book)}</h1>;
}

export default Edit;
