/** Emotional Context: DISCOVERY */
import { FlatList, RefreshControl } from 'react-native';
import { FeedCard } from './FeedCard';
import { useState } from 'react';

const data = [
  { id: '1', title: 'Textile Revival in Nairobi', summary: 'Craft, technology, and modern silhouette.' },
  { id: '2', title: 'Lagos Runway Radar', summary: 'Emerging labels shaping premium streetwear.' },
];

export function FeedList() {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} tintColor="#D4AF37" />}
      renderItem={({ item }) => <FeedCard title={item.title} summary={item.summary} />}
      contentContainerStyle={{ gap: 12 }}
    />
  );
}
