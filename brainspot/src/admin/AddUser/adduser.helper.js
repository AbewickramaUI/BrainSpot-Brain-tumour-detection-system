import axios from "axios"
import { serverUrl } from "../../Config"

export function adduser(data) {
  const url = `${serverUrl}/user`

  return axios.post(url, data, {
    headers: {
      "authorization": localStorage.getItem("token")
    },
  });
}