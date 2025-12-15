import websiteIcon from '@/assets/images/icon/earth-americas-solid-full.svg';
import facebookIcon from '@/assets/images/icon/facebook-brands-solid-full.svg';
import instagramIcon from '@/assets/images/icon/instagram-brands-solid-full.svg';
import xTwitterIcon from '@/assets/images/icon/x-twitter-brands-solid-full.svg';
import linkedinIcon from '@/assets/images/icon/linkedin-brands-solid-full.svg';
import youtubeIcon from '@/assets/images/icon/youtube-brands-solid-full.svg';

import whatsappIcon from '@/assets/images/icon/whatsapp-brands-solid-full.svg';
import telegramIcon from '@/assets/images/icon/telegram-brands-solid-full.svg';

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
        icon: websiteIcon,
        color: '#616161',
        placeholder: 'https://www.yourwebsite.com'
    },
    {
        name: 'Facebook',
        icon: facebookIcon,
        color: '#1877F2',
        placeholder: 'https://www.facebook.com/username'
    },
    {
        name: 'Instagram',
        icon: instagramIcon,
        color: '#E4405F',
        placeholder: 'https://www.instagram.com/username'
    },
    {
        name: 'X Twitter',
        icon: xTwitterIcon,
        color: '#000000',
        placeholder: 'https://x.com/username'
    },
    {
        name: 'LinkedIn',
        icon: linkedinIcon,
        color: '#0A66C2',
        placeholder: 'https://www.linkedin.com/in/username'
    },
    {
        name: 'YouTube',
        icon: youtubeIcon,
        color: '#FF0000',
        placeholder: 'https://www.youtube.com/@username'
    },
    {
        name: 'WhatsApp',
        icon: whatsappIcon,
        color: '#25D366',
        placeholder: 'https://wa.me/1234567890'
    },
    {
        name: 'Telegram',
        icon: telegramIcon,
        color: '#3390ec',
        placeholder: 'https://t.me/username'
    }
];

export const getSocialIcon = (type) => {
    if (!type) return websiteIcon;
    const lowerType = type.toLowerCase();

    const platform = SOCIAL_PLATFORMS.find(p => p.name.toLowerCase() === lowerType);
    return platform ? platform.icon : websiteIcon;
};

export const getSocialColor = (type) => {
    if (!type) return '#616161';
    const lowerType = type.toLowerCase();

    const platform = SOCIAL_PLATFORMS.find(p => p.name.toLowerCase() === lowerType);
    return platform ? platform.color : '#616161';
};

export const getSocialPlatformsList = () => {
    return SOCIAL_PLATFORMS;
};