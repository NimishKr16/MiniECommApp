import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import Icon from "react-native-vector-icons/Feather";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import FloatingCartButton from "../components/FloatingCartButton";
export default function ProductDetailScreen() {
  const route = useRoute();
  const { product } = route.params as { product: any };
  const { cart, dispatch } = useCart();
  const cartItem = cart.items.find((item) => item.id === product.id);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleBuyNow = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>

        <View style={styles.ratingRow}>
          <Icon name="star" size={16} color="#facc15" />
          <Text style={styles.ratingText}>
            {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
    <Ionicons name="flash-outline" size={20} color="#fff" style={styles.icon} />
    <Text style={styles.buyNowText}>Buy Now</Text>
  </TouchableOpacity>

        {cartItem ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch({ type: "DECREASE_QUANTITY", productId: product.id })}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{cartItem.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch({ type: "INCREASE_QUANTITY", productId: product.id })}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => dispatch({ type: "ADD_TO_CART", product })}
          >
             <Ionicons name="cart-outline" size={20} color="#fff" style={styles.icon} />
             <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
        </View>
      </View>
       {/* Order Confirmation Modal */}
       <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="zoomIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
      >
        <View style={styles.modalCard}>
          <Icon name="check-circle" size={48} color="#10b981" />
          <Text style={styles.modalTitle}>Order Confirmed!</Text>
          <Text style={styles.modalMessage}>
            Your order will arrive in 3–5 business days.
          </Text>

          <Pressable style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeText}>OK</Text>
          </Pressable>
        </View>
      </Modal>


    </ScrollView>
    <FloatingCartButton />
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#f9fafb",
    },
    image: {
      width: "100%",
      height: 320,
      borderRadius: 16,
      backgroundColor: "#fff",
      marginBottom: 20,
    },
    details: {
    //   marginTop: 2,
    },
    title: {
      fontSize: 22,
      fontWeight: "700",
      color: "#1f2937", // slate-800
      marginBottom: 8,
    },
    price: {
      fontSize: 20,
      fontWeight: "600",
      color: "#10b981", // emerald
      marginBottom: 6,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    ratingText: {
      marginLeft: 6,
      fontSize: 14,
      color: "black", // gray-500
    },
    description: {
      fontSize: 15,
      color: "#4b5563", // gray-600
      lineHeight: 22,
      marginBottom: 24,
    },
    button: {
      backgroundColor: "#10b981",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
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
      marginTop: 16,
    },
    qtyButton: {
      backgroundColor: "#e5e7eb", // gray-200
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 10,
      marginHorizontal: 12,
    },
    qtyText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#111827", // slate-900
    },
    quantity: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1f2937",
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        marginRight: 8,
      },
      cartButton: {
        flexDirection: 'row', // ensures icon and text are in one row
        alignItems: 'center', // vertically align icon and text
        justifyContent: 'center',
        backgroundColor: '#111827', // dark gray
        paddingVertical: 14,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
      },
      buyNowButton: {
        flexDirection: 'row',
        backgroundColor: '#3b82f6', // blue
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 2,
      },   
      buyNowText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
      },
      buttonGroup: {
        // marginTop: 1,       // space from the content above
        marginBottom: 30,    // moves buttons up from the bottom
        gap: 12,             // space between Buy Now and Add to Cart
      },
      modalCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 12,
        color: '#1e293b',
      },
      modalMessage: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 20,
      },
      closeButton: {
        backgroundColor: '#10b981',
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
      },
      closeText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
      },
      
  });