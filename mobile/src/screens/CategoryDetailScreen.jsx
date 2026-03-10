import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
  TouchableOpacity, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSamethaByCategory } from '../services/api';
import SamethaCard from '../components/SamethaCard';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';

export default function CategoryDetailScreen({ route, navigation }) {
  const { category } = route.params;
  const [samethalu, setSamethalu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const color = CATEGORY_COLORS[category] || '#6b7280';

  useEffect(() => {
    getSamethaByCategory(category, { page, limit: 15 })
      .then((res) => {
        setSamethalu((prev) => page === 1 ? res.data.data : [...prev, ...res.data.data]);
        setTotalPages(res.data.pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, page]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <View style={[styles.header, { borderBottomColor: color + '44' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.title, { color }]}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
          <Text style={styles.subtitle}>Category</Text>
        </View>
      </View>

      {loading && page === 1 ? (
        <ActivityIndicator color={COLORS.gold} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={samethalu}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SamethaCard item={item} onPress={(s) => navigation.navigate('SamethaDetail', { sametha: s })} />
          )}
          onEndReached={() => { if (page < totalPages) setPage((p) => p + 1); }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loading ? <ActivityIndicator color={COLORS.gold} style={{ marginVertical: 20 }} /> : null}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={{ color: COLORS.textMuted }}>No samethalu in this category yet.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 50 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    paddingTop: 20,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 11, color: COLORS.textMuted },
  list: { padding: 16 },
  empty: { alignItems: 'center', paddingTop: 40 },
});
