import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import type { ComponentProps } from 'react';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type HomeModuleCardProps = {
  title: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress?: () => void;
  disabled?: boolean;
};

export function HomeModuleCard({
  title,
  description,
  icon,
  onPress,
  disabled = false,
}: HomeModuleCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${disabled ? 'Módulo no disponible' : 'Abrir'} ${title}`}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
        },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.backgroundSelected }]}>
        <Ionicons name={icon} size={26} color={theme.accent} />
      </View>
      <View style={styles.textContainer}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {description}
        </ThemedText>
      </View>
      <Ionicons name={disabled ? 'lock-closed-outline' : 'chevron-forward'} size={20} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  textContainer: { flex: 1, gap: 2 },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.55 },
});
