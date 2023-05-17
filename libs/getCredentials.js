import 'dotenv/config';

export const getCredentials = () => {
  const stringNIK = process.env.NIK;
  const stringPassword = process.env.PASSWORD;
  const niks = stringNIK.split(',');
  const passwords = stringPassword.split(',');

  return { niks, passwords };
};
