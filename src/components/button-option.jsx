import { TouchableOpacity, Text } from 'react-native';

// creamos la función boton personalizable para crear la opciones
export default function CustomButton({ title, color, onPress }) {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg mb-4 items-center ${color}`}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}