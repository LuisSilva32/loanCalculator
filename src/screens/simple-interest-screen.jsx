import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { useState } from 'react';
import {
  calculateTime,
  calculateCapital,
  calculateInterest,
  calculateFinalAmount,
  calculateRateInterest
} from '../utils/simple-interest-calculation'; // importamos las funciones para los calculos

// creamos un array para la opción que deseamos calcular
const calculationOptions = [
  { label: 'Monto', value: 'amount' },
  { label: 'Capital', value: 'capital' },
  { label: 'Interés', value: 'interest' },
  { label: 'Tiempo', value: 'time' },
  { label: 'Tasa de interés', value: 'rate' },
];

export default function SimpleInterestScreen() {
  const [selectedCalculation, setSelectedCalculation] = useState('amount');
  const [interest, setInterest] = useState('');
  const [capital, setCapital] = useState('');
  const [time, setTime] = useState('');
  const [rate, setRate] = useState('');
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState(null);

  // función para darle formato a los números
  const formatNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, ''); // eliminamos todo lo que no sea dígito
    return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // agregamos los puntos como separadores de miles
  };

  // función para realizar los cálculos
  const handleCalculate = () => {
    let calcResult;
    if (
      (selectedCalculation !== 'amount' && !capital) ||  // el capital es requerido excepto cuando se calcula el monto
      (selectedCalculation !== 'interest' && selectedCalculation !== 'amount' && !interest) || // el interés es requerido excepto cuando se calcula el monto o interés
      (selectedCalculation !== 'time' && !time) || // el tiempo es requerido excepto cuando se calcula el tiempo
      (selectedCalculation !== 'rate' && !rate) // la tasa es requerida excepto cuando se calcula la tasa
    ) {
      Alert.alert('Error', 'Por favor ingresa todos los valores requeridos.');
      return;
    }

    try {
      switch (selectedCalculation) {
        case 'amount':
          calcResult = calculateFinalAmount(parseFloat(capital), parseFloat(rate), parseFloat(time));
          setResult(`El monto final es: ${formatNumber(calcResult.toString())}`);
          break;

        case 'capital':
          calcResult = calculateCapital(parseFloat(interest), parseFloat(rate), parseFloat(time));
          setResult(`El capital es: ${formatNumber(calcResult.toString())}`);
          break;

        case 'interest':
          calcResult = calculateInterest(parseFloat(capital), parseFloat(rate), parseFloat(time));
          setResult(`El interés es: ${formatNumber(calcResult.toString())}`);
          break;

        case 'time':
          const timeResult = calculateTime(parseFloat(capital), parseFloat(interest), parseFloat(rate));
          setResult(`El tiempo requerido es: ${timeResult}`);
          break;

        case 'rate':
          calcResult = calculateRateInterest(parseFloat(capital), parseFloat(interest), parseFloat(time));
          setResult(`La tasa de interés es: ${formatNumber(calcResult.toString())}%`);
          break;

        default:
          setResult('Por favor selecciona una opción válida para calcular.');
      }
    } catch (error) {
      error.Alert.alert('Error', 'Por favor ingresa valores numéricos válidos.');
    }
  };

  // función para renderizar los inputs con formateo dinámico
  const renderInput = (label, value, setValue, isDisabled) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} ${isDisabled ? 'opacity-50' : ''}`}
        value={formatNumber(value)}
        onChangeText={(text) => setValue(text.replace(/\./g, ''))}  // guardamos el valor sin formato
        keyboardType="numeric"
        editable={!isDisabled}
      />
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Calculadora de Interés Simple
        </Text>

        <View className="mb-4">
          <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>¿Qué deseas calcular?</Text>
          <View className={`border rounded-md ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <Picker
              selectedValue={selectedCalculation}
              onValueChange={(itemValue) => setSelectedCalculation(itemValue)}
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              {calculationOptions.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>

        {renderInput('Capital', capital, setCapital, selectedCalculation === 'capital')}
        {renderInput('Interés', interest, setInterest, selectedCalculation === 'amount' || selectedCalculation === 'interest')}
        {renderInput('Tiempo (en años)', time, setTime, selectedCalculation === 'time')}
        {renderInput('Tasa de interés (%)', rate, setRate, selectedCalculation === 'rate')}

        <TouchableOpacity
          className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={handleCalculate}
        >
          <Text className="text-white text-center font-bold">Calcular</Text>
        </TouchableOpacity>

        {result && (
          <View className="mt-4 p-4 rounded-md bg-green-100">
            <Text className="text-green-800 font-bold text-center">{result}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
