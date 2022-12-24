import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { MidContext } from "./components/AppContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMember } from "./actions/memberActions";

function App() {
  const [mid, setMid] = useState(null);
  const dispatch = useDispatch()


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

    if (mid) dispatch(getMember(mid))

  }, [mid]);

  return (
    <MidContext.Provider value={mid}>
      <Routes />
    </MidContext.Provider>
  );
}

export default App;
