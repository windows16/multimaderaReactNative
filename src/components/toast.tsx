import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type ToastProps = {
  visible: boolean;
  message: string;
  title?: string;
  onClose?: () => void;
  duration?: number;
};

export function Toast({
  visible,
  message,
  title = 'Ocurrió un error',
  onClose,
  duration = 6000,
}: ToastProps) {
  const [dismissedMessage, setDismissedMessage] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!visible || duration <= 0) return;

    const timeout = setTimeout(() => {
      setDismissedMessage(message);
      onClose?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, message, onClose, visible]);

  if (!visible || dismissedMessage === message) return null;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(message);
    setCopiedMessage(message);
  };

  const handleClose = () => {
    setDismissedMessage(message);
    onClose?.();
  };

  return (
    <View accessibilityRole="alert" style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="smallBold" style={styles.title}>
          {title}
        </ThemedText>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator
          style={styles.messageScroll}
          contentContainerStyle={styles.messageContent}>
          <ThemedText selectable style={styles.message}>
            {message}
          </ThemedText>
        </ScrollView>
      </View>
      <View style={styles.actions}>
        <Pressable accessibilityRole="button" onPress={handleCopy} style={styles.action}>
          <ThemedText style={styles.actionText}>
            {copiedMessage === message ? 'Copiado' : 'Copiar'}
          </ThemedText>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={handleClose} style={styles.action}>
          <ThemedText style={styles.actionText}>Cerrar</ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    zIndex: 10,
    elevation: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#7f1d1d',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  content: { gap: 4 },
  messageScroll: { maxHeight: 180 },
  messageContent: { flexGrow: 1 },
  title: { color: '#fff' },
  message: { color: '#fee2e2' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 16, marginTop: 10 },
  action: { paddingVertical: 4, paddingHorizontal: 6 },
  actionText: { color: '#fff', fontWeight: '700' },
});
