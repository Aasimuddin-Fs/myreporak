import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
const {width} = Dimensions.get('screen');
const colors = ['#BB0303', '#EB1313', '#F32424'];

const BackgroundShade = () => {
    return (
        <View style={styles.container}>
        {colors.map((x, i) => (
          <View
            style={[
              styles.bgCircle1,
              {
                backgroundColor: x,
                transform: [
                  {
                    translateX: -(width / 1.5) + (0.5 * width) / colors.length,
                  },
                  {
                    translateY:
                      -(width * 1) - (((i * 0.8) / 2) * width) / colors.length,
                  },
                ],
              },
            ]}
            key={i.toString()}
          />
        ))}
      </View>
    )
}

export default BackgroundShade

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    bgCircle1: {
      position: 'absolute',
      height: width * 2,
      width: width * 2,
      borderRadius: width,
      left: 0,
      top: 0,
    },
  });
