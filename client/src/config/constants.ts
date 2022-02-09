// api related data
const API_BASE_ADDRESS = process.env.REACT_APP_API_BASE;
const API_VERSION = process.env.REACT_APP_API_VERSION;
const API_URL = `${API_BASE_ADDRESS}${API_VERSION}`;
export const GET_AREAS_URL = `${API_URL}/areas`;
export const GET_SPECTRUM_URL = (area: string | number) => (`${API_URL}/spectrum/${area}`);
