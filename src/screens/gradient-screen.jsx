import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { useState } from 'react';
import {
  calculateGradientAIncreasingVP,
  calculateGradientAIncreasingVF,
  calculateGradientADecreasingVP,
  calculateGradientADecreasingVF,
  calculateGradientGIncreasingVP,
  calculateGradientGIncreasingVF,
  calculateGradientGDecreasingVP,
  calculateGradientGDecreasingVF,
} from '../utils/gradient'; // importamos las funciones para los calculos

// creamos un array para escoger el tipo de gradiente
const gradientTypes = [
  { label: 'Gradiente Aritmerico', value: 'arithmetic' },
  { label: 'Gradiente Geometrico', value: 'geometric' },
];

// creamos un array para seleccionar la opción de gradienete aritmetico que deseamos calcular
const arithmeticOptions = [
  { label: 'Valor precente creciente A', value: 'increasingPresentA' },
  { label: 'Valor presente decreciente A', value: 'decreasingPresentA' },
  { label: 'Valor futuro creciente A', value: 'increasingFutureA' },
  { label: 'Valor futuro decreciente A', value: 'decreasingFutureA' },
];

// creamos un array para seleccionar la opción de gradienete aritmetico que deseamos calcular
const geometricOptions = [
  { label: 'Valor precente creciente G', value: 'increasingPresentG' },
  { label: 'Valor presente decreciente G', value: 'decreasingPresentG' },
  { label: 'Valor futuro creciente G', value: 'increasingFutureG' },
  { label: 'Valor futuro decreciente G', value: 'decreasingFutureG' },
];

export default function GradientScreen() {
  const [calculationType, setCalculationType] = useState('increasingPresentA');
  const [gradientType, setGradientType] = useState('arithmetic');
  const [seriesPayments, setSeriesPayments] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [variation, setVariation] = useState('');
  const [periods, setPeriods] = useState('');
  const [result, setResult] = useState(null);
  const { isDarkMode } = useTheme();

  // función para darle formato a los números
  const formatNumber = (number) => {
    const cleanNumber = number.replace(/\D/g, ''); // eliminamos todo lo que no sea dígito
    return cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // agregamos los puntos como separadores de miles
  };

  // función para realizar los cálculos
  const handleCalculate = () => {
    let calcResult;

    try {
      const paymentSeries = parseFloat(seriesPayments);
      const variationG = parseFloat(variation);
      const interestRateValue = parseFloat(interestRate);
      const numPeriod = parseFloat(periods);

      if (gradientType === 'arithmetic') {
        switch (calculationType) {
          case 'increasingPresentA':
            calcResult = calculateGradientAIncreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'decreasingPresentA':
            calcResult = calculateGradientADecreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'increasingFutureA':
            calcResult = calculateGradientAIncreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'decreasingFutureA':
            calcResult = calculateGradientADecreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
        }
      } else if (gradientType === 'geometric') {
        switch (calculationType) {
          case 'increasingPresentG':
            calcResult = calculateGradientGIncreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'decreasingPresentG':
            calcResult = calculateGradientGDecreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'increasingFutureG':
            calcResult = calculateGradientGIncreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
          case 'decreasingFutureG':
            calcResult = calculateGradientGDecreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            break;
        }
      }
      setResult(`Resultado: ${calcResult}`);
    } catch (error) {
      error.Alert.alert('Error', 'Por favor ingresa valores numéricos válidos.');
    }
  };

  // función para renderizar los inputs con formateo dinámico
  const renderInput = (label, value, setValue) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
        value={formatNumber(value)}
        onChangeText={(text) => setValue(text.replace(/\./g, ''))}  // guardamos el valor sin formato
        keyboardType="numeric"
      />
    </View>
  );

  // función para renderizar los dropdowns
  const renderDropdown = (label, selectedValue, onValueChange, options) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <View className={`border rounded-md ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={{ color: isDarkMode ? 'white' : 'black' }}
        >
          {options.map((option) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Calculadora de Gradientes
        </Text>
        
        {renderDropdown('Seleccione el tipo de gradiente a seleccionar', gradientType, setGradientType, gradientTypes)}
        
        {renderDropdown(
          'Calculation Type', 
          calculationType, 
          setCalculationType, 
          gradientType === 'arithmetic' ? arithmeticOptions : geometricOptions
        )}

        {renderInput('Serie de pagos', seriesPayments, setSeriesPayments)}
        {renderInput('Variación', variation, setVariation)}
        {renderInput('Tasa de interés (%)', interestRate, setInterestRate)}
        {renderInput('Número de periodos', periods, setPeriods)}

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
