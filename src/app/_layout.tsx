import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View } from 'react-native';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { supabase } from '@/config/supabase';
import { initializeAuth, sessionChanged } from '@/store/authSlice';
import { store } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

SplashScreen.preventAutoHideAsync();

function AuthLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    void dispatch(initializeAuth());
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(sessionChanged(session));
    });
    return () => data.subscription.unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={Boolean(user)}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
          <Stack.Screen name="forgot-password" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthLayout />
    </Provider>
  );
}
