import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { signIn } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) return <Redirect href="/" />;

  const handleSubmit = () => {
    void dispatch(signIn({ email: email.trim(), password }));
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title">Inicia sesión</ThemedText>
        <ThemedText themeColor="textSecondary">
          Accede con tu cuenta de MultiMadera.
        </ThemedText>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          secureTextEntry
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <Pressable
          disabled={loading || !email || !password}
          onPress={handleSubmit}
          style={[styles.button, (loading || !email || !password) && styles.disabled]}>
          {loading ? <ActivityIndicator color="#fff" /> : <ThemedText style={styles.buttonText}>Ingresar</ThemedText>}
        </Pressable>
        <Link href="./forgot-password" style={styles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  card: { gap: 16 },
  input: { borderWidth: 1, borderColor: '#c9cdd3', borderRadius: 10, padding: 14, fontSize: 16 },
  button: { alignItems: 'center', backgroundColor: '#208AEF', borderRadius: 10, padding: 14 },
  disabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#208AEF', textAlign: 'center', marginTop: 4 },
  error: { color: '#c62828' },
});
