import {Button, Container} from "@mui/material";
import {useState} from "react";


const LoginForm = () => {
    const submitClick = (event) => {
        event.preventDefault();
        setLoggedIn(true);
    }
    const [showLoggedIn, setLoggedIn] = useState(false);
    let loginForm;

    if (showLoggedIn === false){
        loginForm =
            (
                <form onSubmit={submitClick}>
                         <label htmlFor={"email"}>Email:</label><br/>
                         <input type={"text"} id={"email"} name={"emailTextBox"} placeholder={"enter username"}/> <br/>
                         <label htmlFor={"password"}>Password:</label> <br/>
                         <input type={"password"} id={"password"} name={"passwordTextBox"} placeholder={"enter password"}/><br/>
                         <input type={"submit"} value={"Submit"}/>
                     </form>
            );
    } else {
        loginForm =
            (
                <p>Logged in.</p>
            );
    }
    return (
        <Container>
            {loginForm}
        </Container>
    );

}

export default LoginForm;