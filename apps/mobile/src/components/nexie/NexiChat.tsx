/** Emotional Context: BELONGING */
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { NexiMessage } from './NexiMessage';
import { NexiGeometricForm } from '@/components/ui/NexiGeometricForm';

export function NexiChat() {
  const [message, setMessage] = useState('');
  return (
    <View style={styles.container}>
      <NexiMessage role="nexi" message="Hello. I've been learning your style. I'm Nexi. Shall we create something beautiful?" />
      <View style={styles.typing}>
        <NexiGeometricForm size="small" pulse />
        <Text style={styles.typingLabel}>Nexi is thinking…</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput value={message} onChangeText={setMessage} placeholder="Ask Nexi" placeholderTextColor="rgba(245,245,245,0.5)" style={styles.input} />
        <Pressable disabled={!message.trim()} style={[styles.send, !message.trim() && styles.sendDisabled]} accessibilityLabel="Send message">
          <Text style={styles.sendText}>↑</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  typing: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typingLabel: { color: 'rgba(245,245,245,0.7)' },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  input: { flex: 1, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(245,245,245,0.08)', backgroundColor: '#141414', color: '#F5F5F5', paddingHorizontal: 16, height: 52 },
  send: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#D4AF37', alignItems: 'center', justifyContent: 'center' },
  sendDisabled: { borderWidth: 1, borderColor: 'rgba(245,245,245,0.08)', backgroundColor: '#1A1A1A' },
  sendText: { color: '#0B0B0B', fontSize: 20 },
});
