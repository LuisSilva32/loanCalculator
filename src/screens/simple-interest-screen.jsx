import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../context/theme-context';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  calculateTime,
  calculateCapital,
  calculateInterest,
  calculateFinalAmount,
  calculateRateInterest
} from '../utils/simple-interest-calculation';

// Opciones para seleccionar qué calcular
const calculationOptions = [
  { label: 'Monto', value: 'amount' },
  { label: 'Capital', value: 'capital' },
  { label: 'Interés', value: 'interest' },
  { label: 'Tiempo', value: 'time' },
  { label: 'Tasa de interés', value: 'rate' },
];

// Opciones para el tipo de tiempo
const timeOptions = [
  { label: 'Años', value: 'years' },
  { label: 'Meses', value: 'months' },
  { label: 'Días', value: 'days' },
  { label: 'Año/Mes/Día', value: 'date' },
];

export default function SimpleInterestScreen() {
  const [selectedCalculation, setSelectedCalculation] = useState('amount');
  const [interest, setInterest] = useState('');
  const [capital, setCapital] = useState('');
  const [rate, setRate] = useState('');
  const [timeType, setTimeType] = useState('years');  
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState(null);

  // Nuevos estados para manejar la fecha en año, mes y día
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  // Función para permitir decimales en los inputs (modificación de la función anterior)
  const handleInputChange = (value, setValue) => {
    const cleanedValue = value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');  // Convertimos ',' a '.' para decimales
    setValue(cleanedValue);
  };

  // Función para darle formato a los números con separador de miles y decimales
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


  // Función para convertir tiempo a años basada en días, meses o años
const convertToYears = (years, months, days, timeType) => {
  let totalYears = 0;
  
  // Convertimos según el tipo de tiempo seleccionado
  if (timeType === 'years') {
    totalYears = parseFloat(years || 0);  // Años completos
  } else if (timeType === 'months') {
    totalYears = parseFloat(months || 0) / 12;  // Convertimos meses a fracción de año
  } else if (timeType === 'days') {
    totalYears = parseFloat(days || 0) / 365;  // Convertimos días a fracción de año
  } else if (timeType === 'date') {
    // Si el usuario ingresa año, mes y día, los sumamos como fracción de año
    totalYears = parseFloat(years || 0) + (parseFloat(months || 0) / 12) + (parseFloat(days || 0) / 365);
  }
  
  return totalYears;
};

// Función para realizar los cálculos, adaptada para manejar días
const handleCalculate = () => {
  let calcResult;
  const timeInYears = convertToYears(year, month, day, timeType);  // Convertimos el tiempo a años

  if (
    (selectedCalculation !== 'amount' && !capital) ||  
    (selectedCalculation !== 'interest' && selectedCalculation !== 'amount' && !interest) ||  
    (selectedCalculation !== 'time' && !timeInYears) ||  
    (selectedCalculation !== 'rate' && !rate)
  ) {
    Alert.alert('Error', 'Por favor ingresa todos los valores requeridos.');
    return;
  }

  try {
    switch (selectedCalculation) {
      case 'amount':
        calcResult = calculateFinalAmount(parseFloat(capital), parseFloat(rate), timeInYears);
        setResult(`El monto final es: ${formatNumber(calcResult.toFixed(2).toString())}`);
        break;

      case 'capital':
        calcResult = calculateCapital(parseFloat(interest), parseFloat(rate), timeInYears);
        setResult(`El capital es: ${formatNumber(calcResult.toFixed(2).toString())}`);
        break;

      case 'interest':
        calcResult = calculateInterest(parseFloat(capital), parseFloat(rate), timeInYears);
        setResult(`El interés es: ${formatNumber(calcResult.toFixed(2).toString())}`);
        break;

      case 'time':
        const timeResult = calculateTime(parseFloat(capital), parseFloat(interest), parseFloat(rate));
        setResult(`El tiempo requerido es: ${timeResult}`);
        break;

      case 'rate':
        calcResult = calculateRateInterest(parseFloat(capital), parseFloat(interest), timeInYears);
        setResult(`La tasa de interés es: ${formatNumber(calcResult.toFixed(2).toString())}%`);
        break;

      default:
        setResult('Por favor selecciona una opción válida para calcular.');
    }
  } catch (error) {
    Alert.alert('Error', 'Por favor ingresa valores numéricos válidos.');
  }
};


  // Función para renderizar los inputs con formateo dinámico
  const renderInput = (label, value, setValue, isDisabled) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} ${isDisabled ? 'opacity-50' : ''}`}
        value={value}
        onChangeText={(text) => handleInputChange(text, setValue)}  // Permite decimales
        keyboardType="numeric"
        editable={!isDisabled}
      />
    </View>
  );

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
  

  // Inputs para año, mes y día (reemplazando el DatePicker)
  const renderDateInputs = () => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Introducir Año/Mes/Día</Text>
      <View className="flex-row justify-between">
        <TextInput
          className={`p-2 flex-1 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
          value={year}
          onChangeText={(text) => handleInputChange(text, setYear)}
          placeholder="Año"
          keyboardType="numeric"
        />
        <TextInput
          className={`p-2 flex-1 ml-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
          value={month}
          onChangeText={(text) => handleInputChange(text, setMonth)}
          placeholder="Mes"
          keyboardType="numeric"
        />
        <TextInput
          className={`p-2 flex-1 ml-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}
          value={day}
          onChangeText={(text) => handleInputChange(text, setDay)}
          placeholder="Día"
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Calculadora de Interés Simple
        </Text>

        {/* Dropdown para seleccionar qué calcular */}
        {renderDropdown('¿Qué deseas calcular?', selectedCalculation, setSelectedCalculation, calculationOptions)}

        {renderInput('Capital', capital, setCapital, selectedCalculation === 'capital')}
        {renderInput('Interés', interest, setInterest, selectedCalculation === 'amount' || selectedCalculation === 'interest')}
        {renderInput('Tasa de interés (%)', rate, setRate, selectedCalculation === 'rate')}

        {/* Dropdown para seleccionar el tipo de tiempo */}
        {renderDropdown('Tiempo en', timeType, setTimeType, timeOptions)}

        {/* Inputs para año, mes y día */}
        {timeType === 'date' ? renderDateInputs() : renderInput('Tiempo a calcular', year, setYear, selectedCalculation === 'time')}

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
