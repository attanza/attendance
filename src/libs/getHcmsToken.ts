import axios from 'axios';
import FormData from 'form-data';

export const getHcmsToken = async (code: string, password: string) => {
  const data = new FormData();
  data.append('data', `{"code":"${code}","password":"${password}"}`);
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hcms.pegadaian.co.id/index/user/login',
    headers: {
      Cookie:
        '9bc0e424ec7f64f842744df7ef9b0398=5f88176c021950d00c1615f405264b7c; TS0107e10f=01d4a3ef488c1ffb18fecce0f2efdb9c5eb7dbe05e3d732ccf542d95ee613baef33150a9c75b6f9d91925116b1b892c03b54d397047776cd62860fde152f81b91bf4ff7bfd65ed7510801695ef14fbd773ccaeff852cf8a8a8d29bf6a982a73902dfb41956; hcms=str14h0fua03hpe2hm2k17qohr',
      ...data.getHeaders(),
    },
    data,
  };

  try {
    const resp = await axios(config).then((res) => res.data);
    return resp.guid ?? resp.data.token;
  } catch (error: any) {
    console.log('get token error: ', error.response.data);
  }
};
