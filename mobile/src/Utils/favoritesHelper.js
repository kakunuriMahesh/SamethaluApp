import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favorites';

/**
 * Get all favorite samethalu from local storage
 * @returns {Promise<Array>} Array of favorite samethalu
 */
export const getFavorites = async () => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

/**
 * Check if a sametha is favorite
 * @param {string} samethaId - The ID of the sametha to check
 * @returns {Promise<boolean>} True if favorite, false otherwise
 */
export const isFavorite = async (samethaId) => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav._id === samethaId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

/**
 * Add sametha to favorites
 * @param {Object} sametha - The sametha object to add
 * @returns {Promise<boolean>} True if successful
 */
export const addFavorite = async (sametha) => {
  try {
    const favorites = await getFavorites();
    
    // Check if already exists
    if (favorites.some(fav => fav._id === sametha._id)) {
      return false;
    }
    
    favorites.push(sametha);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
};

/**
 * Remove sametha from favorites
 * @param {string} samethaId - The ID of the sametha to remove
 * @returns {Promise<boolean>} True if successful
 */
export const removeFavorite = async (samethaId) => {
  try {
    const favorites = await getFavorites();
    const filteredFavorites = favorites.filter(fav => fav._id !== samethaId);
    
    if (filteredFavorites.length === favorites.length) {
      return false; // Item was not found
    }
    
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

/**
 * Toggle favorite status for a sametha
 * @param {Object} sametha - The sametha object
 * @returns {Promise<boolean>} True if now favorite, false if no longer favorite
 */
export const toggleFavorite = async (sametha) => {
  try {
    const isFav = await isFavorite(sametha._id);
    
    if (isFav) {
      await removeFavorite(sametha._id);
      return false;
    } else {
      await addFavorite(sametha);
      return true;
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

/**
 * Clear all favorites
 * @returns {Promise<boolean>} True if successful
 */
export const clearAllFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
};
