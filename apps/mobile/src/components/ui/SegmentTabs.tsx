/** Emotional Context: BELONGING */
import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native';
import { colors } from '@/lib/theme/colors';
import { typography } from '@/lib/theme/typography';
import { useHaptics } from '@/hooks/useHaptics';

type Props = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export function SegmentTabs({ tabs, active, onChange }: Props) {
  const { trigger } = useHaptics();

  return (
    <View style={styles.wrap}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <Pressable
              key={tab}
              onPress={() => {
                if (tab !== active) {
                  trigger('select').catch(() => undefined);
                }
                onChange(tab);
              }}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {tab}
              </Text>
              {isActive ? <View style={styles.underline} /> : null}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderSubtle,
    marginBottom: 8,
  },
  row: {
    gap: 4,
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: 'relative',
  },
  tabActive: {},
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: typography.families.bodyMedium,
  },
  labelActive: {
    color: colors.accentGold,
  },
  underline: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 0,
    height: 2,
    backgroundColor: colors.accentGold,
    borderRadius: 1,
  },
});