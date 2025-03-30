import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Trash2 } from 'lucide-react-native';

export default function CleanerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleaningComplete, setCleaningComplete] = useState(false);
  const [junkSize] = useState((Math.random() * 2 + 0.5).toFixed(1));
  
  const progress = useSharedValue(0);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const handleClean = () => {
    if (isCleaning) return;
    
    setIsCleaning(true);
    setCleaningComplete(false);
    progress.value = 0;

    // Animate progress bar
    progress.value = withTiming(1, { duration: 3000 }, () => {
      setIsCleaning(false);
      setCleaningComplete(true);
    });
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1b1e' : '#ffffff' }
    ]}>
      <Pressable onPress={handleClean} disabled={isCleaning}>
        <LinearGradient
          colors={['#00ff00', '#00cc00']}
          style={styles.cleanButton}
        >
          <Trash2 size={32} color="white" />
          <Text style={styles.cleanText}>
            {isCleaning ? 'CLEANING...' : 'CLEAN NOW'}
          </Text>
        </LinearGradient>
      </Pressable>

      {(isCleaning || cleaningComplete) && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                progressStyle,
              ]}
            />
          </View>
          <Text style={[
            styles.progressText,
            { color: isDark ? '#ffffff' : '#000000' }
          ]}>
            {cleaningComplete
              ? `${junkSize} GB of junk files removed!`
              : 'Scanning for junk files...'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cleanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    minWidth: 200,
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cleanText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    width: '80%',
    marginTop: 40,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#333333',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff00',
  },
  progressText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});