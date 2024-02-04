


//COMPONENTS
import Header from "@/components/Header/Header";
import RegisterComponent from "@/components/Main/Login/RegisterComponent";

//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { login } from '@/store/authSlice';





const Register = () => {


    const nightMode = useSelector((state) => state.toggle);

  return (
      <RegisterComponent/>
  )
};

export default Register;