import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";  
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { retrieveUsers } from "../../redux/user/userSlice";
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

const TextSection = styled.div`
  padding: 5px
`
const ErrorWrapper = styled.div`
    background: rgba(255, 0, 0, .1);
    line-height: 2;
    padding: 5px;
    margin-top: 5px;
`
const ErrorText = styled.span`
    color: red;
    font-weight: 600;
`
const Login = () => {
    const [open, setOpen] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [branchId, setBranchId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const handleClose = () => {
    
    }

    useEffect(()=> {
        dispatch(retrieveUsers())
    },[])

    const onLogin = () => {
        if (branchId && userName && password){
            setErrorMsg('')
            // authenticateUser(branchId,userName,password)
        } else {
            setErrorMsg(getErrorMessage())
        }
        // branchId && userName && password ? setErrorMsg('') : setErrorMsg(getErrorMessage())

    }
    const getErrorField = () => {
        const requiredFields: string[] = [];
        if (branchId == '') { 
            requiredFields.push("Branch id");
        }
        if (userName == '') { 
            requiredFields.push("username");
        }
        if (password == '') { 
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
                <TextSection>Login</TextSection> 
                <TextSection>
                    <TextField id="outlined-basic" label="Branch id" variant="outlined" fullWidth value={branchId} onChange={(event)=>setBranchId(event.target.value)}/>
                </TextSection>
                <TextSection>
                    <TextField id="outlined-basic" label="User name" variant="outlined" fullWidth value={userName} onChange={(event)=>setUserName(event.target.value)}/>
                </TextSection>
                <TextSection>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </TextSection> 
                <Button variant="contained" fullWidth onClick={()=>onLogin()}>Login</Button>
                {
                    errorMsg ? 
                    <ErrorWrapper>
                        <ErrorText>
                            {errorMsg}
                        </ErrorText>
                    </ErrorWrapper> : null

                }
                
            
            
            </Box>
        </Modal>

        </div>
    )
}

export default Login;