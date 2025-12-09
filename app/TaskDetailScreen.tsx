import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { useTasks } from './context/TaskContext';

const TaskDetailScreen: React.FC = () => {
  const { taskId } = useLocalSearchParams();
  const { tasks, toggleTask, deleteTask } = useTasks();
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found.</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleToggle = () => toggleTask(task.id);

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm("Delete this task?")) {
        deleteTask(task.id);
        router.back();
      }
    } else {
      Alert.alert("Confirm Delete", "Delete this task?", [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => { deleteTask(task.id); router.back(); } }
      ]);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.desc}>{task.description || "No description."}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Status:</Text>
        <Text style={task.isCompleted ? styles.done : styles.pending}>
          {task.isCompleted ? 'COMPLETED' : 'PENDING'}
        </Text>
      </View>
      <Button 
        title={task.isCompleted ? "Mark Pending" : "Mark Complete"} 
        onPress={handleToggle} 
        color={task.isCompleted ? "#f39c12" : "#27ae60"}
      />
      <View style={{height: 15}} />
      <Button title="Delete Task" onPress={handleDelete} color="#c0392b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f8f8' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15 },
  label: { fontWeight: 'bold', color: '#7f8c8d' },
  desc: { fontSize: 16, marginTop: 5 },
  done: { color: '#27ae60', fontWeight: 'bold' },
  pending: { color: '#f39c12', fontWeight: 'bold' }
});

export default TaskDetailScreen;