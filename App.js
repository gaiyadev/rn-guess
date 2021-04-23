import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

// const loadFonts = () => {
//   return Font.loadAsync({
//     openSans: require("./assets/fonts/OpenSans-regular.ttf"),
//     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
//   });
// };

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRound] = useState(0);
  const [loaded, setLoaded] = useState(0);

  // if (!loaded) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => {
  //         setLoaded(true);
  //       }}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setUserNumber(selectedNumber);
  };
  const gameOverHandler = (numOfRound) => {
    setGuessRound(numOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoce={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen roundedNumber={guessRound} userNumber={userNumber} />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
