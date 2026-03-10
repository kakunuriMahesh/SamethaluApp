import { useEffect, useState, useCallback } from 'react';
import {
  View, Text, FlatList, RefreshControl, TouchableOpacity,
  StyleSheet, ActivityIndicator, StatusBar, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSamethaOfTheDay, getAllSamethalu } from '../services/api';
import SamethaCard from '../components/SamethaCard';
import { COLORS } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const [dayOf, setDayOf] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [dayRes, allRes] = await Promise.all([
        getSamethaOfTheDay(),
        getAllSamethalu({ limit: 10 }),
      ]);
      setDayOf(dayRes.data.data);
      setRecent(allRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const onRefresh = () => { setRefreshing(true); fetchData(); };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <FlatList
        data={recent}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SamethaCard item={item} onPress={(s) => navigation.navigate('SamethaDetail', { sametha: s })} />
        )}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.gold} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>🌿 సామెతలు</Text>
              <Text style={styles.headerSub}>Telugu Proverbs</Text>
            </View>

            {/* Sametha of the Day */}
            {dayOf && (
              <TouchableOpacity
                style={styles.dayCard}
                onPress={() => navigation.navigate('SamethaDetail', { sametha: dayOf })}
                activeOpacity={0.85}
              >
                <View style={styles.dayHeader}>
                  <Ionicons name="sunny" size={16} color={COLORS.gold} />
                  <Text style={styles.dayLabel}> సామెత ఆఫ్ ది డే</Text>
                </View>
                <Text style={styles.daySametha}>{dayOf.samethaTelugu}</Text>
                <Text style={styles.dayMeaning} numberOfLines={2}>{dayOf.meaningTelugu}</Text>
                <View style={styles.readMore}>
                  <Text style={styles.readMoreText}>Read More</Text>
                  <Ionicons name="arrow-forward" size={14} color={COLORS.gold} />
                </View>
              </TouchableOpacity>
            )}

            <Text style={styles.sectionTitle}>Recent Samethalu</Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: COLORS.textMuted }}>No samethalu found. Add some from admin panel.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingTop: 50 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  list: { padding: 16 },
  header: { marginBottom: 20, marginTop: 8 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  headerSub: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  dayCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: COLORS.goldDark,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dayLabel: { fontSize: 12, fontWeight: '700', color: COLORS.gold, textTransform: 'uppercase', letterSpacing: 0.5 },
  daySametha: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary, lineHeight: 30, marginBottom: 8 },
  dayMeaning: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 21, marginBottom: 14 },
  readMore: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  readMoreText: { fontSize: 13, fontWeight: '600', color: COLORS.gold },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
});
