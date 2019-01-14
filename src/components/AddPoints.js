import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import { addPoints } from '../store/actions';

const AddPointsInput = styled(TextInput)`
  text-align: center;
  flex: 2;
`;

const InputWrapper = styled(View)`
  flex-direction: row;
  position: absolute;
  align-items: center;
  background-color: ${props => props.theme.colors.players[props.color]};
  justify-content: space-between;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 20px;
`;

const Plus = styled(TouchableOpacity)`
  flex: 1;
  align-items: flex-end;
  max-width: 33%;
`;

class AddPoints extends Component {
  state = {
    pointsToAdd: ''
  };

  handleSubmit = () => {
    const { pointsToAdd } = this.state;
    const { name, toggleInput, addPoints } = this.props;
    if (pointsToAdd) {
      addPoints(name, Number(pointsToAdd));
      this.setState({ pointsToAdd: '' }, () => toggleInput());
    } else {
      toggleInput();
    }
  };

  handleReset = () => {
    this.props.resetScore(this.state.name);
    this.swipeable.recenter();
  };

  render() {
    const { pointsToAdd } = this.state;
    return (
      <InputWrapper color={this.props.color}>
        <AddPointsInput
          autoFocus
          keyboardType="number-pad"
          value={pointsToAdd}
          onChangeText={pointsToAdd => this.setState({ pointsToAdd })}
          onSubmitEditing={this.handleSubmit}
          onBlur={this.handleSubmit}
          placeholder="Add"
        />
        <Plus onPress={this.handleSubmit}>
          <Icon name="plus-circle" size={25} color={'#222222'} />
        </Plus>
      </InputWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPoints: (name, points) => dispatch(addPoints(name, points))
});

export default connect(
  null,
  mapDispatchToProps
)(AddPoints);
