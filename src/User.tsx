import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserDTO } from "./dto/User.dto";
import { UserService } from './services/User.service';

interface stateType {
  username: string;
}

function User() {
  const [Users, setUsers] = useState<UserDTO[]>([]);
  const location = useLocation();
  const username = location.state?.username;

  useEffect(() => {
    // Fonction pour récupérer les utilisateurs
    async function fetchUsers() {
      const users = await UserService.getUser();
      setUsers(users);
    }

    // Appel de la fonction pour récupérer les utilisateurs
    fetchUsers();
  }, []);

  return (
    <div>
      <p className="text-center">{username}</p>
      {Users.map((user) => (
        <div key={user.username}>
          <p>{user.username}</p>
        </div>
      ))}
    </div>    
  );
}


export default User;