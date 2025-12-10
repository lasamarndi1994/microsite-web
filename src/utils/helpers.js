export const getImage = (image_name, path) => {
    return path ? import.meta.env.VITE_SERVER_BASE_URL + path + image_name : 'https://via.placeholder.com/150'
}


export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};