import axios from 'axios'
import { FriendshipDTO } from "../dto/Friendship.dto";

const REST_API_URL = 'http://localhost:8080/api';

export default class FriendService {

    static async getFriendship(id: string, token: string): Promise<FriendshipDTO[]> {
        try {
            const response = await axios.get(`${REST_API_URL}/friendship/list/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
    static async getAllFriendships(token: string): Promise<FriendshipDTO[]> {
        try {
            const response = await axios.get(`${REST_API_URL}/friendship/friendship`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    
    static async acceptFriendshipRequest(id: string, token: string) {
        await axios.post(
            `${REST_API_URL}/friendship/accept-request/${id}`,
            { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } }
        );
    }

    static async declineFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/decline-request`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    static async deleteFriendship(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/delete`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }

    static async sendFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/send-request`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json' } }
        );
    }
}
