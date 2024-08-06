import { Timestamp } from 'firebase/firestore';

export function getCurrentFirestoreTimestamp() {
    return Timestamp.now();
}
export function timestampToDate(timestamp) {
    if (!timestamp || typeof timestamp.seconds !== 'number' || typeof timestamp.nanoseconds !== 'number') {
        throw new Error('Invalid timestamp format');
    }
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    let date=new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    return  new Intl.DateTimeFormat('de-DE', options).format(date);
    
    
     
}
export function getMostRecentStatus(statuses) {
    // Define the priority order of statuses
    const statusOrder = ['Shipped', 'In_transit', 'Processing', 'Pre_order','Cancelled'];

    // Iterate over the statusOrder array
    for (const status of statusOrder) {
        // Check if the current status has a non-null date
        if (statuses[status] && statuses[status].seconds !== null && statuses[status].nanoseconds !== null) {
            // Return the status if it has a valid date
            return status;
        }
    }

    // Return null if no valid statuses are found
    return null;
}


