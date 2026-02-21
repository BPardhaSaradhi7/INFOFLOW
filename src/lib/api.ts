import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
});

export interface UploadResponse {
  message: string;
  total_chunks: number;
}

export interface AskResponse {
  answer: string;
  sources: number[];
}

export async function uploadPDF(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post<UploadResponse>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function askQuestion(question: string): Promise<AskResponse> {
  const res = await api.post<AskResponse>("/ask", { question });
  return res.data;
}