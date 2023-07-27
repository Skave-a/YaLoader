import axios from 'axios';

export const uploadFile = async (files: File[], path: string, overwrite: boolean = true) => {

  const file_name = files[0].name;
  try {
    const response = await axios.get('https://cloud-api.yandex.net/v1/disk/resources/upload', {
      params: {
        path: encodeURIComponent(path),
        overwrite: overwrite.toString(),
      },
      headers: {
        Authorization: 'OAuth y0_AgAAAAAA8bP1AAo_MAAAAADoycHEdlTkXTrfQ3CEJT4Xv4aweQ_lYTg',
      },
    });


    const { href } = response.data;
    console.log('href', href);

    for (const file of files) {
      await axios.put(href, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
    }

    console.log('successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};
