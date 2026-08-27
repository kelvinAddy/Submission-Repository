import axios from "axios";

const baseUrl = "/api/persons";

const getContacts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addContact = async (contactObject) => {
  const response = await axios.post(baseUrl, contactObject);
  return response.data;
};

const deleteContact = async (id) => {
  const newUrl = `${baseUrl}/${id}`;
  const response = await axios.delete(newUrl);
  return response.data;
};

const updateContact = async (id, contactObject) => {
  const newUrl = `${baseUrl}/${id}`;
  const response = await axios.put(newUrl, contactObject);
  return response.data;
};

export default { getContacts, addContact, deleteContact, updateContact };
