import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import { addPlayer } from '../store/actions';

const StyledInput = styled(TextInput)`
  margin: 15px auto;
  border-width: 2;
  padding: 10px;
  flex: 4;
  border-radius: 15px;
  border-color: #000;
  background-color: #fff;
`;

const PlayerInput = styled(View)`
  background-color: #deadaf;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 10;
`;

const AddPlayerButton = styled(TouchableOpacity)`
  flex: 1;
  align-items: flex-end;
  max-width: 20%;
`;

export class AddNewPlayer extends Component {
  state = {
    playerName: ''
  };

  handleSubmit = () => {
    const newPlayer = {
      name: this.state.playerName,
      points: 0,
      id: this.props.players.length
    };
    this.props.addPlayer(newPlayer);
    this.setState({ playerName: '' });
    this.props.toggleInput();
  };

  render() {
    const { playerName } = this.state;
    return (
      <PlayerInput>
        <StyledInput
          onChangeText={text => {
            this.setState({ playerName: text });
          }}
          onSubmitEditing={this.handleSubmit}
          value={playerName}
          autoFocus
          placeholder="New Player"
        />
        <AddPlayerButton onPress={this.handleSubmit}>
          <Icon name="user-plus" size={25} color={'#222222'} />
        </AddPlayerButton>
      </PlayerInput>
    );
  }
}

const mapStateToProps = state => ({
    players: state.players
  });

const mapDispatchToProps = dispatch => ({
  addPlayer: player => dispatch(addPlayer(player))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPlayer);
