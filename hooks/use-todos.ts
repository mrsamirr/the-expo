import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Todo } from '@/types/todo';

const STORAGE_KEY = '@todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from storage on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTodos(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Save todos to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch((error) =>
        console.error('Failed to save todos:', error)
      );
    }
  }, [todos, isLoading]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  return {
    todos,
    isLoading,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}
