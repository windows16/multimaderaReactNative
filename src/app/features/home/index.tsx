import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { HomeModuleCard } from '@/features/home/components/HomeModuleCard';
import { useTheme } from '@/hooks/use-theme';
import { signOut, clearAuthError } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Toast } from '@/components/toast';

export default function HomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);
  const email = user?.email ?? 'Usuario';
  const displayName = email.split('@')[0];
  
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Toast
          visible={Boolean(error)}
          message={error ?? ''}
          onClose={() => dispatch(clearAuthError())}
        />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <ThemedText type="small" themeColor="textSecondary">
                Panel principal
              </ThemedText>
              <ThemedText type="subtitle">Hola, {displayName}</ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cerrar sesión"
              onPress={() => void dispatch(signOut())}
              style={[styles.logoutButton, { borderColor: theme.border }]}>
              <Ionicons name="log-out-outline" size={22} color={theme.textSecondary} />
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText type="smallBold">Accesos rápidos</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Módulos disponibles
            </ThemedText>
          </View>

          <HomeModuleCard
            title="Clientes"
            description="Consulta y administra tus clientes"
            icon="people-outline"
            onPress={() => router.push('/features/clientes')}
          />
          <HomeModuleCard
            title="Materiales"
            description="Próximamente disponible"
            icon="cube-outline"
            disabled
          />
          <HomeModuleCard
            title="Pedidos"
            description="Próximamente disponible"
            icon="cart-outline"
            disabled
          />
          <HomeModuleCard
            title="Reportes"
            description="Próximamente disponible"
            icon="bar-chart-outline"
            disabled
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { gap: 16, paddingHorizontal: 24, paddingTop: 40, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  headerText: { flex: 1, gap: 4 },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 22,
  },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 18, padding: 20 },
  summaryText: { flex: 1, gap: 4 },
  summaryTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  summaryDescription: { color: '#fff', fontSize: 14, lineHeight: 20, opacity: 0.9 },
  sectionHeader: { gap: 4, marginTop: 8 },
});
