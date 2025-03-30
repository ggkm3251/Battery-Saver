import { Tabs } from 'expo-router';
import { Battery, Settings, Trash2 } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1a1b1e' : '#ffffff',
          borderTopColor: isDark ? '#2c2d30' : '#e1e1e1',
        },
        tabBarActiveTintColor: '#00ff00',
        tabBarInactiveTintColor: isDark ? '#888888' : '#666666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Optimize',
          tabBarIcon: ({ color, size }) => (
            <Battery size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cleaner"
        options={{
          title: 'Cleaner',
          tabBarIcon: ({ color, size }) => (
            <Trash2 size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}