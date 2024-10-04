import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { useState } from 'react';
import {
  calculateTime,
  calculateFinalValue,
  calculateCurrentValue,
  calculateAnnuityValue
} from '../utils/annuities';

const calculationOptions = [
  { label: 'Valor Final', value: 'finalValue' },
  { label: 'Valor Actual', value: 'currentValue' },
  { label: 'Valor de la Anualidad', value: 'annuityValue' },
  { label: 'Periodo / Tiempo', value: 'time' },
];

const frequencyOptions = [
  { label: 'Diario', value: 'daily' },
  { label: 'Semanal', value: 'weekly' },
  { label: 'Mensual', value: 'monthly' },
  { label: 'Semestral', value: 'semiannually' },
  { label: 'Anual', value: 'annually' },
];

export default function AnnuitiesScreen() {
  const [selectedCalculation, setSelectedCalculation] = useState('finalValue');
  const [capitalizationType, setCapitalizationType] = useState('annually');
  const [interestRateType, setInterestRateType] = useState('annually');
  const [annuityValue, setAnnuityValue] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [time, setTime] = useState('');
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState(null);

  // Función para darle formato a los números
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

  const handleCalculate = () => {
    let calcResult;
    try {
      switch (selectedCalculation) {
        case 'finalValue':
          calcResult = calculateFinalValue(parseFloat(interestRate), parseFloat(annuityValue), parseFloat(time));
          setResult(`El valor final es: ${formatNumber(calcResult.toFixed(2).toString())}`);
          break;

        case 'currentValue':
          calcResult = calculateCurrentValue(parseFloat(annuityValue), parseFloat(interestRate), parseFloat(time));
          setResult(`El valor presente es: ${formatNumber(calcResult.toFixed(2).toString())}`);
          break;

        case 'annuityValue':
          calcResult = calculateAnnuityValue(parseFloat(finalValue), parseFloat(interestRate), parseFloat(time));
          setResult(`El valor de la anualidad es: ${formatNumber(calcResult.toFixed(2).toString())}`);
          break;

        case 'time':
          calcResult = calculateTime(parseFloat(finalValue), parseFloat(annuityValue), parseFloat(interestRate));
          setResult(`El Tiempo requerido es: ${calcResult}`);
          break;

        default:
          setResult('Por favor selecciona una opción válida para calcular.');
      }
    } catch (error) {
      error.Alert.alert('Error', 'Por favor ingresa valores numéricos válidos.');
    }
  };

  const renderInput = (label, value, setValue, isDisabled) => (
    <View className="mb-4">
      <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{label}</Text>
      <TextInput
        className={`p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} ${isDisabled ? 'opacity-50' : ''}`}
        value={value}
        onChangeText={(text) => handleInputChange(text, setValue)}
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

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="p-4">
        <Text className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Calculadora de Anualidades
        </Text>
        
        {renderDropdown('Seleccione la variable a calcular', selectedCalculation, setSelectedCalculation, calculationOptions)}

        {renderInput('Valor / Monto final', finalValue, setFinalValue, selectedCalculation === 'finalValue' || selectedCalculation === 'currentValue')}
        {renderInput('Valor de la anualidad', annuityValue, setAnnuityValue, selectedCalculation === 'annuityValue')}

        {renderDropdown('Tipo de capitalización', capitalizationType, setCapitalizationType, frequencyOptions)}
        {renderDropdown('Tipo de tasa de interés', interestRateType, setInterestRateType, frequencyOptions)}

        {renderInput('Tasa de interés (%)', interestRate, setInterestRate, false)}
        {renderInput('Tiempo / Periodo', time, setTime, selectedCalculation === 'time')}

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
