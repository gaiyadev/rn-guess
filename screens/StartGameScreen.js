import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/theme";
import Input from "../components/input";
import NumberContainer from "../components/numberContainer";

const StartGameScreen = (props) => {
  const [enterValue, setEnterValue] = useState("");
  const [comfirm, setComfirm] = useState(false);
  const [number, setNumber] = useState();

  const numberHandler = (input) => {
    setEnterValue(input.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnterValue("");
    setComfirm(false);
  };

  const comfirmInputHandler = () => {
    const chosenNumber = parseInt(enterValue);
    if (
      isNaN(chosenNumber) ||
      chosenNumber <= 0 ||
      chosenNumber > 99 ||
      chosenNumber === undefined
    ) {
      Alert.alert("Invalid!", "Number has to be between 1-99", [
        { text: "okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setComfirm(true);
    setNumber(chosenNumber);
    setEnterValue("");
    Keyboard.dismiss();
  };

  let comfirmedOutput;
  if (comfirm) {
    comfirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <View>
          <NumberContainer> {number} </NumberContainer>
          <Button
            onPress={() => props.onStartGame(number)}
            title="START GAME"
          />
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number </Text>
          <Input
            autoCorrect={false}
            maxLength={2}
            onChangeText={numberHandler}
            keyboardType="number-pad"
            blurOnSubmit
            style={styles.input}
            value={enterValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={Colors.accent}
                title="Reset"
                onPress={resetInputHandler}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title="Comfirm"
                onPress={comfirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {comfirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  button: {
    width: 100,
  },
  input: {
    width: 80,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
