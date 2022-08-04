import { IUser } from './model/IUser';
import { users } from "../../assets/users_data";
 
export function fetchUsers() { 
    return new Promise<{ data: IUser[] }>((resolve) => 
      setTimeout(() => resolve({data: users}), 500)
    );
}
  