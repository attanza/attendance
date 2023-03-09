import axios from 'axios';
import moment from 'moment';
import FormData from 'form-data';

import { randTime } from './randTime.js';
import { getToken } from './getToken.js';
export const checkInOffice = async () => {
  try {
    const token = await getToken();
    // const today = moment().format('YYYY-MM-DD');
    const today = '2023-02-12';
    const hour = '07';
    const minute = randTime(10, 28);
    const seconds = randTime(10, 55);
    const time = `${hour}:${minute}:${seconds}`;
    const NIK = process.env.NIK;
    const data = new FormData();
    data.append('begin_date', today);
    data.append('date', today);
    data.append('time', time);
    data.append('end_date', '9999-12-31');
    data.append('business_code', '5000');
    data.append('personal_number', NIK);
    data.append('presence_type', 'CI');
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
    return resp;
  } catch (error) {
    console.log(error.data);
    throw error;
  }
};
