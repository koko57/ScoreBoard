import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert, FlatList, TouchableHighlight } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';
import { removePlayer, resetAll, resetScore, newGame } from '../store/actions';
import StartBanner from '../components/StartBanner';
import Navbar from '../components/Navbar';
import AddNewPlayer from '../components/AddNewPlayer';
import PlayerBar from '../components/PlayerBar';
import StyledText from '../components/common/StyledText';

const StartButton = styled(TouchableHighlight)`
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  align-items: center;
  align-self: center;
  height: 50px;
  justify-content: center;
`;

class Main extends Component {
  state = {
    newGame: false,
    players: [],
    addNewPlayer: false,
    playerName: ''
  };

  startGame = () => {
    this.setState({ newGame: true });
  };

  toggleInput = () => {
    this.setState({ addNewPlayer: !this.state.addNewPlayer });
  };

  resetGame = () => {
    Alert.alert('Quit current game?', '', [
      {
        text: 'Quit',
        onPress: () => {
          this.props.newGame();
          this.setState({
            newGame: false,
            addNewPlayer: false,
            playerName: ''
          });
        }
      },
      {
        text: 'Cancel',
        style: 'cancel'
      }
    ]);
  };
  resetAllScores = () => {
    Alert.alert('Restart the game?', '', [
      {
        text: 'Restart',
        onPress: () => {
          this.props.resetAll();
        }
      },
      {
        text: 'Cancel',
        style: 'cancel'
      }
    ]);
  };

  render() {
    const { addNewPlayer, playerName, newGame } = this.state;
    const { players } = this.props;
    if (!newGame) {
      return <StartBanner startGame={this.startGame} />;
    }
    return (
      <View style={{ margin: 'auto', flex: 1, justifyContent: 'center' }}>
        <Navbar resetGame={this.resetGame} resetAll={this.resetAllScores} />
        <KeyboardAwareScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
          extraScrollHeight={15}
          extraHeight={15}
          keyboardShouldPersistTaps="always"
        >
          <FlatList
            data={this.props.players.sort((a, b) => b.points - a.points)}
            renderItem={({ item }) => (
              <PlayerBar
                color={item.id}
                player={item.name}
                points={item.points}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
          {addNewPlayer && <AddNewPlayer toggleInput={this.toggleInput} />}
          {!addNewPlayer && (
            <StartButton onPress={() => this.toggleInput()}>
              <StyledText>New Player</StyledText>
            </StartButton>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  removePlayer: player => dispatch(removePlayer(player)),
  resetScore: name => dispatch(resetScore(name)),
  resetAll: () => dispatch(resetAll()),
  newGame: () => dispatch(newGame())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
