import { IUser } from './model/IUser';
import { users } from "../../assets/users_data";

// A mock function to mimic making an async request for data
// export function fetchUser(payload: any) {
//     debugger;
//     return new Promise<{ data: IUser[] }>((resolve) => {
//         debugger;
//         setTimeout(() => resolve({data: users}), 500)
//     }
     
//     );
// }

export function fetchUsers() {
    debugger;
    return new Promise<{ data: IUser[] }>((resolve) => 
      setTimeout(() => resolve({data: users}), 500)
    );
}
  