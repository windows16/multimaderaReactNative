import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Toast } from '@/components/toast';
import { useGetClientesQuery } from '@/features/clientes/api/clientesApi';
import { formatError } from '@/utils/format-error';

export default function ClientesScreen() {
  const { data, isLoading, error } = useGetClientesQuery({ page: 1, limit: 10 });

  if (isLoading) return <ActivityIndicator />;
  if (error) {
    return <Toast visible message={formatError(error)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator>
        {data?.data.map((cliente) => (
          <View key={cliente.numeroDeCliente} style={styles.clientRow}>
            <ThemedText type="smallBold">{cliente.nombre}</ThemedText>
            <ThemedText themeColor="textSecondary">{cliente.telefono}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    gap: 12,
  },
  clientRow: {
    gap: 4,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F0F0F3',
  },
});
