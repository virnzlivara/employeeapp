import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {TextSection} from './UserItemStyles' 
import * as yup from 'yup'; 
import { useFormik } from "formik";
import { useState } from "react";
import { addUser } from "../../../reducer/user/userSlice";
import { useAppDispatch } from "../../../app/hooks";

 
 
const UserItem = () => { 
  const [branchid, setBranchId] = useState('');
  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [position, setPosition] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
    const onResetForm = () => {
      setBranchId('');
      setUname('');
      setFname('');
      setMname('');
      setLname('');
      setPosition('');
      setPassword('');
    }

    const onAdd = () => {
      const user = {
        branchId: parseInt(branchid),
        userName: uname,
        firstName: fname,
        middleName: mname,
        lastName: lname,
        position: position,
        password: password
      }
      debugger;
      dispatch(addUser(user))
      onResetForm()
    }
    
    return(
      <div>  
        <TextSection>
          <TextField 
            id="branchid"
            name="branchid"
            label="Branch Id"
            onChange={(event)=>setBranchId(event.target.value)}
            value= {branchid}
            fullWidth 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="username"
            name="username"
            label="User name"
            onChange={(event)=>setUname(event.target.value)}
            value= {uname}
            fullWidth 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="firstname"
            name="firstname"
            label="First name"
            onChange={(event)=>setFname(event.target.value)}
            value= {fname} 
            fullWidth 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="mname"
            name="mname"
            label="Middle name" 
            onChange={(event)=>setMname(event.target.value)}
            value= {mname}
            fullWidth 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="lname"
            name="lname"
            label="Last name" 
            onChange={(event)=>setLname(event.target.value)}
            fullWidth
            value={lname} 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="position"
            name="position"
            label="Position" 
            onChange={(event)=>setPosition(event.target.value)}
            fullWidth
            value={position} 
          />
          </TextSection>
          <TextSection>
          <TextField 
            id="password"
            name="password"
            label="Password" 
            type="password"
            onChange={(event)=>setPassword(event.target.value)}
            value={password}
            fullWidth 
          />
          </TextSection>
          <div style={{float: 'right'}}>
          <Button variant="outlined"  type="reset" onClick={onResetForm}>Reset</Button>
          <Button color="primary" variant="contained"  type="submit" onClick={onAdd}>Add</Button>
          </div>
        {/* </form> */}
      </div>
    );
    
   
}

export default UserItem;
