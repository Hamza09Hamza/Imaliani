export  const getDateRange = (filter) => {
    const now = new Date();
    let startDate;
    
    switch (filter) {
        case 'this week':
            startDate = new Date(now.setDate(now.getDate() - now.getDay()));
            break;
        case 'this month':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'last 3 months':
            startDate = new Date(now.setMonth(now.getMonth() - 3));
            break;
        case 'last 6 months':
            startDate = new Date(now.setMonth(now.getMonth() - 6));
            break;
        case 'this year':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(0); // No filter, show all dates
    }
    
    return startDate;
};