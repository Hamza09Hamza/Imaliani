import { getDocs, collection, query, where, orderBy, limit, startAfter, addDoc, doc, updateDoc } from "firebase/firestore";
import { DB, auth } from "../Initialisation";
import { decryptData, encryptData } from "../../app/Utils/Encryption";
 

export const getUserOrders = async (lastVisibleOrder = null, pageSize = 10,userId) => {
    try {
        const ordersRef = collection(DB, "Orders");
        let ordersQuery = query(
            ordersRef,
            where("userID", "==",userId), 
            orderBy("Status.Pre_order", "desc"),
            limit(pageSize)
        );

        if (lastVisibleOrder) {
            ordersQuery = query(
                ordersQuery,
                startAfter(lastVisibleOrder)
            );
        }

        const querySnapshot = await getDocs(ordersQuery);
        querySnapshot.docs.map(doc=>{console.log(doc.data())})
        const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            
            return {
                orderId: doc.id,
                ...data,
                UserID: data.UserID,
                products: data.products.map(product => ({
                    ...product,
                    id: product.id
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
        const ordersRef = collection(DB, "Orders");
        let ordersQuery = query(
            ordersRef,
            orderBy("Status.Pre_order", "desc"),
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
                orderId: doc.id,
                ...data,
                UserID: data.UserID,
                products: data.products.map(product => ({
                    ...product,
                    ProductID: decryptData(product.id)
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


export const setNewOrder = async ( orderData) => {
    try {
        
        

        await addDoc(collection(DB, "Orders"), encryptedOrderData);
        console.log("Order saved successfully. with ID:",orderData.UserID);
    } catch (error) {
        console.error("Error saving order:", error);
        throw new Error("Failed to save order.");
    }
};


export const deleteOrder = async (orderId) => {
    try {
        const orderRef = doc(DB, "Orders", orderId);
        await deleteDoc(orderRef);
        console.log("Order deleted successfully.");
    } catch (error) {
        console.error("Error deleting order:", error);
        throw new Error("Failed to delete order.");
    }
};


export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const orderRef = doc(DB, "Orders", orderId);
        await updateDoc(orderRef, { Status: newStatus });
        console.log("Order status updated successfully.");
    } catch (error) {
        console.error("Error updating order status:", error);
        throw new Error("Failed to update order status.");
    }
};