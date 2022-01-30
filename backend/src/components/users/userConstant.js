export const ASC_DESC = {
    ASC: 'ASC',
    DESC: 'DESC',
};

export const DATABASE_MAX_LENGTH = 255;
export const DATABASE_MIN_LENGTH = 1;
export const FULLNAME = {
    MAX: 100,
    MIN: 1,
};

export const PHONE = {
    REG_EXP: '^[0-9]{9,11}$',
};

export const EMAIL = {
    MAX: 30,
    MIN: 10,
    EMAIL_STRUCTURE: {
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    },
};

export const PASSWORD = {
    REG_EXP: '^[a-zA-Z0-9\\W]{3,30}$',
};

export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
};

export const ORDER_BY = {
    FULL_NAME: 'fullName',
};

export const ORDER_DEFAULT = 'asc';
