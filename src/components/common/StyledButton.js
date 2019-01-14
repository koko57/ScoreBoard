import { TouchableHighlight } from 'react-native';
import styled from 'styled-components';

const StyledButton = styled(TouchableHighlight)`
  width: 100%;
  background-color: ${props => props.theme.colors.main};
  align-items: center;
  align-self: center;
  height: 50px;
  justify-content: center;
`;

export default StyledButton;
