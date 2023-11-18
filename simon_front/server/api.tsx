import axios from 'axios';

export const healthcheck = async () => {
    const response = await axios.get('https://bi-hackathon-back.vercel.app/healthcheck');

    console.log(response.data);
    return response.data.status;
};
