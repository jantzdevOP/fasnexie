/** Emotional Context: ASPIRATION */
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { archetypes } from '@/constants/archetypes';
import { GoldProgress } from '@/components/ui/GoldProgress';
import { BrandButton } from '@/components/ui/BrandButton';
import { useHaptics } from '@/hooks/useHaptics';

export default function ArchetypeStep() {
  const [selected, setSelected] = useState<string | null>(null);
  const { trigger } = useHaptics();
  return (
    <SafeAreaView style={styles.screen}>
      <GoldProgress progress={2 / 6} />
      <Text style={styles.header}>Find Your Style Essence</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {archetypes.map((archetype) => (
          <Pressable key={archetype.id} style={[styles.card, selected === archetype.id && styles.selected]} onPress={() => setSelected(archetype.id)}>
            <Text style={styles.name}>{archetype.name}</Text>
            <Text style={styles.tagline}>{archetype.tagline}</Text>
            <Text style={styles.body}>{archetype.description}</Text>
            {selected === archetype.id ? (
              <BrandButton
                label="This is me"
                variant="ceremonial"
                onPress={() => {
                  trigger('confirmation').catch(() => undefined);
                  router.push('/onboarding/body-profile');
                }}
              />
            ) : null}
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.actions}>
        <BrandButton label="Back" variant="ghost" onPress={() => router.back()} />
        <BrandButton
          label="Continue"
          variant="secondary"
          disabled={!selected}
          onPress={() => {
            if (!selected) return;
            trigger('confirmation').catch(() => undefined);
            router.push('/onboarding/body-profile');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: '#0B0B0B', padding: 20, gap: 16 }, header: { color: '#D4AF37', fontSize: 36, lineHeight: 44 }, row: { gap: 16 }, card: { width: 280, backgroundColor: '#141414', borderRadius: 12, padding: 16, gap: 8, borderWidth: 1, borderColor: 'rgba(245,245,245,0.08)' }, selected: { borderColor: 'rgba(212,175,55,0.3)', shadowColor: '#D4AF37', shadowOpacity: 0.25, shadowRadius: 12 }, name: { color: '#F5F5F5', fontSize: 22 }, tagline: { color: '#D4AF37' }, body: { color: 'rgba(245,245,245,0.7)' }, actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 } });
