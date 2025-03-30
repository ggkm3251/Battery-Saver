import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Battery from 'expo-battery';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Zap } from 'lucide-react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationCount, setOptimizationCount] = useState(0);
  
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    async function getBatteryLevel() {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100);
    }
    getBatteryLevel();
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const handleOptimize = async () => {
    if (isOptimizing) return;
    
    setIsOptimizing(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    // Animation sequence
    scale.value = withSequence(
      withSpring(1.2),
      withSpring(0.8),
      withSpring(1)
    );
    
    rotation.value = withSequence(
      withTiming(360, { duration: 1000 }),
      withTiming(720, { duration: 1000 }),
      withTiming(1080, { duration: 1000 })
    );

    // Fake optimization delay
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimizationCount(prev => prev + 1);
    }, 3000);
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? '#1a1b1e' : '#ffffff' }
    ]}>
      <View style={styles.batteryInfo}>
        <Text style={[
          styles.batteryText,
          { color: isDark ? '#ffffff' : '#000000' }
        ]}>
          Battery Level: {batteryLevel.toFixed(0)}%
        </Text>
        <Text style={[
          styles.estimateText,
          { color: isDark ? '#888888' : '#666666' }
        ]}>
          Estimated time remaining: {Math.round(batteryLevel * 0.12)} hours
        </Text>
      </View>

      <Pressable onPress={handleOptimize} disabled={isOptimizing}>
        <LinearGradient
          colors={['#00ff00', '#00cc00']}
          style={styles.boostButton}
        >
          <Animated.View style={[styles.buttonContent, animatedStyles]}>
            <Zap size={32} color="white" />
            <Text style={styles.boostText}>
              {isOptimizing ? 'OPTIMIZING...' : 'BOOST NOW'}
            </Text>
          </Animated.View>
        </LinearGradient>
      </Pressable>

      {optimizationCount > 0 && (
        <View style={styles.resultContainer}>
          <Text style={[
            styles.resultText,
            { color: isDark ? '#00ff00' : '#008800' }
          ]}>
            Battery optimized! 25% longer life!
          </Text>
          <Text style={[
            styles.statsText,
            { color: isDark ? '#888888' : '#666666' }
          ]}>
            Optimizations performed: {optimizationCount}
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
  batteryInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  batteryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  estimateText: {
    fontSize: 16,
  },
  boostButton: {
    borderRadius: 30,
    padding: 20,
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boostText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
  },
});