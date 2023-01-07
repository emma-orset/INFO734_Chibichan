import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import AddPattern from "../components/Pattern/AddPattern";
import Thread from "../components/Pattern/Thread";
import { isEmpty } from "../components/Utils";

const Home = () => {
  const patterns = useSelector((state) => state.patternReducer);
  const member = useSelector((state) => state.memberReducer);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {member.admin === true && <AddPattern />}

          {isEmpty(member) && <Log signIn={true} signUp={false} />}
        </div>
        <Thread patterns={patterns} />
      </div>
    </div>
  );
};

export default Home;
