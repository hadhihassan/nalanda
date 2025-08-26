import bcryptjs from 'bcryptjs';

export async function comparePasswords(secrePassword, normalPassword) {
    return await bcryptjs.compare(secrePassword, normalPassword);
}

export async function convertSecurePassword(password) {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}