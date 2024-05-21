import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ITask } from "../App";

interface Props {
  setCourseGoals: Dispatch<SetStateAction<ITask[]>>;
  modalIsVisible: boolean;
  setModalIsVisible: Dispatch<SetStateAction<boolean>>;
}

export const AddGoal = ({
  setCourseGoals,
  modalIsVisible,
  setModalIsVisible,
}: Props) => {
  const [taskName, setTaskName] = useState("");
  const [timeSelected, setTimeSelected] = useState({
    onConfirm: "00:00",
    onChange: "00:00",
  });
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isTodayEnabled, setIsTodayEnabled] = useState(true);
  const [borderColor, setBorderColor] = useState("#3C3C4330");

  function onConfirm() {
    setTimeSelected((prev) => ({
      ...prev,
      onConfirm: prev.onChange,
    }));
    setIsTimePickerOpen(false);
  }

  function onCancel() {
    setIsTimePickerOpen(false);
  }

  function onChange(time: Date) {
    let hours: number | string = time.getHours();
    let minutes: number | string = time.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    setTimeSelected((prev) => ({
      ...prev,
      onChange: hours + ":" + minutes,
    }));
  }

  function onSave() {
    if (!taskName) return setBorderColor("#ff0000");

    const today = new Date();
    const tomorrow = new Date(today.getDay() + 1);

    setCourseGoals((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        text: taskName,
        time: timeSelected.onConfirm,
        date: isTodayEnabled ? today : tomorrow,
        done: false,
      },
    ]);

    setTaskName("");
    setModalIsVisible(false);
  }

  return (
    <Modal
      visible={modalIsVisible}
      animationType="slide"
      onRequestClose={() => setModalIsVisible(false)}
    >
      <View style={styles.wrapper}>
        <View>
          <Pressable onPress={() => setModalIsVisible(false)}>
            <Text style={styles.back}>❮{"    "}Cancel</Text>
          </Pressable>
        </View>
        <Text style={styles.title}>Add a task</Text>
        <View>
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={{ ...styles.inputText, borderColor }}
              placeholder="Name example"
              placeholderTextColor={"#3C3C4330"}
              onChangeText={(text) => setTaskName(text)}
              value={taskName}
            />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.label}>Hour</Text>
            <Pressable
              style={styles.timeWrapper}
              onPress={() => setIsTimePickerOpen(true)}
            >
              <Text style={styles.time}>{timeSelected.onConfirm}</Text>
            </Pressable>
            <DateTimePickerModal
              isVisible={isTimePickerOpen}
              mode="time"
              isDarkModeEnabled
              onConfirm={onConfirm}
              onCancel={onCancel}
              onChange={onChange}
            />
          </View>
          <View
            style={{
              ...styles.inputsContainer,
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Today</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#34C759" }}
              thumbColor={isTodayEnabled ? "#FFFFFF" : "#f4f3f4"}
              ios_backgroundColor="#767577"
              onValueChange={() => setIsTodayEnabled((prev) => !prev)}
              value={isTodayEnabled}
            />
          </View>
        </View>
        <View>
          <Pressable onPress={onSave}>
            <View style={styles.button}>
              <Text style={styles.textButton}>Done</Text>
            </View>
          </Pressable>
          <Text style={styles.textWarning}>
            If you disable today, the task will be considered as tomorrow
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 30,
    backgroundColor: "#F7F8FA",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 32,
  },
  textButton: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#171717",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  textWarning: {
    color: "#3C3C4360",
    fontSize: 13,
  },
  inputsContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 20,
    fontWeight: "700",
  },
  inputText: {
    borderBottomWidth: 1,

    flex: 1,
    padding: 4,
    fontSize: 13,
  },
  time: {
    fontSize: 22,
  },
  timeWrapper: {
    backgroundColor: "#76768020",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  back: {
    fontSize: 16,
    fontWeight: "200",
    marginBottom: 64,
  },
});
