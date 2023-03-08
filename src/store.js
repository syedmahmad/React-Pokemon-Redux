import {composeWithDevTools} from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getdata from './reducers/pokemonData';
const store = createStore(getdata, {},composeWithDevTools(applyMiddleware(thunk)));
export default store;
