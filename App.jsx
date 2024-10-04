import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/theme-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import HomeScreen from './src/screens/home-screen';
import GradientScreen from './src/screens/gradient-screen';
import AnnuitiesScreen from './src/screens/annuities-screen';
import DarkModeSwitch from './src/components/dark-mode-switch';
import SimpleInterestScreen from './src/screens/simple-interest-screen';
import CompoundInterestScreen from './src/screens/compound-interest-screen';
import AmortizationScreen from './src/screens/amortization-screen';
import UVRScreen from './src/screens/uvr-screen';
import IRRScreen from './src/screens/tir-screen';

// funcion para crear la navegación de paginas
const Stack = createNativeStackNavigator();

function AppContent() {
  const { isDarkMode } = useTheme(); // tema oscuro
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    // navegacion por paginas
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#1F2937' : '#F3F4F6',
          },
          headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
          headerRight: () => <DarkModeSwitch />,
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}
      >
        {/* pantalla de inicio */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Calculadora de intereses',
          }}
        />
        {/* pantalla de interés simple */}
        <Stack.Screen 
          name="SimpleInterest" 
          component={SimpleInterestScreen}
          options={{
            title: 'Interés Simple',
          }}
        />
        {/* pantalla de interés compuesto */}
        <Stack.Screen 
          name="CompoundInterest" 
          component={CompoundInterestScreen}
          options={{
            title: 'Interés Compuesto',
          }}
        />
        {/* pantalla de anualidades */}
        <Stack.Screen 
          name="Annuities" 
          component={AnnuitiesScreen}
          options={{
            title: 'Anualidades',
          }}
        />
        {/* pantalla de gradientes */}
        <Stack.Screen 
          name="Gradient" 
          component={GradientScreen}
          options={{
            title: 'Gradientes',
          }}
        />
        <Stack.Screen 
          name="Amortization" 
          component={AmortizationScreen}
          options={{
            title: 'Amortizacion',
          }}
        />
        <Stack.Screen 
          name="UVR" 
          component={UVRScreen}
          options={{
            title: 'UVR',
          }}
        />
        <Stack.Screen 
          name="TIR" 
          component={IRRScreen}
          options={{
            title: 'TIR',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// renderizamos el contenido de app
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}