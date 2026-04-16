import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useThemeColor } from '@/hooks/use-theme-color';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({ light: '#f5f5f5', dark: '#222' }, 'background');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onAdd(trimmed);
      setText('');
    }
  };

  const isDisabled = !text.trim();

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { color: textColor, backgroundColor, borderColor: iconColor }]}
        value={text}
        onChangeText={setText}
        placeholder="What needs to be done?"
        placeholderTextColor={iconColor}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        autoCapitalize="sentences"
        autoCorrect
      />
      <Pressable
        style={[
          styles.addButton,
          { backgroundColor: isDisabled ? iconColor : tintColor },
        ]}
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
