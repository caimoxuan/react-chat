import axios from 'axios';
import config from '../config/PropertiesConfig';

axios.defaults.baseURL = config.chatServerEndPoint;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 100000;
