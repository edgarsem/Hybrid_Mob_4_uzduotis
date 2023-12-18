import { View, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/AntDesign';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function AnimatedIconComponent({ iconName, onPress }) {
  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const [iconPressed, setIconPressed] = useState(false);

  const iconStyle = useState( iconName=='paperclip' ? 
  {justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}
  : {justifyContent: 'center', alignItems: 'center'}
  );

  const [iconColor, setIconColor] = useState();

  const spin = spinAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '360deg', '0deg'],
  });


  useEffect(() => {
    (iconName=='paperclip' || iconName=='close') ? setIconColor('#176B87') : setIconColor('#fff')
    rotate();
  });

  
  function rotate() {
    Animated.spring(spinAnim, {
      toValue: iconPressed ? 0 : 1,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View style={iconStyle}>
      <AnimatedIcon
        name={iconName}
        size={40}
        color={iconColor}
        style={{ transform: [{ rotate: spin }] }}
        onPress={() => {
          setIconPressed(!iconPressed);
          if (onPress) {
            onPress();
          }
        }}
      />
    </View>
  );
}

export default AnimatedIconComponent;
