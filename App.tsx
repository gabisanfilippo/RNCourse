import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { GoalItem } from "./components/GoalItem";
import { GoalInput } from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState<
    { text: string; id: string }[]
  >([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  return (
    <View style={styles.appContainer}>
      <Button
        title="Add New Goal"
        color={"#5e0acc"}
        onPress={startAddGoalHandler}
      />
      <GoalInput
        setCourseGoals={setCourseGoals}
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GoalItem item={item} setCourseGoals={setCourseGoals} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
  },
  goalsContainer: {
    flex: 5,
  },
});
