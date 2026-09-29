// src/navigation/AppNavigator.js
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddScreen } from '../screens/AddScreen';
import { EditScreen } from '../screens/EditScreen';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pengeluaran' }} />
        <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Tambah pengeluaran' }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Ubah pengeluaran' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail pengeluaran' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}