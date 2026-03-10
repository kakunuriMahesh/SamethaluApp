import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { COLORS, CATEGORY_COLORS } from '../theme/colors';

export default function SamethaCard({ item, onPress }) {
  const catColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.other;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.75}>
      <View style={[styles.catStripe, { backgroundColor: catColor }]} />
      <View style={styles.content}>
        <Text style={styles.sametha} numberOfLines={2}>{item.samethaTelugu}</Text>
        <Text style={styles.meaning} numberOfLines={2}>{item.meaningTelugu}</Text>
        <View style={styles.footer}>
          <View style={[styles.catBadge, { backgroundColor: catColor + '22', borderColor: catColor + '44' }]}>
            <Text style={[styles.catText, { color: catColor }]}>{item.category}</Text>
          </View>
          {item.hasEnglish && (
            <View style={styles.engBadge}>
              <Text style={styles.engText}>EN</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  catStripe: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  sametha: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
    lineHeight: 24,
  },
  meaning: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
  },
  catText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  engBadge: {
    backgroundColor: 'rgba(59,130,246,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.25)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
  },
  engText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
  },
});
