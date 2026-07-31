/**
 * Registration Control Service
 * Manages on/off state for semester registration per school and globally.
 * Uses localStorage for mock/demo mode. Replace with API calls for production.
 */

const STORAGE_KEY = 'gbu_reg_control';

const REASON_OPTIONS = [
  { value: 'closed', label: 'Registration Closed' },
  { value: 'not_started', label: 'Not Started Yet' },
  { value: 'maintenance', label: 'Under Maintenance' },
  { value: 'other', label: 'Other' },
];

const getDefaultState = () => ({
  global: { active: true, reason: '', customMessage: '', updatedAt: null, updatedBy: '' },
  schools: {},
});

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure structure
      return { ...getDefaultState(), ...parsed };
    }
  } catch (e) {
    console.warn('Failed to load registration control state', e);
  }
  return getDefaultState();
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save registration control state', e);
  }
};

/**
 * Get registration status for a specific school.
 * Checks global status first, then school-specific.
 * @param {string} schoolCode - e.g. 'SOICT', 'SOM'
 * @returns {{ active: boolean, reason: string, message: string, source: 'global'|'school' }}
 */
export const getRegistrationStatus = (schoolCode) => {
  const state = loadState();

  // Global override: if global is off, all schools are off
  if (!state.global.active) {
    const reasonLabel = REASON_OPTIONS.find(r => r.value === state.global.reason)?.label || 'Registration Closed';
    return {
      active: false,
      reason: state.global.reason || 'closed',
      message: state.global.reason === 'other' && state.global.customMessage
        ? state.global.customMessage
        : reasonLabel,
      source: 'global',
    };
  }

  // School-specific override
  if (schoolCode && state.schools[schoolCode] && !state.schools[schoolCode].active) {
    const schoolState = state.schools[schoolCode];
    const reasonLabel = REASON_OPTIONS.find(r => r.value === schoolState.reason)?.label || 'Registration Closed';
    return {
      active: false,
      reason: schoolState.reason || 'closed',
      message: schoolState.reason === 'other' && schoolState.customMessage
        ? schoolState.customMessage
        : reasonLabel,
      source: 'school',
    };
  }

  return { active: true, reason: '', message: '', source: '' };
};

/**
 * Set global registration status (Super Admin only)
 */
export const setGlobalRegistration = (active, reason = '', customMessage = '') => {
  const state = loadState();
  state.global = {
    active: Boolean(active),
    reason: active ? '' : reason,
    customMessage: active ? '' : String(customMessage).slice(0, 100),
    updatedAt: new Date().toISOString(),
    updatedBy: 'admin',
  };
  saveState(state);
  return state.global;
};

/**
 * Set school-specific registration status (School Admin or Super Admin)
 */
export const setSchoolRegistration = (schoolCode, active, reason = '', customMessage = '') => {
  const state = loadState();
  state.schools[schoolCode] = {
    active: Boolean(active),
    reason: active ? '' : reason,
    customMessage: active ? '' : String(customMessage).slice(0, 100),
    updatedAt: new Date().toISOString(),
    updatedBy: schoolCode.toLowerCase(),
  };
  saveState(state);
  return state.schools[schoolCode];
};

/**
 * Get full control state (for admin panels)
 */
export const getFullRegistrationControl = () => {
  return loadState();
};

/**
 * Get school-specific state only
 */
export const getSchoolRegistrationState = (schoolCode) => {
  const state = loadState();
  return state.schools[schoolCode] || { active: true, reason: '', customMessage: '' };
};

export { REASON_OPTIONS };
