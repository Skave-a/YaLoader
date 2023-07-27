import axios from 'axios';

const LINK = 'https://cloud-api.yandex.net/v1/disk/resources/upload';
const TOKEN = 'OAuth y0_AgAAAAAA8bP1AAo_MAAAAADoycHEdlTkXTrfQ3CEJT4Xv4aweQ_lYTg';

export const uploadFile = async (files: File[], path: string, overwrite: boolean = true) => {
  for (const file of files) {
    const fileName = file.name;
    const pathFile = path + '/' + fileName;

    try {
      const response = await axios.get(LINK, {
        params: {
          path: encodeURIComponent(pathFile),
          overwrite: overwrite.toString(),
        },
        headers: {
          Authorization: TOKEN,
        },
      });

      const { href } = response.data;

      await axios.put(href, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log('response', response);
      console.log('successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  }
};
