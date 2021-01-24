// React
import React, { useState, useEffect } from 'react'

// React Native
import { Animated } from 'react-native'

// Local
import {
  Small,
  Original
} from './style';

const OriginalAnimated = Animated.createAnimatedComponent(Original)

export default function LazyImage({smallSource, source, shouldLoad}) {
  const opacity = new Animated.Value(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 500)
    }
  }, [shouldLoad])

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  return (
    <Small source={smallSource} resizeMode="contain" blurRadius={1.5}>
      {loaded && (
        <OriginalAnimated
          style={{ opacity }}
          source={source}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  ); 
}
