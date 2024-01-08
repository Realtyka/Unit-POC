import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {UNEnvironment, UnitSDK} from 'react-native-unit-components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import UnitPOC from './UnitPOC';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    UnitSDK.init(UNEnvironment.sandbox);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <UnitPOC />
    </SafeAreaView>
  );
}

export default App;
