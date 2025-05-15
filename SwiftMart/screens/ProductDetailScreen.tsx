import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
export default function ProductDetailScreen() {
  const route = useRoute();

  const { product } = route.params as { product: any };
  const { cart, dispatch } = useCart();
  const cartItem = cart.items.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating.rate} ({product.rating.count} reviews)
        </Text>
        <Text style={styles.description}>{product.description}</Text>

        {cartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() =>
                dispatch({ type: "DECREASE_QUANTITY", productId: product.id })
              }
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() =>
                dispatch({ type: "INCREASE_QUANTITY", productId: product.id })
              }
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => dispatch({ type: "ADD_TO_CART", product })}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fefefe",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  details: {
    marginTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#007aff",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  qtyButton: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  quantity: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
