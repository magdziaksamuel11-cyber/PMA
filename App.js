import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Item from "./Item";

export default function App() {
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  function handleAddItem() {
    console.log("add", item);

    if (item.trim() === "") {
      console.log("nebola zadana uloha");
      return;
    }

    const newTask = {
      id: nextId,
      text: item.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setNextId((id) => id + 1);
    setItem("");

    console.log("uloha vytvorena", newTask);
  }

  function handleToggleItem(id) {
    console.log("zmena stavu s id:", id);

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = {
            ...task,
            completed: !task.completed,
          };

          console.log("novy stav:", updatedTask);
          return updatedTask;
        }

        return task;
      }),
    );
  }

  function handleOpenDeleteModal(task) {
    setSelectedTask(task);
    setModalVisible(true);
  }

  function handleConfirmDelete() {
    if (selectedTask === null) return;

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== selectedTask.id),
    );

    setModalVisible(false);
    setSelectedTask(null);
  }

  function handleCancelDelete() {
    setModalVisible(false);
    setSelectedTask(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={item}
          onChangeText={setItem}
          style={styles.input}
          placeholder="zadaj ulohu"
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />

        <Pressable style={styles.addButton} onPress={handleAddItem}>
          <Text style={styles.addButtonText}>ADD</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>UDALOSTI</Text>

      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => (
          <Item
            task={item}
            onToggle={handleToggleItem}
            onDelete={handleOpenDeleteModal}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>nemas nic</Text>}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>odstranit???</Text>

            <Text style={styles.modalMessage}>
              isto chces odstranit „{selectedTask?.text}"?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancelDelete}
              >
                <Text style={styles.modalButtonText}>ne</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={styles.modalButtonText}>ano</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 55,
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyText: {
    color: "#777777",
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 7,
  },
  cancelButton: {
    backgroundColor: "#777777",
  },
  deleteButton: {
    backgroundColor: "#dc2626",
  },
  modalButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
