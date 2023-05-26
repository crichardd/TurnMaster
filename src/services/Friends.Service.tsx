import axios from 'axios'
import {UserDTO} from "../dto/User.dto";
import {FriendshipDTO} from "../dto/Friendship.dto";

const REST_API_URL = 'http://localhost:8080/api';

export default class FriendService {

    static async getAllFriends(username: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/list`, { username });
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('');
        }
    }

    static async getAllUsersNotFriends(username: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(`${REST_API_URL}/friendship/listAllNotFriends`, { username });
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('');
        }
    }

    static async getAllFriendRequests(username: string): Promise<UserDTO[]> {
        try {
            const response = await axios.post(
                `${REST_API_URL}/friendship/listFriendshipRequestReceived`,
                { username });
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('');
        }
    }

    static async acceptFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/acceptFriendshipRequest`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async declineFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/declineFriendshipRequest`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async deleteFriendship(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/deleteFriendship`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

    static async sendFriendshipRequest(friendshipDto: FriendshipDTO) {
        await axios.post(
            `${REST_API_URL}/friendship/sendFriendshipRequest`,
            JSON.stringify(friendshipDto),
            { headers: {'Content-Type': 'application/json'}}
        );
    }

}
