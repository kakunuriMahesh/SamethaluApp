import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { COLORS } from '../theme/colors';

const CATEGORY_STORAGE_KEY = 'categories_cache';

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // ✅ 1. Load from local storage FIRST (instant)
        const localData = await AsyncStorage.getItem(CATEGORY_STORAGE_KEY);
        if (localData) {
          const parsed = JSON.parse(localData);
          setCategories(parsed);
          setLoading(false); // 👈 stop loader immediately
        }

        // ✅ 2. Fetch from API (background)
        const res = await getCategories();
        const freshData = res?.data?.data || [];

        setCategories(freshData);
        setLoading(false);

        // ✅ 3. Save to local
        await AsyncStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(freshData));
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={styles.header}>
        <Text style={styles.title}>వర్గాలు</Text>
        <Text style={styles.subtitle}>Browse by Category</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.gold} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item._id}
          numColumns={3}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <CategoryCard
              category={item._id}
              count={item.count}
              onPress={(cat) => navigation.navigate('CategoryDetail', { category: cat })}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={{ color: COLORS.textMuted }}>No categories found.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 50 },
  header: { padding: 16, paddingTop: 20 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  grid: { padding: 11, paddingBottom: 30 },
  empty: { alignItems: 'center', paddingTop: 40 },
});
