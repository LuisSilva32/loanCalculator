import { View, Text } from 'react-native';
import { useTheme } from '../context/theme-context';
import CalculationButton from '../components/button-option';

// array de botones
const calculationTypes = [
  { title: 'Interés Simple', color: 'bg-blue-500', darkColor: 'bg-blue-700', screen: 'SimpleInterest' }, // interés simple
  { title: 'Interés Compuesto', color: 'bg-green-500', darkColor: 'bg-green-700', screen: 'CompoundInterest' }, // interés compuesto
  { title: 'Anualidades', color: 'bg-yellow-500', darkColor: 'bg-yellow-700', screen: 'Annuities' }, // anualidades
  { title: 'Gradientes', color: 'bg-purple-500', darkColor: 'bg-purple-700', screen: 'Gradient' }, // gradientes
];

// función homeScreen recibe una prop para la navegacion
export default function HomeScreen({ navigation }) {
  const { isDarkMode } = useTheme(); // usamos el contexto del modo oscuro

  return (
    <View className={`flex-1 justify-center items-center p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Text className={`text-base text-center mb-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Hola!... Que deseas calcular el día de hoy?
      </Text>
      <View className="w-full">
        {/* mapeamos el array de opciones para el boton */}
        {calculationTypes.map((type, index) => (
          <CalculationButton
            key={index}
            title={type.title}
            color={isDarkMode ? type.darkColor : type.color}
            onPress={() => type.screen && navigation.navigate(type.screen)}
          />
        ))}
      </View>
    </View>
  );
}