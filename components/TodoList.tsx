import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./Task";

interface TaskItem {
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    Keyboard.dismiss();
    setTaskItems([...taskItems, { text: task, completed: false }]);
    setTask("");
  };

  const toggleTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  };

  const deleteTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => toggleTask(index)}>
                  <Task
                    task={item}
                    onDelete={() => deleteTask(index)}
                    onToggle={() => toggleTask(index)}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container Styles
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  // Task List Area Styles
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#0c9fd2",
  },
  // Section "Task" Title Styles
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  // Task Items Styles (div holding all tasks)
  items: {
    marginTop: 30,
  },
  // Input Field + Task Button Styles
  writeTaskWrapper: {
    position: "absolute",
    top: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  // Input Field Styles
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  // Task Button Styles
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
