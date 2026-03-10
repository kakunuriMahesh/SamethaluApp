import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORY_COLORS, CATEGORY_ICONS } from '../theme/colors';

export default function CategoryCard({ category, count, onPress }) {
  const color = CATEGORY_COLORS[category] || '#6b7280';
  const icon = CATEGORY_ICONS[category] || 'grid';

  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: color + '33' }]}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '22' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.name}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    flex: 1,
    margin: 5,
    minWidth: 100,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  count: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 3,
  },
});
