import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/theme-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home-screen';
import GradientScreen from './src/screens/gradient-screen';
import AnnuitiesScreen from './src/screens/annuities-screen';
import DarkModeSwitch from './src/components/dark-mode-switch';
import SimpleInterestScreen from './src/screens/simple-interest-screen';
import CompoundInterestScreen from './src/screens/compound-interest-screen';

// funcion para crear la navegación de paginas
const Stack = createNativeStackNavigator();

function AppContent() {
  const { isDarkMode } = useTheme(); // tema oscuro

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