import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags } from "../actions/patternActions";
import LeftNav from "../components/LeftNav";
import Log from "../components/Log";
import AddPattern from "../components/Pattern/AddPattern";
import Thread from "../components/Pattern/Thread";
import { isEmpty } from "../components/Utils";

const Home = () => {
  // Récupère les données des patterns et des membres du store Redux
  const patterns = useSelector((state) => state.patternReducer);
  const member = useSelector((state) => state.memberReducer);
  const tags = useSelector((state) => state.filterReducer);
  const [types, setTypes] = useState([]);

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
      return pattern.tags.includes(tag);
    });
  });

  const filteredByTypes = Object.values(patterns).filter((pattern) => {
    return selectedTypes.some((type) => {
      return pattern.type === type;
    });
  });

  // Filtre les patterns en utilisant la valeur de la barre de recherche
  const filteredBySearch = Object.values(patterns).filter((pattern) => {
    return (pattern.title ?? "")
      .toLowerCase()
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
    } else if (filteredByTags.length > 0) {
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

  const dispatch = useDispatch();

  // Récupère les tags de tous les patterns et met à jour le store Redux avec ces tags
  useEffect(() => {
    let types = [];
    let tags = [];
    if (!isEmpty(patterns)) {
      // Récupère tous les tags de chaque pattern
      patterns.map((pattern) => {
        pattern.tags.map((tag) => {
          tags.push(tag);
        });

        types.push(pattern.type);
      });
      // Supprime les tags en double et trie les tags par ordre alphabétique
      tags = [...new Set(tags)];
      tags = tags.sort();

      types = [...new Set(types)];
      types = types.sort();
    }

    // Met à jour le store Redux avec les tags uniques et triés
    dispatch(getTags(tags));

    setTypes(types);
  }, [patterns]);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {member.admin === true && <AddPattern />}

          {isEmpty(member) && <Log signIn={true} signUp={false} />}
        </div>

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
                  placeholder="Rechercher par titre"
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

export default Home;
