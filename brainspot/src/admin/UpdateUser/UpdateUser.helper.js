import axios from "axios"
import { serverUrl } from "../../Config"

export function updateUser(data) {
  const url = `${serverUrl}/user`

  return axios.put(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}
