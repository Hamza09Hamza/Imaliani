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

export const Statuses=[
    {
        status: 'Pre_order',
        statusIcon: (
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
            </svg>
        ),
        statusClass: 'bg-blue-100 text-blue-800 text-xs',
    },
    {
        status: 'Cancelled',
        statusIcon: (
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
        ),
        statusClass: 'bg-red-100 text-red-800 text-xs',
    },
    {
        status: 'In_transit',
        statusIcon: (
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5v6h-15v-6h15Zm0 0L17.308 7M12 10.5V6m0 0-2.192 4.5M12 6l2.192 4.5" />
            </svg>
        ),
        statusClass: 'bg-yellow-100 text-yellow-800 text-xs',
    },
    {
        status: 'Processing',
        statusIcon: (
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20m10-10H2" />
            </svg>
        ),
        statusClass: 'bg-purple-100 text-purple-800 text-xs',
    },
    {
        status: 'Shipped',
        statusIcon: (
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L19 7" />
            </svg>
        ),
        statusClass: 'bg-cyan-100 text-cyan-800 text-xs',
    }

]
