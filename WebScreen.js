import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const WebScreen = ({setShowWeb, setShowGame}) => {
  const [indicator, setIndicator] = useState(true);

  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: 'https://sitename.site/terms.php',
        }}
        onMessage={event => {}}
        javaScriptEnabled={true}
        style={{marginTop: 36}}
        onLoadEnd={syntheticEvent => {
          setIndicator(false);
        }}
        allowsInlineMediaPlayback={true}
        onHttpError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log(nativeEvent.statusCode);
          if (nativeEvent.statusCode === 404) {
            setShowWeb(false)
            setShowGame(true)
          }
        }}
        onError={err => {
          console.log(err);
        }}
      />
      {indicator && (
        <View style={styles.loader}>
          <ActivityIndicator color="#000" size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    width: 55,
    height: 55,
    top: Dimensions.get('window').height / 2 - 25,
    left: Dimensions.get('window').width / 2 - 25,
  },
  nextBlock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 200,
    height: 45,
    backgroundColor: '#feb000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default WebScreen;
