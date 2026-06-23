import api from "@/lib/axios"
import { UserProfile } from "@/types/auth.type";

export const userService = {
    getUserProfile: async (): Promise<UserProfile> => {
        const { data } = await api.get("/user/me");
        return data;
    } 
}