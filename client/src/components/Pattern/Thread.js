import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPatterns } from "../../actions/patternActions";
import { isEmpty } from "../Utils";
import Card from "./Card";

const Thread = ({patterns}) => {
  const [loadPattern, setLoadPattern] = useState(true);
  const [count, setCount] = useState(10)
  const dispatch = useDispatch();

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoadPattern(true)
    }
  }

  useEffect(() => {
    if (loadPattern) {
      dispatch(getPatterns(count));
      setLoadPattern(false);
      setCount(count + 10)
    }

    window.addEventListener('scroll', loadMore)
    return () => window.removeEventListener('scroll', loadMore)
  }, [loadPattern, dispatch]);



  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(patterns[0]) &&
          patterns.map((pattern) => {
            return <Card pattern={pattern} key={pattern._id} />;
          })}
          {isEmpty(patterns[0]) && (
            <span>Aucun patron trouvé ...</span>)}

      </ul>
    </div>
  );
};

export default Thread;
