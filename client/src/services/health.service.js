import api from "../api/axios";


export const checkServer = () => {

return api.get("/");

};