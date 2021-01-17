import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl);
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject);
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

const update = (personObject) => {
    const req = axios.put(`${baseUrl}/${personObject.id}`,personObject);
    return req.then(res => res.data)
}

const exportedObject = {
    getAll,
    create,
    remove,
    update
}

export default exportedObject;
