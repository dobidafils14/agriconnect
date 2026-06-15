import api from "./api";

export const getProducts    = (categorie) => api.get(`/products${categorie ? `?categorie=${categorie}` : ""}`);
export const getProductById = (id)        => api.get(`/products/${id}`);
export const getMyProducts  = ()          => api.get("/products/mes-produits");
export const getMyStats     = ()          => api.get("/products/mes-stats");
export const getGlobalStats = ()          => api.get("/products/stats-globales");
export const createProduct  = (data)      => api.post("/products", data, { headers: { "Content-Type": "multipart/form-data" } });
export const updateProduct  = (id, data)  => api.put(`/products/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProduct  = (id)        => api.delete(`/products/${id}`);