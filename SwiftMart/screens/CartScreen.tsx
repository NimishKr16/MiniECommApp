import { useCart } from '../context/CartContext';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const CartScreen = () => {
  const { cart, dispatch } = useCart();

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  itemRow: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  title: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  total: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'right',
  },
});

export default CartScreen;