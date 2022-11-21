const PROD = {
    URL: `https://${window.location.host}/`,
    IS_DEBUG: false,
    LOG_STATE: false,
};

const DEBUG = {
    URL: `https://${window.location.host}/`,
    IS_DEBUG: true,
    LOG_STATE: false,
};

const LOCAL = {
    URL: `http://localhost:3000/`,
    IS_DEBUG: false,
    LOG_STATE: false,
};

// @ts-ignore
const isLocal = process.env.REACT_APP_IS_LOCAL === 'true';
// @ts-ignore
export const Configs = isLocal ? LOCAL : process.env.NODE_ENV === 'development' ? DEBUG : PROD;