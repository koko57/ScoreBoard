import {
  ADD_POINTS,
  RESET_SCORE,
  RESET_ALL,
  ADD_PLAYER,
  REMOVE_PLAYER,
  NEW_GAME
} from '../actions/actionTypes';

const initialState = { players: [] };

export default (reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POINTS:
      const updatePlayer = state.players.find(
        player => player.name == payload.name
      );
      updatePlayer.points += payload.points;
      return {
        ...state,
        players: [
          ...state.players.filter(player => player.name != payload.name),
          updatePlayer
        ]
      };
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, payload]
      };
    case REMOVE_PLAYER:
      return {
        ...state,
        players: [...state.players.filter(player => player.name !== payload)]
      };
    case RESET_SCORE:
      const resetPlayer = state.players.find(player => player.name === payload);
      resetPlayer.points = 0;
      return {
        ...state,
        players: [
          ...state.players.filter(player => player.name !== payload),
          resetPlayer
        ]
      };
    case RESET_ALL:
      return {
        ...state,
        players: [
          ...state.players.map(player => ({
            ...player,
            points: 0
          }))
        ]
      };
    case NEW_GAME:
      return initialState;
    default:
      return state;
  }
});
