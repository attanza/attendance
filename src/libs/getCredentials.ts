import 'dotenv/config';

export const getCredentials = () => {
  const stringNIK = process.env.NIK as string;
  const stringPassword = process.env.PASSWORD as string;
  const niks = stringNIK.split(',');
  const passwords = stringPassword.split(',');

  return { niks, passwords };
};
