import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/theme-context';
import { calculateResults } from '../utils/tir';

export default function IRRScreen() {
  const { isDarkMode } = useTheme();
  const [investment, setInvestment] = useState('');
  const [interest, setInterest] = useState('');
  const [cashFlows, setCashFlows] = useState(['']);
  const [results, setResults] = useState(null);

  const addCashFlowInput = () => {
    setCashFlows([...cashFlows, '']);
  };

  const removeCashFlowInput = (index) => {
    const newCashFlows = cashFlows.filter((_, i) => i !== index);
    setCashFlows(newCashFlows);
  };

  const updateCashFlow = (index, value) => {
    const newCashFlows = [...cashFlows];
    newCashFlows[index] = value;
    setCashFlows(newCashFlows);
  };

  const handleCalculate = () => {
    if (!investment || cashFlows.some(cf => !cf)) {
      Alert.alert('Error', 'Por favor complete todos los campos!');
      return;
    }

    const calculatedResults = calculateResults(investment, interest, cashFlows);
    setResults(calculatedResults);
  };

  const renderInput = (label, value, setValue) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Tasa Interna de Retorno (TIR)
        </Text>
        
        {renderInput('Inversión', investment, setInvestment)}
        {renderInput('Tasa de intéres (%)', interest, setInterest)}

        <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Flujo de caja</Text>
        {cashFlows.map((cf, index) => (
          <View key={index} className="flex-row mb-2">
            <TextInput
              className={`flex-1 p-2 rounded-md mr-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
              value={cf}
              onChangeText={(value) => updateCashFlow(index, value)}
              keyboardType="numeric"
              placeholder={`Año ${index + 1}`}
              placeholderTextColor={isDarkMode ? '#9ca3af' : '#6b7280'}
            />
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-md"
              onPress={() => removeCashFlowInput(index)}
            >
              <Text className="text-white">Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          className={`p-2 rounded-md mb-4 ${isDarkMode ? 'bg-green-600' : 'bg-green-500'}`}
          onPress={addCashFlowInput}
        >
          <Text className="text-white text-center">Agregar flujo de caja</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={handleCalculate}
        >
          <Text className="text-white text-center font-bold">Calcular</Text>
        </TouchableOpacity>

        {results && (
          <View className="mt-4 p-4 rounded-md bg-gray-200">
            <Text className="text-lg font-bold mb-2">Resultados:</Text>
            <Text>VAN: ${results.van}</Text>
            <Text>TIR: {results.irr}%</Text>
            <Text className={results.isRentable ? 'text-green-600' : 'text-red-600'}>
              {results.isRentable ? 'Es rentable' : 'No es rentable'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}