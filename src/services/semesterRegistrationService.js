import axios from 'axios';
import { semesterAuthApiUrl, semesterDataApiUrl, isMockMode } from '../config/semesterRegistrationConfig';
import { getPortalSession } from '../utils/portalSession';
import { 
  MOCK_STUDENT_PROFILE, 
  MOCK_FEE_STATUS_PAID, 
  MOCK_FEE_STATUS_UNPAID, 
  MOCK_REGISTRATIONS, 
  REGISTRATION_STORAGE_KEY 
} from '../Data/semesterRegistrationData';

const getAuthToken = () => {
  const session = getPortalSession();
  return session ? session.token : null;
};

const createAxiosInstance = (baseURL) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  return instance;
};

export const createAuthClient = () => {
  return createAxiosInstance(semesterAuthApiUrl);
};

export const createDataClient = () => {
  return createAxiosInstance(semesterDataApiUrl);
};

const authClient = createAuthClient();
const dataClient = createDataClient();

const getLocalRegistrations = () => {
  try {
    const localData = localStorage.getItem(REGISTRATION_STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalRegistration = (registration) => {
  try {
    const existing = getLocalRegistrations();
    localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify([registration, ...existing]));
  } catch (e) {
    console.error('Error saving registration to local storage', e);
  }
};

export const fetchStudentProfile = async () => {
  if (!isMockMode) {
    try {
      const response = await authClient.get('/student/profile');
      return response.data;
    } catch (error) {
      console.warn('API fetchStudentProfile failed, falling back to mock data', error);
    }
  }
  // Return profile based on logged-in user
  const session = getPortalSession();
  const username = session?.user?.username || session?.user?.email || '';
  if (username === 'student2' || username === 'student2@gbu.ac.in') {
    return Promise.resolve({ name: 'Priya Sharma', rollNumber: '2023SOM002', email: 'student2@gbu.ac.in', phone: '9876543211', school: 'SOM', programme: 'MBA', specialisation: 'Finance', year: '2nd Year', semester: 3 });
  }
  return Promise.resolve(MOCK_STUDENT_PROFILE);
};

export const verifyFeeStatus = async (rollNumber, semester) => {
  if (!isMockMode) {
    try {
      const response = await authClient.get('/fee-status', { params: { roll: rollNumber, semester } });
      return response.data;
    } catch (error) {
      console.warn('API verifyFeeStatus failed, falling back to mock data', error);
    }
  }
  // Mock mode: student2 has unpaid fees, everyone else has paid fees
  const session = getPortalSession();
  const username = session?.user?.username || session?.user?.email || '';
  const isUnpaid = username === 'student2' || username === 'student2@gbu.ac.in';
  return Promise.resolve(isUnpaid ? MOCK_FEE_STATUS_UNPAID : MOCK_FEE_STATUS_PAID);
};

export const submitRegistration = async (formData) => {
  if (!isMockMode) {
    try {
      const response = await dataClient.post('/registrations', formData);
      return response.data;
    } catch (error) {
      console.warn('API submitRegistration failed, falling back to mock behavior', error);
    }
  }
  
  const registrationId = `REG-2026-${String(Math.floor(Math.random() * 90000) + 10000)}`;
  const newRegistration = {
    ...formData,
    id: registrationId,
    registrationDate: new Date().toISOString(),
    status: 'enrolled'
  };
  
  saveLocalRegistration(newRegistration);
  return Promise.resolve({ success: true, registrationId, data: newRegistration });
};

export const fetchAllRegistrations = async (filters = {}) => {
  if (!isMockMode) {
    try {
      const response = await dataClient.get('/registrations', { params: filters });
      return response.data;
    } catch (error) {
      console.warn('API fetchAllRegistrations failed, falling back to mock data', error);
    }
  }
  
  const localRegs = getLocalRegistrations();
  let combined = [...localRegs, ...MOCK_REGISTRATIONS];
  
  if (filters.school) combined = combined.filter(r => r.school === filters.school);
  if (filters.programme) combined = combined.filter(r => r.programme === filters.programme);
  if (filters.semester) combined = combined.filter(r => String(r.semester) === String(filters.semester));
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    combined = combined.filter(r => 
      r.studentName?.toLowerCase().includes(searchLower) || 
      r.rollNumber?.toLowerCase().includes(searchLower) ||
      r.email?.toLowerCase().includes(searchLower)
    );
  }
  
  return Promise.resolve({ data: combined, total: combined.length });
};

export const fetchRegistrationsBySchool = async (schoolCode, filters = {}) => {
  return fetchAllRegistrations({ ...filters, school: schoolCode });
};

export const getRegistrationById = async (id) => {
  if (!isMockMode) {
    try {
      const response = await dataClient.get(`/registrations/${id}`);
      return response.data;
    } catch (error) {
      console.warn('API getRegistrationById failed, falling back to mock data', error);
    }
  }
  
  const localRegs = getLocalRegistrations();
  const combined = [...localRegs, ...MOCK_REGISTRATIONS];
  const registration = combined.find(r => r.id === id);
  
  if (registration) {
    return Promise.resolve(registration);
  }
  return Promise.reject(new Error('Registration not found'));
};
