import axios from 'axios'
import { UserDTO } from "../dto/User.dto";
import { FriendshipDTO } from "../dto/Friendship.dto";

const REST_API_URL = 'http://85.31.239.81:8080/api';
const ORIGIN_HEADER = 'http://85.31.239.81:3000'; // Remplacez par l'URL de votre application React

export default class FriendService {

    static async getFriendship(id: string, token: string): Promise<FriendshipDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/list`, { id }, { headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN_HEADER } });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async getAllUsers(token: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/frienship`, null, { headers: { Authorization: `Bearer ${token}`, Origin: ORIGIN_HEADER } });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async acceptFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/accept-request`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json', Origin: ORIGIN_HEADER } }
        );
    }

    static async declineFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/decline-request`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json', Origin: ORIGIN_HEADER } }
        );
    }

    static async deleteFriendship(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/delete`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json', Origin: ORIGIN_HEADER } }
        );
    }

    static async sendFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/send-request`,
            JSON.stringify(friendshipDto),
            { headers: { 'Content-Type': 'application/json', Origin: ORIGIN_HEADER } }
        );
    }

}
