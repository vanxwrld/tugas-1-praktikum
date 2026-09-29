// src/navigation/AppNavigator.js
// Themed Stack Navigator — consistent header styles

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/ThemeContext';
import { HomeScreen } from '../screens/HomeScreen';
import { AddScreen } from '../screens/AddScreen';
import { EditScreen } from '../screens/EditScreen';
import { DetailScreen } from '../screens/DetailScreen';

const Stack = createStackNavigator();

function ThemedNavigator() {
  const { colors, isDark, typography, spacing } = useTheme();

  const theme = isDark ? {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onSurface,
      border: colors.border,
      notification: colors.error,
    },
  } : {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.onSurface,
      border: colors.border,
      notification: colors.error,
    },
  };

  const headerStyle = {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    elevation: 0,
    shadowOpacity: 0,
  };

  const headerTitleStyle = {
    color: colors.onSurface,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.medium,
  };

  const headerTintColor = colors.primary;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle,
          headerTitleStyle,
          headerTintColor,
          headerBackTitleStyle: { color: colors.onSurfaceVariant, fontSize: typography.fontSize.sm },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pengeluaran' }} />
        <Stack.Screen name="Add" component={AddScreen} options={{ title: 'Tambah pengeluaran' }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Ubah pengeluaran' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail pengeluaran' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return <ThemedNavigator />;
}