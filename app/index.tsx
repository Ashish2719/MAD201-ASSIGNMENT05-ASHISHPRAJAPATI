import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task, useTasks } from './context/TaskContext';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask, toggleTask } = useTasks();

  const handleDetailPress = () => {
    router.push({ pathname: "TaskDetailScreen", params: { taskId: task.id } });
  };
  

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${task.title}"?`)) {
        deleteTask(task.id);
      }
    } else {
      Alert.alert("Confirm Delete", `Delete "${task.title}"?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteTask(task.id), style: "destructive" }
      ]);
    }
  };

  return (
    <View style={styles.taskItem}>
      {/* Update Checkbox */}
      <TouchableOpacity onPress={() => toggleTask(task.id)} style={styles.iconButton}>
        <MaterialIcons 
          name={task.isCompleted ? "check-box" : "check-box-outline-blank"} 
          size={28} 
          color={task.isCompleted ? "#27ae60" : "#7f8c8d"} 
        />
      </TouchableOpacity>

     
      <TouchableOpacity onPress={handleDetailPress} style={styles.taskInfo}>
        <Text style={[styles.taskTitle, task.isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        <Text style={styles.taskStatus}>
          {task.isCompleted ? 'Completed' : 'Pending'}
        </Text>
      </TouchableOpacity>
      
      {/* Delete Button */}
      <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
        <MaterialIcons name="delete" size={26} color="#961506ff" />
      </TouchableOpacity>
    </View>
  );
};

const AllTasksScreen: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks found.</Text>}
        style={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('AddTaskScreen')}>
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  list: { padding: 10 },
  taskItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 15, marginVertical: 6, borderRadius: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3
  },
  taskInfo: { flex: 1, paddingHorizontal: 10 },
  taskTitle: { fontSize: 17, fontWeight: '600', color: '#2c3e50' },
  completedTitle: { textDecorationLine: 'line-through', color: '#95a5a6' },
  taskStatus: { fontSize: 13, color: '#7f8c8d' },
  iconButton: { padding: 5 },
  addButton: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: '#3498db', width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center', elevation: 5,
  },
  addText: { color: 'white', fontSize: 32 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#7f8c8d' }
});

export default AllTasksScreen;