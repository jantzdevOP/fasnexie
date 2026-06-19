/** Emotional Context: EMPOWERMENT */
import { Modal, View, Text, StyleSheet } from 'react-native';
import { NexiGeometricForm } from '@/components/ui/NexiGeometricForm';

export function NexiVoiceInput({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <NexiGeometricForm size="large" pulse thinking />
        <Text style={styles.label}>Listening...</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(11,11,11,0.96)', alignItems: 'center', justifyContent: 'center', gap: 16 },
  label: { color: '#D4AF37', fontSize: 18 },
});
