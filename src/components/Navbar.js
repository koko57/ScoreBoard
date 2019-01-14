import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

const Nav = styled(View)`
  padding: 50px 20px 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Navbar = ({ resetGame, resetAll }) => {
  return (
    <Nav>
      <TouchableHighlight onPress={resetGame}>
        <Icon name="x-circle" size={25} color={'#030303'} />
      </TouchableHighlight>
      <TouchableHighlight onPress={resetAll}>
        <Icon name="rotate-ccw" size={25} color={'#030303'} />
      </TouchableHighlight>
    </Nav>
  );
};

export default Navbar;
