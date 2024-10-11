import axios from "axios";
const base_url = "http://localhost:3001/callback";

const auth = async () => {
  const request = await axios.get(base_url);
  return request.data;
};

export default { auth: auth };
