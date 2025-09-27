export const users = {
  STANDARD: { username: 'standard_user', password: 'secret_sauce' },
  LOCKED:   { username: 'locked_out_user', password: 'secret_sauce' },
};
export type UserKey = keyof typeof users;
