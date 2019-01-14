import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import StyledText from './common/StyledText';
import StyledButton from './common/StyledButton';

const StartScreen = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StartBanner = ({ startGame }) => {
  return (
    <StartScreen>
      <StyledButton onPress={() => startGame()}>
        <StyledText>New Game</StyledText>
      </StyledButton>
    </StartScreen>
  );
};

export default StartBanner;
