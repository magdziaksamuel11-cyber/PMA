import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [item, setItem] = useState("");
  const [task, setTask] = useState([]);
  const [nextId, setNextId] = useState(1);

  function handleAddItem() {
    if (item.trim() === "") return;

    setTask((currentTasks) => [
      ...currentTasks,
      { id: nextId, text: item.trim() },
    ]);

    setNextId((id) => id + 1);
    setItem("");
  }

  function handleDeleteItem(id) {
    setTask((currentTasks) =>
      currentTasks.filter((taskItem) => taskItem.id !== id),
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={item}
          onChangeText={setItem}
          style={styles.input}
          placeholder="napis ulohu"
          onSubmitEditing={handleAddItem}
          returnKeyType="done"
        />

        <Button title="ADD" onPress={handleAddItem} />
      </View>

      <Text style={styles.title}>UDALOSTI</Text>

      <FlatList
        data={task}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text}</Text>

            <Button
              title="DEL"
              color="red"
              onPress={() => handleDeleteItem(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>nemas nic.</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 2,
    padding: 10,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  emptyText: {
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});
