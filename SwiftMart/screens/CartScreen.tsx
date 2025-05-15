import { useCart } from '../context/CartContext';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const { cart, dispatch } = useCart();

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    if (Platform.OS === 'web') {
        const confirm = window.confirm('Are you sure you want to remove this item?');
        if (confirm) {
          dispatch({ type: 'REMOVE_FROM_CART', productId: id });
        }
      } else {
        Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Remove',
              style: 'destructive',
              onPress: () => dispatch({ type: 'REMOVE_FROM_CART', productId: id }),
            },
          ]);
      }
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      {cart.items.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
  </View>
) : (
  <FlatList
    data={cart.items}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={{ paddingBottom: 20 }}
    renderItem={({ item }) => (
      <View style={styles.itemCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.details}>Qty: {item.quantity}</Text>
          <Text style={styles.price}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.deleteButton}
        >
          <Icon name="trash-outline" size={22} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    )}
  />
)}

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ₹{totalPrice.toFixed(2)}</Text>
        {/* Optional: Clear Cart Button */}
        <TouchableOpacity
          onPress={() => dispatch({ type: 'INIT_CART', payload: [] })}
          style={styles.clearButton}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Clear Cart</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fefefe',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007aff',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 16,
    borderRadius: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#111',
  },
  footer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    paddingTop: 12,
    marginBottom: 24,
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    fontWeight: '500',
  },
});

export default CartScreen;