
const APP_PREFIX = '/api/v1';
const AUTH_PREFIX = `${APP_PREFIX}/auth`;
const USERS_PREFIX = `${APP_PREFIX}/users`;

const ENDPOINTS = {
    // RESERVATIONS: '/reservations',
    // POSTE: '/poste',
    // ABONNEMENT: '/abonement',
    
    
    // Auth
    REGISTER: `/register`,
    LOGIN: `/login`,
    RESET_PASSWORD: `/reset-password`,
    VERIFY_EMAIL_ADDRESS: `/verify-email-address`,
    PASSWORD_FORGOT: `/password-forgot`,
    RESET_PASSWORD: `/reset-password`,
    UPDATE_USER_ROLE: `/update-user-role`,
    SET_AMBASSADOR: `/set-ambassador`,
    CLOSE_ACCOUNT: `/close-account`,
    
    // Users
    USER_PROFILE: `/:id`,
    FIND_ALL_USERS: `/`,
    FIND_USER_BY_ID: `/`,
    UPDATE_USER: `/`,
    FIND_ADMIN_USERS: `/admins`,
}

console.log(ENDPOINTS);

module.exports = { 
    ...ENDPOINTS,
    APP_PREFIX,
    AUTH_PREFIX,
    USERS_PREFIX,
};