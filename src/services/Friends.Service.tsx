import axios from 'axios'
import {UserDTO} from "../dto/User.dto";
import {FriendshipDTO} from "../dto/Friendship.dto";
import { useQuery, QueryClient } from 'react-query';

const REST_API_URL = 'http://localhost:8080/api';

export default class FriendService {

    static async getFriendship(username: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/list`, { username });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error);
            return []; // Valeur par défaut en cas d'erreur
        }
    }

    static async getAllUsersNotFriends(username: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/list-users-addable`, { username });
            return response.data;
        } catch (error) {
            console.log(error);
            return []; // Valeur par défaut en cas d'erreur
        }
    }

    static async acceptFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/accept-request`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async declineFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/decline-request`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async deleteFriendship(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/delete`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async sendFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/send-request`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

}
