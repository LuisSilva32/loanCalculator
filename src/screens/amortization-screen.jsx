import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../context/theme-context';
import { calculateAmortization, calculateTotalInterest, calculateTotalPayments } from '../utils/amortization';

const amortizationSystems = [
  { label: 'French', value: 'french' },
  { label: 'German', value: 'german' },
  { label: 'American', value: 'american' },
];

export default function AmortizationScreen() {
  const { isDarkMode } = useTheme();
  const [system, setSystem] = useState('french');
  const [loanValue, setLoanValue] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [paymentFrequency, setPaymentFrequency] = useState('');
  const [numberOfPeriods, setNumberOfPeriods] = useState('');
  const [amortizationTable, setAmortizationTable] = useState([]);
  const [totalInterest, setTotalInterest] = useState('');
  const [totalPayments, setTotalPayments] = useState('');

  const handleCalculate = () => {
    if (!loanValue || !interestRate || !paymentFrequency || !numberOfPeriods) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const table = calculateAmortization(system, loanValue, interestRate, paymentFrequency, numberOfPeriods);
      setAmortizationTable(table);
      setTotalInterest(calculateTotalInterest(table));
      setTotalPayments(calculateTotalPayments(table));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
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
          Amortization Calculator
        </Text>
        
        <View className="mb-4">
          <Text className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Amortization System</Text>
          <View className={`border rounded-md ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
            <Picker
              selectedValue={system}
              onValueChange={(itemValue) => setSystem(itemValue)}
              style={{ color: isDarkMode ? 'white' : 'black' }}
            >
              {amortizationSystems.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>

        {renderInput('Loan Value', loanValue, setLoanValue)}
        {renderInput('Interest Rate (%)', interestRate, setInterestRate)}
        {renderInput('Payment Frequency (per year)', paymentFrequency, setPaymentFrequency)}
        {renderInput('Number of Periods', numberOfPeriods, setNumberOfPeriods)}

        <TouchableOpacity
          className={`p-4 rounded-md ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
          onPress={handleCalculate}
        >
          <Text className="text-white text-center font-bold">Calculate</Text>
        </TouchableOpacity>

        {amortizationTable.length > 0 && (
          <View className="mt-4">
            <Text className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Amortization Table
            </Text>
            <ScrollView horizontal>
              <View>
                <View className="flex-row bg-gray-200">
                  <Text className="font-bold p-2 w-16 text-center">Period</Text>
                  <Text className="font-bold p-2 w-24 text-center">Payment</Text>
                  <Text className="font-bold p-2 w-24 text-center">Principal</Text>
                  <Text className="font-bold p-2 w-24 text-center">Interest</Text>
                  <Text className="font-bold p-2 w-24 text-center">Balance</Text>
                </View>
                {amortizationTable.map((row, index) => (
                  <View key={index} className={`flex-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                    <Text className="p-2 w-16 text-center">{row.period}</Text>
                    <Text className="p-2 w-24 text-center">{row.payment}</Text>
                    <Text className="p-2 w-24 text-center">{row.principal}</Text>
                    <Text className="p-2 w-24 text-center">{row.interest}</Text>
                    <Text className="p-2 w-24 text-center">{row.balance}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View className="mt-4">
              <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Total Interest: ${totalInterest}
              </Text>
              <Text className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Total Payments: ${totalPayments}
              </Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}