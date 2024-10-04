import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CalculationButton({ title, colors, onPress, icon: Icon, isDarkMode }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="overflow-hidden rounded-2xl"
      style={{ 
        aspectRatio: 1,
        elevation: isDarkMode ? 0 : 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 p-4 items-center justify-center"
      >
        <Icon size={32} color="white" className="mb-3" />
        <Text className="text-white text-center font-semibold font-nunito text-base">
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}