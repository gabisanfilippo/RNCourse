import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";

interface Props {
  setCourseGoals: Dispatch<SetStateAction<{ text: string; id: string }[]>>;
  modalIsVisible: boolean;
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const GoalInput = ({
  setCourseGoals,
  modalIsVisible,
  setModalIsVisible,
}: Props) => {
  const [enteredGoalText, setEnteredGoalText] = useState("");

  function goalInputHandler(enteredText: string) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setEnteredGoalText("");
    setModalIsVisible(false);
  }

  return (
    <Modal visible={modalIsVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Your course goal!"
          style={styles.textInput}
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
});
