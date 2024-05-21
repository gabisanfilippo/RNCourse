import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Checkbox } from "./Checkbox";
import { ITask } from "../App";

interface Props {
  mode: "today" | "tomorrow";
  item: ITask;
  setCourseGoals: Dispatch<SetStateAction<ITask[]>>;
}

export const GoalItem = ({ item, setCourseGoals, mode }: Props) => {
  function onChange() {
    setCourseGoals((prev) =>
      prev.map((task) =>
        task.id !== item.id ? task : { ...task, done: !task.done }
      )
    );
  }

  return (
    <View style={styles.wrapper}>
      {mode === "today" && (
        <Checkbox isChecked={item.done} onChange={onChange} />
      )}
      {mode === "tomorrow" && (
        <View style={styles.circleWrapper}>
          <View style={styles.circle}></View>
        </View>
      )}

      <View style={styles.taskWrapper}>
        <Text
          style={{
            ...styles.text,
            textDecorationLine: item.done ? "line-through" : "none",
            opacity: item.done ? 0.3 : 1,
          }}
        >
          {item.text}
        </Text>
        <Text
          style={{
            ...styles.time,
            textDecorationLine: item.done ? "line-through" : "none",
            opacity: item.done ? 0.3 : 1,
          }}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
    maxWidth: "90%",
  },
  circleWrapper: {
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 46,
    backgroundColor: "#000000",
  },
  taskWrapper: {
    gap: 8,
  },
  text: {
    color: "#737373",
    fontSize: 15,
    fontWeight: "400",
  },
  time: {
    fontSize: 13,
    fontWeight: "400",
    color: "#A3A3A3",
  },
});
