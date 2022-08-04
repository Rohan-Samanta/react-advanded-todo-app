import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function userList() {
  return await axios.get(`${BASE_URL}`);
}
