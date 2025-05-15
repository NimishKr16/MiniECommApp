import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext'; // adjust path as needed

type Props = {
    style?: ViewStyle | ViewStyle[];
  };

const FloatingCartButton = ({ style }: Props) => {
  const navigation = useNavigation<any>();
  const { cart } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
    style={[styles.fab, style]}
      onPress={() => navigation.navigate('Cart')}
      activeOpacity={0.8}
    >
      <Icon name="shopping-cart" size={24} color="#fff" />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#10b981',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    zIndex: 999,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default FloatingCartButton;