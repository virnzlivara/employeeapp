 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";  
import { Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react"; 
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { retrieveUsers, selectAllUsers, setLoggedInUser } from "../../reducer/user/userSlice";
import { ErrorText, ErrorWrapper, TextSection } from "./LoginStyles";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Login = () => {
    const [open, setOpen] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [branchId, setBranchId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch(); 

    const users = useAppSelector(selectAllUsers); 
    const handleClose = () => {
    }

    useEffect(()=> {
        dispatch(retrieveUsers())
    },[])

    useEffect(()=> { 
        users.user?.loggedInUser !==  '' ? setOpen(false) : setOpen(true)
    },[users.user?.loggedInUser])

    const onLogin = () => {
        if (branchId && userName && password){
            setErrorMsg('')
            const isLoginRegistered = authenticateUser(branchId, userName, password);
            setOpen(!isLoginRegistered);
            if (isLoginRegistered) {
                dispatch(setLoggedInUser(branchId))
            } else {
                setErrorMsg('User does not exist!')
            }
           
        } else {
            setErrorMsg(getErrorMessage())
        } 
    }

    const authenticateUser = (branchId: string, userName: string, password: string): boolean => {

        const loggedUser = users.user?.data?.filter((item: any) => {
            if ((parseInt(branchId) === item.branchId) && (userName === item.userName) && (password === item.password)){
                return item;
            }
        });
        console.log(loggedUser); 
        return loggedUser.length > 0;
    }
    const getErrorField = () => {
        const requiredFields: string[] = [];
        if (branchId === '') { 
            requiredFields.push("Branch id");
        }
        if (userName === '') { 
            requiredFields.push("username");
        }
        if (password === '') { 
            requiredFields.push("password");
        }
        let requiredFieldsStr = '';
        requiredFields.map((item: string)=>{
            if (requiredFieldsStr === ''){
                requiredFieldsStr = item;
            } else {
                requiredFieldsStr = requiredFieldsStr + ", " + item;
            }
            
        })
        return requiredFieldsStr;
    }

    const getErrorMessage = () => { 
        const errorStr = `Please fill up the following details: ${getErrorField()}`;
        return errorStr;
    } 
    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx= {style} > 
                <Formik
                    initialValues={{ branchId: '', userName: '', password: ''}}
                    onSubmit={(values, actions) => { 
                        onLogin();
                    }}
                    >
                    {(props: FormikProps<any>) => (
                        <Form>
                         <TextSection>Login</TextSection> 
                        <TextSection>
                            <TextField data-test-id='branch-id' id="outlined-basic" label="Branch id" variant="outlined" fullWidth value={branchId} onChange={(event)=>setBranchId(event.target.value)}/>
                        </TextSection>
                        <TextSection>
                            <TextField id="outlined-basic" label="User name" variant="outlined" fullWidth value={userName} onChange={(event)=>setUserName(event.target.value)}/>
                        </TextSection>
                        <TextSection>
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth value={password} onChange={(event)=>setPassword(event.target.value)}/>
                        </TextSection> 
                        <Button variant="contained" fullWidth type="submit">Login</Button>
                        {
                            errorMsg ? 
                            <ErrorWrapper>
                                <ErrorText>
                                    {errorMsg}
                                </ErrorText>
                            </ErrorWrapper> : null

                        }  
                        </Form>
                    )}
                    </Formik>
                
            
            
            </Box>
        </Modal>

        </div>
    )
}

export  {Login};
