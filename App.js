import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignedInStack from './navigation';


export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
            animated={true}
            backgroundColor='black'
            barStyle='light-content'
            />
         <SignedInStack />
    </SafeAreaProvider>
  );
}


