  
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllUsers, selectLoggedInUser, setLoggedOutUser } from '../../reducer/user/userSlice';
import BasicTable from '../component/BasicTable/BasicTable';
import { Login } from '../login/Login';
// import Login from '../login/Login';
import UserItem from './user-item/UserItem';
import { HeaderWrapper,Username,Logout, ContentWrapper, UserWrapper, TableWrapper } from './UserListStyles';

const UserList = () => {
    const user = useAppSelector(selectLoggedInUser)
    const users = useAppSelector(selectAllUsers)
    const [userName, setUserName] = useState('');
    const dispatch = useAppDispatch();
    useEffect(()=> { 
        const loggedUser = users.user?.data?.filter((item: any) => {
            if ((user === item.branchId.toString())){
                return item;
            }
            return;
        });  
        setUserName(loggedUser[0]?.userName);
    }, [user])

    const onLogout = () => {
        dispatch(setLoggedOutUser())
    } 
    return(
        <div>
            <div>
                {users.user.loggedInUser !== '' ? 
                <div> 
                    <HeaderWrapper>
                        <Username>{userName}</Username>
                        <Logout><Button variant="contained" onClick={()=>onLogout()}>Logout</Button></Logout>
                    </HeaderWrapper>
                    <ContentWrapper>
                        <UserWrapper>
                            <UserItem/>
                        </UserWrapper>
                        <TableWrapper>
                            <BasicTable data={users.user?.data}/>
                        </TableWrapper>
                    </ContentWrapper>
                    </div> : null
                }  
                <Login data-testid='login'/>
            </div>
         </div>
    );
   
}

export default UserList;
