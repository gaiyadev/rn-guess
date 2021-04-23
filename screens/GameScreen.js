import React, { useState, useRef } from "react";
import { View, Alert, Text, StyleSheet, Button } from "react-native";
import NumberContainer from "../components/numberContainer";
import Card from "../components/Card";
import Colors from "../constants/theme";

const generatRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generatRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generatRandomNumber(1, 100, props.userChoice)
  );
  const currentHigh = useRef(100);
  const currentLow = useRef(1);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't Lie!", "This is wrong", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generatRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponents Guess:</Text>
      <NumberContainer> {currentGuess} </NumberContainer>
      <Card style={styles.btnContainer}>
        <Button
          color={Colors.accent}
          title="Lower"
          onPress={nextGuessHandler.bind(this, "lower")}
        />
        <Button
          color={Colors.primary}
          title="Greater"
          onPress={nextGuessHandler.bind(this, "greater")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
  title: {
    fontSize: 22,
    color: Colors.accent,
  },
});
export default GameScreen;
