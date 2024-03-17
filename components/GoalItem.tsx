import { StyleSheet, Text, View } from "react-native";

interface Props {
  item: string;
}

export const GoalItem = ({ item }: Props) => {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    padding: 8,
  },
  goalText: {
    color: "#ffffff",
  },
});
