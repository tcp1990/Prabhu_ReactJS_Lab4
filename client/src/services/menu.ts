import axios from 'axios';
import IDataList from '../models/IDataList';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getDataFromServer = () => {
    return axios.get<IDataList[]>(`${baseUrl}/items`)
        .then(response => response.data)
};

const postDataToServer = (newpurchase: Omit<IDataList, 'id'>) => {
    return axios.post<IDataList>(
        `${baseUrl}/items`,
        newpurchase,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.data)
};

export {
    getDataFromServer,
    postDataToServer
};