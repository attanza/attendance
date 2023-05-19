import axios from 'axios';

export const getToken = async (username: string, password: string) => {
  const data = JSON.stringify({
    application_id: '6',
    username,
    password,
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
  } catch (error: any) {
    console.log('get token error: ', error.response.data);
  }
};
