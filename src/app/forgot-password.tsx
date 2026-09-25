import { useState } from 'react';
import { Alert, Pressable, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { supabase } from '@/config/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'multimaderamovil://reset-password',
    });
    setLoading(false);
    Alert.alert(
      error ? 'No se pudo enviar el correo' : 'Correo enviado',
      error?.message ?? 'Revisa tu bandeja de entrada para continuar.',
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Recuperar contraseña</ThemedText>
      <ThemedText themeColor="textSecondary">Te enviaremos un enlace para restablecerla.</ThemedText>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Pressable disabled={loading || !email} onPress={() => void handleSubmit()} style={styles.button}>
        <ThemedText style={styles.buttonText}>{loading ? 'Enviando...' : 'Enviar enlace'}</ThemedText>
      </Pressable>
      <Link href="./login" style={styles.link}>Volver a iniciar sesión</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 16, padding: 24 },
  input: { borderWidth: 1, borderColor: '#c9cdd3', borderRadius: 10, padding: 14, fontSize: 16 },
  button: { alignItems: 'center', backgroundColor: '#208AEF', borderRadius: 10, padding: 14 },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { color: '#208AEF', textAlign: 'center' },
});
