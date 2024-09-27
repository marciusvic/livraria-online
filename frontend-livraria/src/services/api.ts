import axiosInstance from "./config";

interface LoginUser {
    email: string;
    password: string;
}

interface RegisterUser {
    name: string;
    email: string;
    password: string;
    role?: string;
}

export interface TicketData {
  id?: number;
  type: string;
  reason: string;
  description: string;
  customer: string;
  vehicle: string;
  status: string;
  term?: string;
  userId: number;
  createdAt?: string;
}

export const login = async (data: LoginUser) => {
    const { email, password } = data;
    try {
        const response = await axiosInstance.post("/api/login/", {
            email,
            password,
        });
        console.log("API Response:", response); // Adicione este log
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error; // Adicione esta linha para propagar o erro corretamente
    }
};


export const register = async (data: RegisterUser) => {
    const { name, email, password, role } = data;
    try {
        const response = await axiosInstance.post("/api/auth/register", {
            name,
            email,
            password,
            role,
        });
        return response.data;
    } catch (error) {
        console.error(error);
  }
}

export const fetchBooks = async () => {
    try {
        const response = await axiosInstance.get("/api/livraria/books/");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}