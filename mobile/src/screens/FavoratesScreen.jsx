import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getFavorites, removeFavorite } from '../Utils/favoritesHelper';
import SamethaCard from '../components/SamethaCard';
import { COLORS } from '../theme/colors';

const FavoratesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error loading favorites:', error);
      Alert.alert('Error', 'Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (samethaId) => {
    try {
      await removeFavorite(samethaId);
      setFavorites(prev => prev.filter(fav => fav._id !== samethaId));
      Alert.alert('Removed', 'Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert('Error', 'Failed to remove from favorites');
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <SamethaCard 
        item={item} 
        onPress={(s) => navigation.navigate('SamethaDetail', { sametha: s })} 
      />
      <TouchableOpacity 
        style={styles.removeBtn}
        onPress={() => handleRemoveFavorite(item._id)}
      >
        <Ionicons name="heart" size={20} color="#ef4444" />
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorites</Text>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="heart-outline" size={64} color={COLORS.textMuted} />
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubText}>Add some samethalu to your favorites</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item._id}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  favoriteItem: {
    marginBottom: 16,
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  removeText: {
    fontSize: 14,
    color: '#ef4444',
    marginLeft: 4,
    fontWeight: '600',
  },
});

export default FavoratesScreen;