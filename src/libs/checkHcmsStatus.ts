import axios from 'axios';
import { getHcmsToken } from './getHcmsToken';
import FormData from 'form-data';
export const checkHcmsStatus = async (NIK: string, PASSWORD: string) => {
  const token = await getHcmsToken(NIK, PASSWORD);

  try {
    if (token) {
      let data = new FormData();

      data.append('guid', token);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://hcms.pegadaian.co.id/api_attendance/attendance/Time',
        headers: {
          Cookie: `9bc0e424ec7f64f842744df7ef9b0398=9dcdf8d2ec562e09f5de11a59f330227; TS0107e10f=01d4a3ef48cb700ca9b2f9ace65c3a5738b1446212bdd230a5a84d65d1b83d674a9fc658ef3850e495917a202c886db2d442ad1253e87c1d0aced3372314ecd18ee2ec5948732e6415ac374de8789164dd1ad9e29b42d94d523ea8dbddd34c0ba99c41a606; hcms=${token}`,
          ...data.getHeaders(),
        },
        data: data,
      };

      const resp = await axios(config).then((res: any) => res.data);
      console.log(resp);

      return resp;
    } else {
      console.log(`${NIK} failed to authenticate`);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
