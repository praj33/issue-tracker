import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const fetchIssues = (params) => API.get("/issues", { params });
export const fetchIssueById = (id) => API.get(`/issues/${id}`);
export const createIssue = (data) => API.post("/issues", data);
export const updateIssueStatus = (id, status) => API.put(`/issues/${id}`, { status });
export const addComment = (id, text) => API.post(`/issues/${id}/comments`, { text });

export default API;
