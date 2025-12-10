/*
 * Course: MAD201-01
 * Assignment: 5
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: The Root Layout that sets up the main Stack Navigator and wraps the entire application in the TaskProvider.
 */


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
