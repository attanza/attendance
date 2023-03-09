import axios from 'axios';

export const getToken = async () => {
  const data = JSON.stringify({
    application_id: '6',
    username: process.env.NIK,
    password: process.env.PASSWORD,
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hcis-auth.pegadaian.co.id/api/auth/login',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const resp = await axios(config).then((res) => res.data);
    return resp.access_token;
  } catch (error) {
    console.log(error);
  }
};
