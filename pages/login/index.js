

//COMPONENTS
import Header from "@/components/Header/Header";
import LoginComponent from "@/components/Main/Login/LoginComponent";


//STYLES
import styles from '../../components/Main/Login/Login.module.css'

//REDUX
import {useSelector, useDispatch } from 'react-redux'
import { login } from "@/store/authSlice";


const Login = () =>{


    const dispatch = useDispatch();
    const nightMode = useSelector((state) => state.toggle.isNightMode)


    console.log(nightMode)


    return(
        <div>
            <LoginComponent/>

        </div>
    )
}


export default Login