import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator, StatusBar,
} from 'react-native';
import { getCategories } from '../services/api';
import CategoryCard from '../components/CategoryCard';
import { COLORS } from '../theme/colors';

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
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
