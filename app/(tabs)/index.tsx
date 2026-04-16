import { StyleSheet, FlatList, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TodoItem } from '@/components/todo-item';
import { AddTodo } from '@/components/add-todo';
import { useTodos } from '@/hooks/use-todos';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { Todo } from '@/types/todo';

export default function HomeScreen() {
  const { todos, isLoading, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const tintColor = useThemeColor({}, 'tint');

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  const renderItem = ({ item }: { item: Todo }) => (
    <TodoItem todo={item} onToggle={toggleTodo} onDelete={deleteTodo} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={tintColor} />
      ) : (
        <>
          <ThemedText style={styles.emptyText}>No todos yet</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Add your first todo above
          </ThemedText>
        </>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.statsContainer}>
      <ThemedText>
        {completedCount} of {totalCount} completed
      </ThemedText>
      {completedCount > 0 && (
        <Pressable onPress={clearCompleted}>
          <ThemedText style={{ color: tintColor }}>Clear completed</ThemedText>
        </Pressable>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          My Todos
        </ThemedText>

        <AddTodo onAdd={addTodo} />

        <FlatList
          data={todos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={totalCount > 0 ? renderHeader : null}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    marginBottom: 24,
  },
  listContent: {
    flexGrow: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    opacity: 0.6,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.4,
  },
});
