export const DEFAULT_STATES = {
  LOGIN_FORM: {
    email: '',
    password: '',
  },
  LOGIN_ERRORS: {
    email: '',
    password: '',
  },
  REGISTER_FORM: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  },
  REGISTER_ERRORS: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  },
}

export const VALIDATIONS = {
  REGISTER_FORM: {
    FIRST_NAME_MAX_LENGTH: 50,
    FIRST_NAME_MIN_LENGTH: 2,
    LAST_NAME_MAX_LENGTH: 50,
    LAST_NAME_MIN_LENGTH: 2,
  },
}

export const VALIDATION_MESSAGES = {
  EMAIL: 'Please enter your email',
  EMAIL_REGEX: 'Please enter a valid email',
  PASSWORD: 'Please enter your password',
  PASSWORD_CONFIRM: 'Please enter your password confirm',
  PASSWORD_NOT_MATCH: "The passwords you entered don't match.",
  FIRST_NAME: 'Please enter your first name',
  FIRST_NAME_LENGTH: `First name must be between ${VALIDATIONS.REGISTER_FORM.FIRST_NAME_MIN_LENGTH} and ${VALIDATIONS.REGISTER_FORM.FIRST_NAME_MAX_LENGTH} characters long.`,
  LAST_NAME: 'Please enter your last name',
  LAST_NAME_LENGTH: `First name must be between ${VALIDATIONS.REGISTER_FORM.LAST_NAME_MIN_LENGTH} and ${VALIDATIONS.REGISTER_FORM.LAST_NAME_MAX_LENGTH} characters long.`,
}

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong, please try again later.',
  LOGIN: 'Invalid email or password. Please check your information and try again.',
  REGISTRATION: 'Something went wrong during registration. Please try again later.',
}

export const ALL_ROLES = ['MinimalAccess', 'Admin', 'Waiter', 'Cook']
