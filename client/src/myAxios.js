import Axios from 'axios';

const myAxios = Axios.create({
  baseURL: 'https://checkout-system-mern.herokuapp.com',
});

export default myAxios;
