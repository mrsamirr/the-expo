import { StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#e0e0e0', dark: '#333' }, 'icon');

  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(todo.id);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(todo.id);
  };

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <Pressable
        style={styles.checkbox}
        onPress={handleToggle}
        hitSlop={8}
      >
        <Ionicons
          name={todo.completed ? 'checkbox' : 'square-outline'}
          size={24}
          color={todo.completed ? tintColor : iconColor}
        />
      </Pressable>

      <Pressable style={styles.textContainer} onPress={handleToggle}>
        <ThemedText
          style={[
            styles.text,
            todo.completed && styles.completedText,
          ]}
          numberOfLines={2}
        >
          {todo.text}
        </ThemedText>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={handleDelete}
        hitSlop={8}
      >
        <Ionicons name="trash-outline" size={20} color={iconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  checkbox: {
    padding: 4,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  deleteButton: {
    padding: 4,
  },
});
