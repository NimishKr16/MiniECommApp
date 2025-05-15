// components/SearchBar.tsx

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
};

const SearchBar = ({ placeholder = 'Search products...', value, onChangeText, editable = false }: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color="#94a3b8" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginVertical: 12,
    width: '90%',
    alignSelf: 'center', // Center the search bar
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
  },
});

export default SearchBar;