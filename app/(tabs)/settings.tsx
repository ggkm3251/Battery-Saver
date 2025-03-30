import { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, useColorScheme } from 'react-native';
import { Bell, Moon, Star } from 'lucide-react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);

  const handleRateApp = () => {
    // Implement rate app logic
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1b1e' : '#ffffff' }
    ]}>
      <View style={styles.section}>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Bell size={24} color={isDark ? '#ffffff' : '#000000'} />
            <Text style={[
              styles.settingText,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Notifications
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: '#00cc00' }}
            thumbColor={notifications ? '#00ff00' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Moon size={24} color={isDark ? '#ffffff' : '#000000'} />
            <Text style={[
              styles.settingText,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#767577', true: '#00cc00' }}
            thumbColor={darkMode ? '#00ff00' : '#f4f3f4'}
          />
        </View>

        <Pressable
          style={styles.settingItem}
          onPress={handleRateApp}
        >
          <View style={styles.settingLeft}>
            <Star size={24} color={isDark ? '#ffffff' : '#000000'} />
            <Text style={[
              styles.settingText,
              { color: isDark ? '#ffffff' : '#000000' }
            ]}>
              Rate App
            </Text>
          </View>
        </Pressable>
      </View>

      <Text style={[
        styles.version,
        { color: isDark ? '#888888' : '#666666' }
      ]}>
        Version 1.0.0
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 10,
  },
  version: {
    textAlign: 'center',
    marginTop: 'auto',
    fontSize: 14,
  },
});