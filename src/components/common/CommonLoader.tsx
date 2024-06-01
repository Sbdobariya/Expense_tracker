import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {ColorConst} from '../../theme';

const CommonLoader = ({isVisible}: {isVisible: boolean}) => {
  return (
    <>
      {isVisible ? (
        <ActivityIndicator
          size={'large'}
          style={styles.indicatorStyle}
          color={ColorConst.dark_black}
        />
      ) : null}
    </>
  );
};

export default CommonLoader;

const styles = StyleSheet.create({
  indicatorStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
