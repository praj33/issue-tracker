import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const fetchIssues = () => API.get("/issues");
export const fetchIssueById = (id) => API.get(`/issues/${id}`);
export const createIssue = (data) => API.post("/issues", data);
export const deleteIssue = (id) => API.delete(`/issues/${id}`);

export default API;
