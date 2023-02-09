
const APP_PREFIX = '/api/v1';
const AUTH_PREFIX = `${APP_PREFIX}/auth`;
const USERS_PREFIX = `${APP_PREFIX}/users`;

const ENDPOINTS = {
    // RESERVATIONS: '/reservations',
    // POSTE: '/poste',
    // ABONNEMENT: '/abonement',
    
    
    // Auth
    REGISTER: `${AUTH_PREFIX}/register`,
    LOGIN: `${AUTH_PREFIX}/login`,
    RESET_PASSWORD: `${AUTH_PREFIX}/reset-password`,
    
    // Users
    USER_PROFILE: `${USERS_PREFIX}/profile`,
}

console.log(ENDPOINTS);

module.exports = { 
    ...ENDPOINTS,
    APP_PREFIX,
    AUTH_PREFIX,
    USERS_PREFIX,
};