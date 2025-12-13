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
        hour12: false
    });
};

export const SOCIAL_PLATFORMS = [
    {
        name: 'Website',
        icon: 'mdi-web',
        color: 'grey-darken-2',
        placeholder: 'https://www.yourwebsite.com'
    },
    {
        name: 'Facebook',
        icon: 'mdi-facebook',
        color: '#1877F2',
        placeholder: 'https://www.facebook.com/username'
    },
    {
        name: 'Instagram',
        icon: 'mdi-instagram',
        color: '#E4405F',
        placeholder: 'https://www.instagram.com/username'
    },
    {
        name: 'X',
        icon: 'mdi-close',
        color: '#000000',
        placeholder: 'https://x.com/username'
    },
    {
        name: 'LinkedIn',
        icon: 'mdi-linkedin',
        color: '#0A66C2',
        placeholder: 'https://www.linkedin.com/in/username'
    },
    {
        name: 'YouTube',
        icon: 'mdi-youtube',
        color: '#FF0000',
        placeholder: 'https://www.youtube.com/@username'
    },
    {
        name: 'TikTok',
        icon: 'mdi-music-note',
        color: '#000000',
        placeholder: 'https://www.tiktok.com/@username'
    },
    {
        name: 'WhatsApp',
        icon: 'mdi-whatsapp',
        color: '#25D366',
        placeholder: 'https://wa.me/1234567890'
    },
    {
        name: 'GitHub',
        icon: 'mdi-github',
        color: '#181717',
        placeholder: 'https://github.com/username'
    },
    {
        name: 'Telegram',
        icon: 'mdi-send-circle-outline',
        color: '#3390ec',
        placeholder: 'https://t.me/username'
    }
];

export const getSocialIcon = (type) => {
    if (!type) return 'mdi-web';
    const lowerType = type.toLowerCase();

    // Check specific mappings first
    if (lowerType === 'twitter') return 'mdi-close'; // Backward compatibility
    if (lowerType === 'x') return 'mdi-close';
    if (lowerType === 'twitter/x') return 'mdi-close';
    if (lowerType === 'telegram') return 'mdi-send-circle-outline';

    const platform = SOCIAL_PLATFORMS.find(p => p.name.toLowerCase() === lowerType);
    return platform ? platform.icon : 'mdi-' + lowerType.replace(' ', '-');
};

export const getSocialColor = (type) => {
    if (!type) return 'grey-darken-2';
    const lowerType = type.toLowerCase();

    // Check specific mappings first
    if (lowerType === 'twitter') return '#000000'; // Backward compatibility
    if (lowerType === 'x') return '#000000';
    if (lowerType === 'twitter/x') return '#000000';

    const platform = SOCIAL_PLATFORMS.find(p => p.name.toLowerCase() === lowerType);
    return platform ? platform.color : 'grey-darken-2';
};

export const getSocialPlatformsList = () => {
    return SOCIAL_PLATFORMS;
};