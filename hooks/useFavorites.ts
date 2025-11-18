'use client';

import { useState, useEffect } from 'react';
import { FavoriteItem } from '@/lib/types';

const STORAGE_KEY = 'euromatches_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
      setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (items: FavoriteItem[]) => {
    setFavorites(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  };

  const addFavorite = (item: FavoriteItem) => {
    const exists = favorites.some((fav) => fav.id === item.id && fav.type === item.type);
    if (!exists) {
      saveFavorites([...favorites, { ...item, addedAt: Date.now() }]);
    }
  };

  const removeFavorite = (type: 'team' | 'player', id: number) => {
    saveFavorites(favorites.filter((fav) => !(fav.type === type && fav.id === id)));
  };

  const isFavorite = (type: 'team' | 'player', id: number) => {
    return favorites.some((fav) => fav.type === type && fav.id === id);
  };

  const toggleFavorite = (item: Omit<FavoriteItem, 'addedAt'>) => {
    if (isFavorite(item.type, item.id)) {
      removeFavorite(item.type, item.id);
    } else {
      addFavorite(item as FavoriteItem);
    }
  };

  return {
    favorites,
    isLoaded,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
