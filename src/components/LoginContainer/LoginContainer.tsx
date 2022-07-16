import React ,{useState}from "react";
import "./LoginContainer.css";
import {cred} from "../../Cred"
import { useToast } from '@chakra-ui/react'
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
interface UserInfo{
    email:string;
    password:string;
}
type inputField="email"|"password";
const initState={
    email:"",password:""
}
const LoginContainer: React.FC = () => {
    const[userInfo,setUserInfo]=useState<UserInfo>(initState);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    let navigate :NavigateFunction= useNavigate();
let toast=useToast();
    const changeHandler=(e:React.ChangeEvent<HTMLInputElement>,field:inputField)=>{
       const state={...userInfo};
       state[field]=e.target.value
       setUserInfo(state)
    }

    const isEmpty=()=>{
      return userInfo.email===''||userInfo.password===''
    }
   const handleSignin=async()=>{
    if(isEmpty()) {
      toast({
        title: 'Messing Fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      return};
    setIsLoading(true);
try {
    const res=(await fetch(`${cred.apiUrl}/user/login`,{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(userInfo)
    }))
    console.log(res);
    const data=await res.json();
    console.log(data);
    if( res.status>400){
      console.log(data);
      
      toast({
        title: `${data.messgae}`,
        status:  "error",
        duration: 3000,
        isClosable: true,
      })
    }else{
     
      toast({
        title: 'Login succesfull.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      localStorage.setItem('UserData',data.data._id);
   localStorage.setItem('Token',data.token);
    }
   
   
    navigate("/home", { replace: true });
    setIsLoading(false);


} catch (error:any) {
 
 
    console.log(error);
    setIsLoading(false);

}
   }
    
  return (
    <div className="LoginContainer">
      {isLoading ?  <Spinner size='xl'  color='red.500' thickness='3px'/>:
      <div className="LoginWrapper">
        <h1 className="LoginTitle">Login</h1>
        <form onSubmit={(e)=>{
            e.preventDefault();
            handleSignin()}} className="LoginForm">
          <input type="email" placeholder="Email" className="InputContainer" onChange={(e)=>changeHandler(e,'email')}/>
          <input
            type="password"
            placeholder="Password"
            className="InputContainer"
            onChange={(e)=>changeHandler(e,'password')}
          />
          <button type="submit" className="SubmitButton">
            Submit
          </button>
        </form>
      </div>}
    </div>
  );
};

export default LoginContainer;
