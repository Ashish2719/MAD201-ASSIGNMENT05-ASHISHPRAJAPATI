import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AllTasksScreen from '../index';
import CompletedScreen from './CompletedScreen';

const Tab = createBottomTabNavigator();

function TaskTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
        headerShown: false, 
      }}
    >
      <Tab.Screen
        name="AllTasks"
        component={AllTasksScreen}
        options={{
          title: 'All Tasks',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={{
          title: 'Completed',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="check-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TaskTabs;