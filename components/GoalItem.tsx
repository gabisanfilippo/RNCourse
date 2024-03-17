import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  item: { text: string; id: string };
  setCourseGoals: Dispatch<SetStateAction<{ text: string; id: string }[]>>;
}

export const GoalItem = ({ item, setCourseGoals }: Props) => {
  function deleteGoalHandler(id: string) {
    setCourseGoals((prev) => prev.filter((goal) => goal.id !== id));
  }

  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={deleteGoalHandler.bind(this, item.id)}
        android_ripple={{ color: "#230649" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{item.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    padding: 8,
    color: "#ffffff",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
