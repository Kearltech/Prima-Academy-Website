import React from 'react';
import { View, Text, Button, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <View>
          <Text style={styles.greeting}>NeoSynapse</Text>
          <Text style={styles.status}>Online</Text>
        </View>
        <Image source={require('./avatar.png')} style={styles.avatar} />
      </View>
      
      <Text style={styles.timeGreeting}>Good afternoon, Alex</Text>
      <Text style={styles.subtitle}>Personalized insights and care at a glance</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="Search symptoms, meds, doctors"
      />
      
      {/* Meds, Reminders, Activity */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}><Text>2 meds</Text></View>
        <View style={styles.statBox}><Text>1 due</Text></View>
        <View style={styles.statBox}><Text>Stable</Text></View>
      </View>
      
      {/* Main Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Think Health. Think Smart.</Text>
        <Text>Analyze symptoms with medical grade reasoning and next steps.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="Start" onPress={() => {}} />
        </View>
      </View>
      
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionHeader}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBox}>
            <Text>Symptoms</Text>
            <Button title="Start analysis" onPress={() => {}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBox}>
            <Text>Reports</Text>
            <Button title="Open files" onPress={() => {}} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBox}>
            <Text>Reminders</Text>
            <Button title="Manage" onPress={() => {}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBox}>
            <Text>Consult</Text>
            <Button title="Telemedicine" onPress={() => {}} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* AI Health Snapshot */}
      <View style={styles.snapshot}>
        <Text style={styles.sectionHeader}>AI Health Snapshot</Text>
        <Text>No flags detected. Stay hydrated. 1 medication due at 8 PM.</Text>
        <Button title="View details" onPress={() => {}} />
      </View>
      
      {/* Knowledge Hub */}
      <View style={styles.knowledgeHub}>
        <Text style={styles.sectionHeader}>Knowledge Hub</Text>
        <View style={styles.knowledgeRow}>
          <Text>Understanding fever patterns</Text>
          <Text>AI suggested</Text>
        </View>
        <View style={styles.knowledgeRow}>
          <Text>Hydration and headache relief</Text>
          <Text>From Library</Text>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text>Chat | Library | Bookmarks | Profile</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc', padding: 15 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  logo: { width: 40, height: 40, marginRight: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 'auto' },
  greeting: { fontWeight: '700', fontSize: 18 },
  status: { color: 'green' },
  timeGreeting: { fontSize: 16, marginTop: 10 },
  subtitle: { fontSize: 12, color: 'gray', marginBottom: 10 },
  search: { backgroundColor: "#fff", borderRadius: 10, padding: 10, marginVertical: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  statBox: { backgroundColor: '#e5eaf0', padding: 15, borderRadius: 8, width: '30%', alignItems: 'center' },
  card: { backgroundColor: '#d7f5e9', padding: 20, borderRadius: 12, marginVertical: 10 },
  cardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 5 },
  quickActions: { marginTop: 20 },
  sectionHeader: { fontWeight: '700', fontSize: 15, marginBottom: 7 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  actionBox: { backgroundColor: "#fff", padding: 15, borderRadius: 10, width: '48%' },
  snapshot: { backgroundColor: '#fff', padding: 15, marginVertical: 15, borderRadius: 12 },
  knowledgeHub: { backgroundColor: "#fff", padding: 15, borderRadius: 12 },
  knowledgeRow: { borderBottomWidth: 1, borderBottomColor: '#eef1f5', paddingVertical: 8 },
  footer: { alignItems: 'center', padding: 15 }
});

export default App;
