import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/Feather';
import { addPoints, removePlayer, resetScore } from '../store/actions';
import StyledText from './common/StyledText';
import RightButton from './RightButton';
import AddPoints from './AddPoints';

const Bar = styled(View)`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.colors.players[props.color]};
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Wrapper = styled(View)`
  flex: 1;
  max-width: 33%;
`;

class PlayerBar extends Component {
  state = {
    name: '',
    add: false,
    swipeable: null
  };

  componentDidMount() {
    this.setState({ name: this.props.player });
  }

  toggleInput = () => {
    this.setState({ add: !this.state.add });
  };

  handleReset = () => {
    this.props.resetScore(this.state.name);
    this.swipeable.recenter();
  };

  render() {
    const { name, add } = this.state;
    const { points, removePlayer } = this.props;
    const rightButtons = [
      <RightButton handlePress={this.handleReset} icon="rotate-ccw" />,
      <RightButton handlePress={removePlayer} name={name} icon="trash" />
    ];
    return (
      <Swipeable
        rightButtons={rightButtons}
        onRightActionRelease={() => removePlayer(name)}
        rightActionActivationDistance={200}
        style={{ justifyContent: 'center' }}
        onRef={ref => (this.swipeable = ref)}
      >
        <Bar color={this.props.color}>
          <Wrapper>
            <StyledText>{name}</StyledText>
          </Wrapper>
          <Wrapper>
            <StyledText>{points}</StyledText>
          </Wrapper>
          <Wrapper>
            <TouchableOpacity
              onPress={this.toggleInput}
              style={{ alignItems: 'flex-end' }}
            >
              <Icon name="plus-circle" size={25} color={'#222222'} />
            </TouchableOpacity>
          </Wrapper>
        </Bar>
        {add && (
          <AddPoints
            color={this.props.color}
            toggleInput={this.toggleInput}
            name={name}
          />
        )}
      </Swipeable>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  addPoints: (name, points) => dispatch(addPoints(name, points)),
  removePlayer: player => dispatch(removePlayer(player)),
  resetScore: name => dispatch(resetScore(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerBar);
