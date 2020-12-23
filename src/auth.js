import { sleep } from './util';

// These functions are where you would make API
// calls to your auth system of choice for login, signup,
// and password reset requests

export const login = async (email, password) => {
  // Just to simulate network request
  await sleep(2000);

  // Return a fake user
  return {
    name: 'Ionitron',
    email: 'ionitron@ionic.io',
    id: '0'
  }
}

export const signup = async (email, password) => {
  // Just to simulate network request
  await sleep(2000);

  // Return a fake user
  return {
    name: 'Ionitron',
    email: 'ionitron@ionic.io',
    id: '0'
  }
}

export const resetPassword = async (email, password) => {
  await sleep(2000);
}