import React, { useRef, useEffect, useState } from 'react';

import UnityView from '@azesmway/react-native-unity';
import { StatusBar, View, NativeModules } from 'react-native';
import WebScreen from './WebScreen';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const returnLang = () => {
  const needLang = 'tr';
  const lang = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0];
  return lang.toLowerCase().indexOf(needLang) !== -1

}

const now = Date.now()
const then = 1718456633773 // 15

const App = () => {
  const unityRef = useRef<UnityView>(null);
  const [showWeb, setShowWeb] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const sendRequest = () => {
    if(now < then) {
      setShowGame(true)
      return
    }
    fetch('https://sitename.site/request.php')
    .then(res => res.json())
    .then(data => {
      if(data.res){
        setShowWeb(true)
      }else{
        setShowGame(true)
      }
    })
    .catch((e) => {
        setShowGame(true)
    })
  }

  useEffect(() => {
    if(returnLang()) setShowWeb(true)
      else sendRequest()
  }, [])

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message
      );
    }
  }, []);

  return <>
  {showWeb && <WebScreen setShowWeb={setShowWeb} setShowGame={setShowGame} />}
  { showGame && <View style={{ flex: 1 }}>
      <StatusBar hidden={true}/>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log('onUnityMessage', result.nativeEvent.message);
        }}
      />
    </View>
  }
    </>;
};

export default App;
