import axios from "axios";

const getDataByApi = (signal: any) =>
  axios("https://jsonplaceholder.typicode.com/users", { signal });

export default getDataByApi;
