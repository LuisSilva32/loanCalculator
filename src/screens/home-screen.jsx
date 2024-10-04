import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, StatusBar } from 'react-native';
import { useTheme } from '../context/theme-context';
import CalculationButton from '../components/button-option';
import { 
  Calculator, 
  Percent, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Home, 
  PieChart 
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 60) / 2; // 60 is the total horizontal padding (40) plus margins (20)

const calculationTypes = [
  { title: 'Interés Simple', color: ['#4F46E5', '#7C3AED'], screen: 'SimpleInterest', icon: Percent },
  { title: 'Interés Compuesto', color: ['#10B981', '#059669'], screen: 'CompoundInterest', icon: Calculator },
  { title: 'Anualidades', color: ['#F59E0B', '#D97706'], screen: 'Annuities', icon: Calendar },
  { title: 'Gradientes', color: ['#8B5CF6', '#6D28D9'], screen: 'Gradient', icon: TrendingUp },
  { title: 'Amortización', color: ['#EF4444', '#DC2626'], screen: 'Amortization', icon: DollarSign },
  { title: 'UVR', color: ['#3B82F6', '#2563EB'], screen: 'UVR', icon: Home },
  { title: 'TIR', color: ['#EC4899', '#DB2777'], screen: 'TIR', icon: PieChart },
];

export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const fadeAnims = useRef(calculationTypes.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(100, fadeAnims.map(anim => 
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    )).start();
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1F2937', '#111827'] : ['#F3F4F6', '#E5E7EB']}
      className="flex-1"
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-3xl font-bold text-center mb-8 font-nunito-bold text-gray-800 dark:text-gray-200">
          Calculadora Financiera
        </Text>
        <Text className="text-lg text-center mb-8 font-nunito text-gray-600 dark:text-gray-400">
          ¿Qué deseas calcular hoy?
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {calculationTypes.map((type, index) => (
            <Animated.View 
              key={index} 
              style={{ 
                width: buttonWidth, 
                marginBottom: 20,
                opacity: fadeAnims[index],
                transform: [{
                  translateY: fadeAnims[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }]
              }}
            >
              <CalculationButton
                title={type.title}
                colors={type.color}
                onPress={() => type.screen && navigation.navigate(type.screen)}
                icon={type.icon}
                isDarkMode={isDarkMode}
              />
            </Animated.View>
          ))}
        </View>
      </View>
    </LinearGradient>
  );
}