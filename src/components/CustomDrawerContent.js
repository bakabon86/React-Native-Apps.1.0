import React from 'react';
import { DrawerItems } from 'react-navigation';
import styled from 'styled-components/native';

import Button from './Button';
import { View, ScrollView } from 'react-native';

const ContainerView = styled.View`
  flex: 1;
`;

// const ScrollView = styled.View`
//   flex: 1;
// `;

const DrawerContainer = styled.View`
  flex: 8;
`;

const AvatarContainer = styled.View`
  flex: 2;
  top: 5;
  alignItems: center;
  justifyContent: center;
`;

const Avatar = styled.View`
  width: 100;
  height: 100;
  borderRadius: 60;
  backgroundColor: ${props => props.theme.BLUE_100};
`;

const ItemContainer = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex: 2;
  justifyContent: center;
  alignItems: center;
`;

const CustomDrawerContent = (props) => (
  
    // <ContainerView>
    //   <DrawerContainer>
    //     <AvatarContainer>
    //       <Avatar />
    //     </AvatarContainer>
         
    //         <ItemContainer>
    //             <DrawerItems {...props} />
    //         </ItemContainer>
         
    //   </DrawerContainer>
    //   <ButtonContainer>
    //     <Button text="Logout" onPress={() => props.navigation.navigate('Login')} />
    //   </ButtonContainer>
    // </ContainerView>
    <View>
      <ScrollView> 
        <AvatarContainer>
           <Avatar />
        </AvatarContainer>
        <ItemContainer>
            <DrawerItems {...props} />
        </ItemContainer>
        <ButtonContainer>
          <Button text="Logout" onPress={() => props.navigation.navigate('Login')} />
        </ButtonContainer>
      </ScrollView>
    </View>
);

export default CustomDrawerContent;
