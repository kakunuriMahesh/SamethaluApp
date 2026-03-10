import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';

export default function SamethaDetailScreen({ route, navigation }) {
  const { sametha } = route.params;
  const [showEnglish, setShowEnglish] = useState(false);
  const catColor = CATEGORY_COLORS[sametha.category] || '#6b7280';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={[styles.catBadge, { backgroundColor: catColor + '22', borderColor: catColor + '44' }]}>
          <Text style={[styles.catText, { color: catColor }]}>{sametha.category}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Language Toggle */}
        {sametha.hasEnglish && (
          <View style={styles.toggleRow}>
            <TouchableOpacity
              style={[styles.toggleBtn, !showEnglish && styles.toggleActive]}
              onPress={() => setShowEnglish(false)}
            >
              <Text style={[styles.toggleText, !showEnglish && styles.toggleActiveText]}>తెలుగు</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, showEnglish && styles.toggleActive]}
              onPress={() => setShowEnglish(true)}
            >
              <Text style={[styles.toggleText, showEnglish && styles.toggleActiveText]}>English</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sametha Title */}
        <View style={styles.mainCard}>
          <Text style={styles.mainSametha}>
            {showEnglish && sametha.samethaEnglish ? sametha.samethaEnglish : sametha.samethaTelugu}
          </Text>
        </View>

        {/* Sections */}
        <Section
          icon="book-outline"
          title={showEnglish ? 'Meaning' : 'అర్థం'}
          color={COLORS.gold}
          content={showEnglish && sametha.meaningEnglish ? sametha.meaningEnglish : sametha.meaningTelugu}
        />

        <Section
          icon="information-circle-outline"
          title={showEnglish ? 'Explanation' : 'వివరణ'}
          color="#3b82f6"
          content={sametha.explanationTelugu}
        />

        {sametha.exampleTelugu ? (
          <Section
            icon="chatbubble-outline"
            title="ఉదాహరణ"
            color="#22c55e"
            content={sametha.exampleTelugu}
          />
        ) : null}

        {/* Tags */}
        {sametha.tags && sametha.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagLabel}>Tags</Text>
            <View style={styles.tagsRow}>
              {sametha.tags.map((tag, i) => (
                <View key={i} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Section({ icon, title, color, content }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={[styles.sectionTitle, { color }]}>{title}</Text>
      </View>
      <Text style={styles.sectionContent}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: COLORS.bgCard,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  catBadge: {
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 20, borderWidth: 1,
  },
  catText: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' },
  scroll: { padding: 16, paddingBottom: 40 },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: 12,
    padding: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  toggleBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 10 },
  toggleActive: { backgroundColor: COLORS.gold },
  toggleText: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  toggleActiveText: { color: '#000' },
  mainCard: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: COLORS.goldDark,
  },
  mainSametha: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 34,
    textAlign: 'center',
  },
  section: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionContent: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 23 },
  tagsSection: { marginTop: 8 },
  tagLabel: { fontSize: 11, color: COLORS.textMuted, fontWeight: '600', textTransform: 'uppercase', marginBottom: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    backgroundColor: 'rgba(212,160,23,0.1)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(212,160,23,0.2)',
  },
  tagText: { fontSize: 12, color: COLORS.gold, fontWeight: '500' },
});
