/*
 * Course: MAD201-01
 * Assignment: 5
 * Name: Ashish Prajapati
 * Student ID: A00194842
 * Description: Manages global application state using the Context API, providing functions to add, delete, and toggle tasks.
 */

import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Setup Assignment', description: 'Initial task.', isCompleted: true },
    { id: '2', title: 'Test Delete', description: 'Try deleting this task.', isCompleted: false },
  ]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      isCompleted: false,
    };
    // Immutable update to ensure re-render
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    console.log("Toggling task:", id);
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    console.log("Deleting task:", id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
