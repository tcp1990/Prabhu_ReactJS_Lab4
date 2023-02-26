import axios from 'axios';
import IDataList from '../models/IDataList';

const getDataFromServer = () => {
    return axios.get<IDataList[]>( `${process.env.REACT_APP_API_BASE_URL}/items` )
            .then( response => response.data )
};

export {
    getDataFromServer
};