import { Timestamp } from 'firebase/firestore';

export function getCurrentFirestoreTimestamp() {
    return Timestamp.now();
}
export function formatTimestamp(timestamp) {
    console.log(timestamp)
    // Ensure the input is a Firebase Timestamp or a Date object
    let date;
    if (timestamp instanceof Date) {
        date = timestamp;
    } else if (timestamp instanceof Timestamp) {
        date = timestamp.toDate();
    } else {
        console.error('Invalid timestamp:', timestamp);
        return ''; // Return an empty string or handle the error as needed
    }

    // Define options for date formatting
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    // Format the date
    const formattedDate = new Intl.DateTimeFormat('de-DE', options).format(date);

    return formattedDate;
}


export function getMostRecentStatus(statuses) {
    
    const statusOrder = ['Pre_order', 'Processing', 'In_transit', 'Shipped'];
    
    const statusEntries = Object.entries(statuses)
        .filter(([status, date]) => date !== null) 
        .map(([status, date]) => ({ status, date }));

    if (statusEntries.length === 0) {
        return null;
    }

    // Find the most recent date
    const mostRecent = statusEntries.reduce((latest, current) => 
        current.date > latest.date ? current : latest
    );

    // Return the status of the most recent date, respecting the order
    return mostRecent.status;
}



