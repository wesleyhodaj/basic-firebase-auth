import axios from 'axios';
import Player from '../models/player';

export const getAllData = async () => {
  const options = {
    method: 'GET',
    url: 'https://restcountries.com/v3.1/name/albania',
  };
  const myArray = [];
  try {
    const response = await axios.request(options);
    console.log(response.data);
    for (const ply in response.data.data) {
      const obj = response.data.data;
      myArray.push(new Player.fromJSON(obj[ply]));
    }

    return myArray;
  } catch (error) {
    console.error(error);
  }
};
