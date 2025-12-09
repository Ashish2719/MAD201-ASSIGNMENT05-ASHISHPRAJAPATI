import { Stack } from 'expo-router';
import React from 'react';
import { TaskProvider } from './context/TaskContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack 
        screenOptions={{
          headerStyle: { backgroundColor: '#3498db' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
      
        <Stack.Screen 
            name="screens/TaskTabs" 
            options={{ headerShown: false, title: 'Task Manager' }} 
        />
        
        <Stack.Screen 
            name="AddTaskScreen" 
            options={{ title: 'Add New Task', presentation: 'modal' }} 
        />
        
        <Stack.Screen 
            name="TaskDetailScreen" 
            options={{ title: 'Task Details' }} 
        />
        
      
        <Stack.Screen name="index" options={{ headerShown: false }} /> 
      </Stack>
    </TaskProvider>
  );
}