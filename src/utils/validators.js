export const validateRequired = (value, fieldName = "Field") => {
    if (!value) return `${fieldName} is required`;
    return true;
};

export const validateMobile = (value) => {
    if (!value) return "Mobile number is required";
    if (!/^\d{10}$/.test(value)) return "Mobile number must be 10 digits";
    return true;
};

export const validateUsername = (value) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    return true;
};

export const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return true;
};

export const validateOtp = (value) => {
    const otpString = Array.isArray(value) ? value.join('') : value;
    if (!otpString) return "OTP is required";
    if (!/^\d{6}$/.test(otpString)) return "OTP must be 6 digits";
    return true;
};

export const restrictToNumbers = (value) => {
    return value.replace(/\D/g, "");
};

export const validateEmail = (value) => {
    if (!value) return "Email is required";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Invalid email format";
    return true;
};

export const validateUrl = (value) => {
    if (!value) return true;
    try {
        new URL(value);
        return true;
    } catch (_) {
        return "Invalid URL format";
    }
};
