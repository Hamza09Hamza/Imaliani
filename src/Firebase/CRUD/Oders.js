import { getDocs, collection, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { DB } from "./Initialisation";
import { decryptData, encryptData } from "../../app/Utils/Encryption";
 

export const getUserOrders = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const encryptedUserData = sessionStorage.getItem('UserData');
        if (!encryptedUserData) {
            throw new Error("User data not found in session storage.");
        }
        
        const userData = decryptData(encryptedUserData);
        const userId = userData?.id;
        if (!userId) {
            throw new Error("User ID not found in decrypted user data.");
        }

        const ordersRef = collection(DB, "orders");
        let ordersQuery = query(
            ordersRef,
            where("UserID", "==", encryptData(userId)), 
            orderBy("date", "desc"),
            limit(pageSize)
        );

        if (lastVisibleOrder) {
            ordersQuery = query(
                ordersQuery,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(ordersQuery);
        const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Decrypt UserID and ProductIDs
            return {
                id: doc.id,
                ...data,
                UserID: decryptData(data.UserID),
                Products: data.Products.map(product => ({
                    ...product,
                    ProductID: decryptData(product.ProductID)
                }))
            };
        });

        // Get the last visible document for pagination
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { orders, lastVisible };
    } catch (error) {
        console.error("Error retrieving user orders:", error);
        throw new Error("Failed to retrieve orders.");
    }
};


export const getAllOrders = async (lastVisibleOrder = null, pageSize = 10) => {
    try {
        const ordersRef = collection(DB, "orders");
        let ordersQuery = query(
            ordersRef,
            orderBy("date", "desc"),
            limit(pageSize)
        );

        if (lastVisibleOrder) {
            ordersQuery = query(
                ordersQuery,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(ordersQuery);
        const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                UserID: decryptData(data.UserID),
                Products: data.Products.map(product => ({
                    ...product,
                    ProductID: decryptData(product.ProductID)
                }))
            };
        });

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { orders, lastVisible };
    } catch (error) {
        console.error("Error retrieving all orders:", error);
        throw new Error("Failed to retrieve orders.");
    }
};


export const setNewOrder = async (orderId, orderData) => {
    try {
        
        const encryptedOrderData = {
            ...orderData,
            UserID: encryptData(orderData.UserID),
            Products: orderData.Products.map(product => ({
                ...product,
                ProductID: encryptData(product.ProductID)
            }))
        };

        await setDoc(doc(DB, "orders", orderId), encryptedOrderData);
        console.log("Order saved successfully.");
    } catch (error) {
        console.error("Error saving order:", error);
        throw new Error("Failed to save order.");
    }
};


export const deleteOrder = async (orderId) => {
    try {
        const orderRef = doc(DB, "orders", orderId);
        await deleteDoc(orderRef);
        console.log("Order deleted successfully.");
    } catch (error) {
        console.error("Error deleting order:", error);
        throw new Error("Failed to delete order.");
    }
};


export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const orderRef = doc(DB, "orders", orderId);
        await updateDoc(orderRef, { Status: newStatus });
        console.log("Order status updated successfully.");
    } catch (error) {
        console.error("Error updating order status:", error);
        throw new Error("Failed to update order status.");
    }
};