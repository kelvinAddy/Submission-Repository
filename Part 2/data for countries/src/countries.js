import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const data = axios.get(url).then((res) => res.data);

export { data };
