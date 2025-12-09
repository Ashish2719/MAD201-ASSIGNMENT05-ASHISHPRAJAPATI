import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task, useTasks } from '../context/TaskContext';

const CompletedTaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTask } = useTasks();

  return (
    <TouchableOpacity 
      onPress={() => router.push({ pathname: "TaskDetailScreen", params: { taskId: task.id } })} 
      style={styles.taskItem}
    >
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, styles.completedTitle]}>{task.title}</Text>
        <Text style={styles.taskStatus}>Status: Completed ✅</Text>
      </View>
      
      
      <TouchableOpacity onPress={() => toggleTask(task.id)} style={styles.iconButton}>
        <MaterialIcons name="undo" size={24} color="#f39c12" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const CompletedScreen: React.FC = () => {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter(task => task.isCompleted);

  return (
    <View style={styles.container}>
      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CompletedTaskItem task={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No completed tasks yet.</Text>
        }
        style={styles.list}n
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ede5abff' },
  list: { padding: 10 },
  taskItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 15, marginVertical: 6, backgroundColor: '#fff', borderRadius: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 3
  },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 17, fontWeight: '600', color: '#2c3e50' },
  completedTitle: { textDecorationLine: 'line-through', color: '#95a5a6' },
  taskStatus: { fontSize: 14, color: '#27ae60', marginTop: 4 },
  iconButton: { padding: 8 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#7f8c8d' }
});

export default CompletedScreen;