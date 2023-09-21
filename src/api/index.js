import axios from "axios";

// Login
export const loginAPI = async (data) => {
  const res = await axios.post("http://localhost:4000/api/login", data);
  return res.data;
};
// Get Users
export const getUsers = async (data) => { 
    const res = await axios.get("http://localhost:4000/api/users", {
        headers: {
            Authorization: `Bearer ${data}`,
        }
    });
    return res.data;
}

// Create User
export const createUser = async (data,token) => { 
    const res = await axios.post("http://localhost:4000/api/register", 
    data
    ,{ 
        headers : { 
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
    return res;

}

//Get all roles
export const getRoles = async (data) => {
  const res = await axios.get("http://localhost:4000/api/roles", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
  return res.data;
};