import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav"
import Thread from "../components/Pattern/Thread";


const PatternLikes = () => {
  let patterns = useSelector((state) => state.patternReducer);
  const memberData = useSelector((state) => state.memberReducer);

  const targetIds = [];

  memberData.patternLikes.forEach(idPattern => {
    targetIds.push(idPattern)
  });

  patterns = patterns.filter((pattern) => targetIds.includes(pattern._id));


  return(
    <div className="home">
      <LeftNav/>
      <div className="main">
        <Thread patterns={patterns}/>
      </div>
  </div>
  ) 
};

export default PatternLikes;
