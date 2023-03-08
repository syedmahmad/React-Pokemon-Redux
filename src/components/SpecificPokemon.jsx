import React, { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const SpecificPokemon = () => {
  // dispatch actions to the reducer functions
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log("Location",location)
  const pokemonName = location.pathname.split('/')[1];
  const pokemonNumber = location.pathname.split('/')[2];
  // console.log("Pokenumber is ",pokemonNumber);
  // console.log("PokeName",pokemonName);
  const [abilites, setAbilities] = useState();
  const [species, setSpecies] = useState();
  const [evolsFrom, setEvolsFrom] = useState();
  const [chainURL, setChainUrl] = useState();
  const pokemonCall = async () => {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`).then(function (response) {
      dispatch(setAbilities(response?.data?.abilities[0]?.ability?.name));
      dispatch(setSpecies(response?.data?.species?.url));
    });
  }
  useEffect(() => {

    pokemonCall();

  }, []);
  useEffect(() => {

    if (evolsFrom) {
      getFurtherSpecies();
    }
  }, [evolsFrom]);
  useEffect(() => {

    if (chainURL) {
      evolutionChain();
    }
  }, [chainURL]);

  useEffect(() => {

    if (species) {
      getSpecies();
    }
  }, [species]);

  const getSpecies = async () => {
    await axios.get(`${species}`).then(function (response) {
      dispatch(setEvolsFrom(response?.data?.evolves_from_species));
      console.log("Response Of Evolves from",response);
    });
  }
  const getFurtherSpecies = async () => {
    await axios.get(`${evolsFrom?.url}`).then(function (response) {
      // console.log("Responss of getFurhterSpecies", response.data.evolution_chain);
      dispatch(setChainUrl(response?.data?.evolution_chain));
    });
  }

  const evolutionChain = async () => {
    // console.log("chainUrl", chainURL);
    await axios.get(chainURL.url).then(function (response) {
      // console.log("Responss of Evolution chain::", response);
      const evolutionChain = response?.data;
      // console.log("Evolution chain data::", evolutionChain);
    });
  }



  return (
    <>
    <h1>Selected PokeMon is {pokemonName}</h1>
    <h2>Pokemon abilites :{abilites}</h2>
      {/* <h3>This Pokemon evolves from: {evolsFrom ? evolsFrom?.name : 'It does not evolve'}</h3> */}
    </>
  )
}
export default SpecificPokemon