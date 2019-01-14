import {
  ADD_POINTS,
  RESET_SCORE,
  RESET_ALL,
  ADD_PLAYER,
  REMOVE_PLAYER,
  NEW_GAME
} from './actionTypes';

export const addPoints = (name, points) => {
  return {
    type: ADD_POINTS,
    payload: { name, points }
  };
};

export const addPlayer = player => {
  return {
    type: ADD_PLAYER,
    payload: player
  };
};

export const removePlayer = player => {
  return {
    type: REMOVE_PLAYER,
    payload: player
  };
};
export const resetAll = () => {
  return {
    type: RESET_ALL
  };
};
export const resetScore = name => {
  return {
    type: RESET_SCORE,
    payload: name 
  };
};
export const newGame = () => {
  return {
    type: NEW_GAME
  };
};
