import axios from 'axios';
export const fetchData = (offset) => dispatch => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then(response => {
        // console.log(response)
        // console.log(response.data);
        dispatch(   {
          type: 'FETCHDATA_SUCCESS',
          payload: response.data
        });
      })
      .catch(error => {
        dispatch(fetchDataFailure(error.message));
      });
  };
//these are my action here am defining action 
export const fetchDataPending = () => {
  return {
    type: 'FETCHDATA_PENDING'
  };
};
export const fetchDataSuccess = data => {
  return {
    type: 'FETCHDATA_SUCCESS',
    payload: data
  };
};
export const fetchDataFailure = error => {
  return {
    type: 'FETCHDATA_FAILURE',
    payload: error
  };
};
export const setAbilities = (abilities) => {
  return {
    type: 'SET_ABILITIES',
    payload: abilities
  };
};
export const setSpecies = (species) => {
  return {
    type: 'SET_SPECIES',
    payload: species
  };
};
export const setEvolsFrom = (evolsFrom) => {
  return {
    type: 'SET_EVOLS_FROM',
    payload: evolsFrom
  };
};

// export const setChainUrl = (chainUrl) => {
//   return {
//     type: 'SET_EVOLS_FROM',
//     payload: chainUrl
//   };
// };

//action for offset 
export const setOffset = (offset) => {
  return {
    type: 'SET_OFFSET',
    payload: offset
  };
};
//action for selected page
// actions.js
export const SELECT_PAGE = 'SELECT_PAGE';

export const selectPage = (pageNumber) => {
  return {
    type: SELECT_PAGE,
    payload: pageNumber
  };
}