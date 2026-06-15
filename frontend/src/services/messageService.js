import api from "./api";

export const sendMessage = (data) => api.post("/messages", data);
export const getMessages = ()     => api.get("/messages");