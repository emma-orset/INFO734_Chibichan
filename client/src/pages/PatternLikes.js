import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Pattern/Thread";
import { isEmpty } from "../components/Utils";

const PatternLikes = () => {
  let patternsAll = useSelector((state) => state.patternReducer);
  const memberData = useSelector((state) => state.memberReducer);
  const [types, setTypes] = useState([]);
  const [tags, setTags] = useState([]);
  const targetIds = [];

  memberData.patternLikes.forEach((idPattern) => {
    targetIds.push(idPattern);
  });

  let patterns = patternsAll.filter((pattern) => targetIds.includes(pattern._id));

  // State pour stocker les tags sélectionnés par l'utilisateur pour le filtrage
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedTypes, setSelectedTypes] = useState([]);

  // State pour stocker la valeur de la barre de recherche
  const [searchValue, setSearchValue] = useState("");

  // Création d'une référence de champ de formulaire pour accéder aux cases à cocher plus tard
  const formRef = useRef(null);

  // Filtre les patterns en fonction des tags sélectionnés par l'utilisateur
  const filteredByTags = Object.values(patterns).filter((pattern) => {
    return selectedTags.some((tag) => {
      return pattern.type === tag || pattern.tags.includes(tag);
    });
  });

  const filteredByTypes = Object.values(patterns).filter((pattern) => {
    return selectedTypes.some((type) => {
      return pattern.type === type;
    });
  });

  // Filtre les patterns en utilisant la valeur de la barre de recherche
  const filteredBySearch = Object.values(patterns).filter((pattern) => {
    pattern = (pattern.title ?? "")
      .toLowerCase()
    return pattern
      .includes(searchValue.toLowerCase());
  });


  let filteredPatterns = Object.values(patterns).filter((pattern) => {
    if (
      filteredByTags.length > 0 &&
      filteredBySearch.length > 0 &&
      filteredByTypes.length > 0
    ) {
      return (
        filteredByTags.includes(pattern) &&
        filteredBySearch.includes(pattern) &&
        filteredByTypes.includes(pattern)
      );
    } else if ((filteredByTags.length > 0 || filteredByTypes.length > 0) && filteredBySearch.length === 0) {
      return false
    }
    else if (filteredByTags.length > 0 && filteredBySearch.length > 0) {
      return (
        filteredByTags.includes(pattern) && filteredBySearch.includes(pattern)
      );
    } else if (filteredByTags.length > 0 && filteredByTypes.length > 0) {
      return (
        filteredByTags.includes(pattern) && filteredByTypes.includes(pattern)
      );
    } else if (filteredBySearch.length > 0 && filteredByTypes.length > 0) {
      return (
        filteredBySearch.includes(pattern) && filteredByTypes.includes(pattern)
      );
    } 
    else if (filteredByTags.length > 0) {
      return filteredByTags.includes(pattern);
    } else if (filteredBySearch.length > 0) {
      return filteredBySearch.includes(pattern);
    } else if (filteredByTypes.length > 0) {
      return filteredByTypes.includes(pattern);
    } else {
      return false;
    }
  });

  filteredPatterns.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    let types = [];
    let tags = [];
    if (!isEmpty(patterns)) {
      patterns.map((pattern) => {
        pattern.tags.map((tag) => {
          tags.push(tag);
        });
        types.push(pattern.type);
      });

      tags = [...new Set(tags)];
      tags = tags.sort();

      types = [...new Set(types)];
      types = types.sort();
    }
    setTags(tags)
    setTypes(types);

  }, [patternsAll]);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <Thread patterns={filteredPatterns} />
      </div>

      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <div className="filter-container">
              <div className="search-container">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>

              <form ref={formRef}>
                <h3>Filtrer par type</h3>
                {types.map((type) => {
                  return (
                    <div key={type}>
                      <input
                        type="checkbox"
                        id={type}
                        name={type}
                        value={type}
                        onChange={(e) => {
                          if (selectedTypes.includes(e.target.value)) {
                            setSelectedTypes(
                              selectedTypes.filter(
                                (type) => type !== e.target.value
                              )
                            );
                          } else {
                            setSelectedTypes([
                              ...selectedTypes,
                              e.target.value,
                            ]);
                          }
                        }}
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  );
                })}

                <h3>Filtrer par tags</h3>

                {!isEmpty(tags) &&
                  tags.map((tag) => {
                    return (
                      <div key={tag}>
                        <input
                          type="checkbox"
                          id={tag}
                          name={tag}
                          value={tag}
                          onChange={(e) => {
                            if (selectedTags.includes(e.target.value)) {
                              setSelectedTags(
                                selectedTags.filter(
                                  (tag) => tag !== e.target.value
                                )
                              );
                            } else {
                              setSelectedTags([
                                ...selectedTags,
                                e.target.value,
                              ]);
                            }
                          }}
                        />
                        <label htmlFor={tag}>{tag}</label>
                      </div>
                    );
                  })}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternLikes;
