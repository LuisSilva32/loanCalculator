import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { useState } from 'react';
import {
  calculateTimeComp,
  calculateAmountComp,
  calculateCapitalComp,
  calculateInterestRate,
  calculateInterestRate2
} from '../utils/compound-interest'; // importamos las funciones para los calculos

// creamos un array para la opción que deseamos calcular
const calculationOptions = [
  { label: 'Monto', value: 'amount' },
  { label: 'Capital', value: 'capital' },
  { label: 'Tasa de interés (1)', value: 'rate1' },
  { label: 'Tasa de interés (2)', value: 'rate2' },
  { label: 'Tiempo', value: 'time' },
];

// creamos un array para la opción de tiempo a la que querramos calcular
const frequencyOptions = [
  { label: 'Diarío', value: 'daily' },
  { label: 'Mensual', value: 'monthly' },
  { label: 'Bimestral', value: 'bimonthly' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Semestral', value: 'semiannual' },
  { label: 'Anual', value: 'annual' },
];

export default function CompoundInterestScreen() {
  const [selectedCalculation, setSelectedCalculation] = useState('amount');
  const [capitalizationType, setCapitalizationType] = useState('annual');
  const [interestRateType, setInterestRateType] = useState('annual');
  const [compoundAmount, setCompoundAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [capital, setCapital] = useState('');
  const [time, setTime] = useState('');
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState(null);

  // función para darle formato a los números
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

  const handleInputChange = (value, setValue) => {
    const cleanedValue = value.replace(/[^0-9.,]/g, '').replace(/,/g, '.');  // Convertimos ',' a '.' para decimales
    setValue(cleanedValue);
  };

  // función para realizar los cálculos
  const handleCalculate = () => {
    let calcResult;

    try {
      switch (selectedCalculation) {
        case 'amount':
          calcResult = calculateAmountComp(parseFloat(capital), parseFloat(interestRate), interestRateType, capitalizationType, parseFloat(time));
          setResult(`El monto final compuesto es: ${formatNumber(calcResult.toFixed(2).toString())}`);
          break;

        case 'capital':
          calcResult = calculateCapitalComp(parseFloat(compoundAmount), parseFloat(interestRate), interestRateType, capitalizationType, parseFloat(time));
          setResult(`El capital inicial es: ${formatNumber(calcResult.toFixed(2).toString())}`);
          break;

        case 'rate1':
          calcResult = calculateInterestRate(parseFloat(compoundAmount), parseFloat(capital), interestRateType, capitalizationType, parseFloat(time));
          setResult(`La tasa de interés efectiva es: ${formatNumber(calcResult.toFixed(4).toString())}`);
          break;

        case 'rate2':
          calcResult = calculateInterestRate2(parseFloat(compoundAmount), parseFloat(capital));
          setResult(`La tasa de interés es: ${formatNumber(calcResult.toFixed(4).toString())}`);
          break;

        case 'time':
          calcResult = calculateTimeComp(parseFloat(compoundAmount), parseFloat(capital), parseFloat(interestRate), interestRateType, capitalizationType);
          setResult(`El tiempo requerido es: ${calcResult}`);
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
        value={value}
        onChangeText={(text) => handleInputChange(text, setValue)}  // guardamos el valor sin formato
        keyboardType="numeric"
        editable={!isDisabled}
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
          Calculadora de Interés Compuesto
        </Text>
        
        {renderDropdown('Seleccione la variable a calcular', selectedCalculation, setSelectedCalculation, calculationOptions)}

        {renderInput('Monto compuesto', compoundAmount, setCompoundAmount, selectedCalculation === 'amount')}
        {renderInput('Capital', capital, setCapital, selectedCalculation === 'capital')}
        {renderInput('Tasa de interés (%)', interestRate, setInterestRate, selectedCalculation === 'rate1' || selectedCalculation === 'rate2')}

        {renderDropdown('Seleccione el tipo de Tasa de interés', interestRateType, setInterestRateType, frequencyOptions)}
        {renderDropdown('Seleccione el tipo de Capitalisación', capitalizationType, setCapitalizationType, frequencyOptions)}

        {renderInput('Tiempo', time, setTime, selectedCalculation === 'time' || selectedCalculation === 'rate2')}

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
