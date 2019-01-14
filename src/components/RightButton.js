import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

const SwipeableButton = styled.TouchableHighlight`
  background-color: ${({ icon }) => (icon === 'trash' ? '#e6194B' : '#f58231')};
  height: 100%;
  width: 75px;
  margin: 0;
  justify-content: center;
  align-items: center;
`;

const RightButton = ({ icon, name, handlePress }) => {
  return (
    <SwipeableButton icon={icon} onPress={() => handlePress(name)}>
      <Icon name={icon} size={25} color={'#222222'} />
    </SwipeableButton>
  );
};

export default RightButton;
