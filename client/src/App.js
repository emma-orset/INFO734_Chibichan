import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { MidContext } from "./components/AppContext";
import axios from "axios";

function App() {
  const [mid, setMid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => setMid(res.data))
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, [mid]);

  return (
    <MidContext.Provider value={mid}>
      <Routes />
    </MidContext.Provider>
  );
}

export default App;
