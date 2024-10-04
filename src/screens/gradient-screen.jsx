import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
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
  calculateGradientAIncreasingPerpetualVP,
  calculateGradientAIncreasingAnticipatedVF
} from '../utils/gradient'; // Importamos las funciones para los cálculos

// Opciones de tiempo
const timeOptions = [
  { label: 'Años', value: 'years' },
  { label: 'Meses', value: 'months' },
  { label: 'Días', value: 'days' },
  { label: 'Año/Mes/Día', value: 'combined' }
];

// Opciones de gradiente aritmético
const arithmeticOptions = [
  { label: 'Valor presente creciente A', value: 'increasingPresentA' },
  { label: 'Valor futuro creciente A', value: 'increasingFutureA' },
  { label: 'Valor presente decreciente A', value: 'decreasingPresentA' },
  { label: 'Valor futuro decreciente A', value: 'decreasingFutureA' },
  { label: 'Valor presente creciente perpetuo A', value: 'increasingPresentPerpetualA' },
  { label: 'Valor futuro creciente anticipado A', value: 'increasingFutureAnticipatedA' },
];

// Opciones de gradiente geométrico
const geometricOptions = [
  { label: 'Valor presente creciente G', value: 'increasingPresentG' },
  { label: 'Valor futuro creciente G', value: 'increasingFutureG' },
];

export default function GradientScreen() {
  const [calculationType, setCalculationType] = useState('increasingPresentA');
  const [gradientType, setGradientType] = useState('arithmetic');
  const [seriesPayments, setSeriesPayments] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [variation, setVariation] = useState('');
  const [timeValue, setTimeValue] = useState(''); // Este será el campo de entrada para años/meses/días
  const [timeType, setTimeType] = useState('years'); // Selección del tipo de tiempo
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState(null);
  const { isDarkMode } = useTheme();

  // Función para convertir la entrada combinada de año/mes/día a una sola unidad de periodos
  const convertToPeriods = () => {
    if (timeType === 'combined') {
      // Convertimos a meses o días según la lógica que requieras
      return (parseFloat(years || 0) * 12) + parseFloat(months || 0) + (parseFloat(days || 0) / 30); // Tiempo en meses
    } else {
      // Si se selecciona años, meses o días, usamos directamente el valor ingresado
      return parseFloat(timeValue);
    }
  };

  const formatNumber = (number) => {
    if (!number) return '';
    
    // Convertimos el número en string con dos decimales
    const formattedNumber = parseFloat(number).toFixed(2);
  
    // Separamos la parte entera y decimal
    const [integerPart, decimalPart] = formattedNumber.split('.');
  
    // Formateamos la parte entera con separador de miles
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Retornamos el número con coma como separador decimal
    return `${formattedInteger},${decimalPart}`;
  };

  // Función para realizar los cálculos
  const handleCalculate = () => {
    let calcResult;

    try {
      const paymentSeries = parseFloat(seriesPayments);
      const variationG = parseFloat(variation);
      const interestRateValue = parseFloat(interestRate);
      const numPeriod = convertToPeriods(); // Usamos la función para convertir a periodos

      if (gradientType === 'arithmetic') {
        switch (calculationType) {
          case 'increasingPresentA':
            calcResult = calculateGradientAIncreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor presente cresiente es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
          case 'decreasingPresentA':
            calcResult = calculateGradientADecreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor presente decreciente es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
          case 'increasingFutureA':
            calcResult = calculateGradientAIncreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor futuro creciente es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
          case 'decreasingFutureA':
            calcResult = calculateGradientADecreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor futuro decrecreciente es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
            case 'increasingPresentPerpetualA':
            calcResult = calculateGradientAIncreasingPerpetualVP(paymentSeries, variationG, interestRateValue);
            setResult(`El valor presente creciente perpetuo es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
          case 'increasingFutureAnticipatedA':
            calcResult = calculateGradientAIncreasingAnticipatedVF(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor futuro creciente anticipado es: ${formatNumber(calcResult.toFixed(2).toString())}`)
            break;
        }
      } else if (gradientType === 'geometric') {
        switch (calculationType) {
          case 'increasingPresentG':
            calcResult = calculateGradientGIncreasingVP(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor presente creciente es: ${formatNumber(calcResult)}`);
            break;
          case 'increasingFutureG':
            calcResult = calculateGradientGIncreasingVF(paymentSeries, variationG, interestRateValue, numPeriod);
            setResult(`El valor futuro creciente es: ${formatNumber(calcResult)}`);
            break;
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Por favor ingresa valores numéricos válidos.');
    }
  };

  // Función para renderizar los inputs con formateo dinámico
  const renderInput = (label, value, setValue, isDisabled = false) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} ${isDisabled ? 'opacity-50' : ''}`}
        value={value}
        onChangeText={(text) => setValue(text)}
        keyboardType="numeric"
        editable={!isDisabled}
      />
    </View>
  );

  // Función para renderizar los dropdowns
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
        
        {renderDropdown('Seleccione el tipo de gradiente', gradientType, setGradientType, [
          { label: 'Gradiente Aritmético', value: 'arithmetic' },
          { label: 'Gradiente Geométrico', value: 'geometric' }
        ])}

        {renderDropdown(
          'Tipo de cálculo', 
          calculationType, 
          setCalculationType, 
          gradientType === 'arithmetic' ? arithmeticOptions : geometricOptions
        )}

        {renderInput('Serie de pagos', seriesPayments, setSeriesPayments)}
        {renderInput('Variación', variation, setVariation)}
        {renderInput('Tasa de interés (%)', interestRate, setInterestRate)}

        {/* Nuevo dropdown para seleccionar el tipo de tiempo */}
        {renderDropdown('Tiempo en', timeType, setTimeType, timeOptions)}

        {/* Si el usuario selecciona la opción combinada, mostramos tres campos para años, meses y días */}
        {timeType === 'combined' ? (
          <>
            {renderInput('Años', years, setYears)}
            {renderInput('Meses', months, setMonths)}
            {renderInput('Días', days, setDays)}
          </>
        ) : (
          // Si selecciona años, meses o días, mostramos solo un campo
          renderInput('Tiempo', timeValue, setTimeValue)
        )}

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
