export const getImage = (image_name, path) => {
    return path ? import.meta.env.VITE_SERVER_BASE_URL + path + image_name : 'https://via.placeholder.com/150'
}
