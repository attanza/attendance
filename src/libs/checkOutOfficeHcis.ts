import axios from 'axios';
import FormData from 'form-data';
import moment from 'moment';
import { randTime } from './randTime';
import { getHcisToken } from './getHcisToken';
export const checkOutOfficeHcis = async (NIK: string, PASSWORD: string) => {
  try {
    const token = await getHcisToken(NIK, PASSWORD);
    if (token) {
      const data = new FormData();

      const today = moment().format('YYYY-MM-DD');
      const hour = randTime(18, 20);
      const minute = randTime(10, 55);
      const seconds = randTime(10, 55);
      const time = `${hour}:${minute}:${seconds}`;

      data.append('begin_date', today);
      data.append('date', today);
      data.append('time', time);
      data.append('end_date', '9999-12-31');
      data.append('business_code', '5000');
      data.append('personal_number', NIK);
      data.append('presence_type', 'CO');
      data.append('emoticon', ')');
      data.append('location', '-6.1927882, 106.845959');
      data.append('change_user', NIK);
      data.append('presensi_status', '00');
      data.append('description', 'wfo');
      data.append('evidence', 'null');
      data.append('presensi_approve', '1');
      data.append('health_status', '3');
      data.append('working_status_location', '3');
      data.append('health_description', 'HEALTHY');
      data.append('working_location_description', 'OFFICE');
      data.append('transport_status', '2');
      data.append('transport_description', 'PRIVATE');
      data.append('building_id', 'KN000KR');

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://newlarisa.pegadaian.co.id/api/users/${NIK}/presensinew/${NIK}/buscd/5000`,
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
          ...data.getHeaders(),
        },
        data: data,
      };

      const resp = await axios(config).then((res) => res.data);
      console.log(resp);

      return resp;
    } else {
      console.log(`${NIK} failed to authenticate`);
    }
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
