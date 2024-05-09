// import { useContext, useState } from "react";
// import Input from "../../../shared/components/form-elements/Input";
// import {
//   VALIDATOR_REQUIRE,
//   VALIDATOR_EMAIL,
// } from "../../../shared/utils/validators";
// import Button from "../../../shared/components/form-elements/Button";
// import { useForm } from "../../../shared/hooks/form-hook";
// import { AuthContext } from "../../../shared/context/auth-context";
// import { useNavigate } from "react-router-dom";
// import LoadingSpinner from "../../../shared/components/LoadingSpinner";

// const CreateUser = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const auth = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [formState, inputHandler, setFormData] = useForm(
//     {
//       name: {
//         value: "",
//         isValid: false,
//       },
//       email: {
//         value: "",
//         isValid: false,
//       },
//       password: {
//         value: "",
//         isValid: false,
//       },
//       role: {
//         value: "",
//         isValid: true,
//       },
//     },
//     false
//   );
//   const RegisterSubmitHandler = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     try {
//       const response = await fetch("http://localhost:3000/api/users/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ""
//         },
//         body: JSON.stringify({
//           name: formState.inputs.name.value,
//           email: formState.inputs.email.value,
//           password: formState.inputs.password.value,
//           role: formState.inputs.role.value,
//         }),
//       });
//       console.log(response);
//       if (response.status === 200) {
//         const responseData = await response.json();
//         console.log(responseData);
//         auth.login();
//         setIsLoading(false);
//         navigate("/");
//       } else {
//         setError(error.message || "Some error occured");
//         setIsLoading(false);
//       }
//     } catch (error) {
//       setError(error.message || "Some error occured");
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="flex justify-center w-full h-screen place-items-center">
//       {isLoading && <LoadingSpinner />}
//       <form className="p-4" onSubmit={RegisterSubmitHandler}>
//         <Input
//           label="Name"
//           id="name"
//           element="input"
//           errorText="Please enter valid name"
//           onInput={inputHandler}
//           validators={[VALIDATOR_REQUIRE()]}
//           initialValue={formState.inputs.name.value}
//           initialIsValid={formState.inputs.name.value}
//         />
//         <Input
//           label="Email"
//           id="email"
//           element="input"
//           errorText="Please enter valid email"
//           onInput={inputHandler}
//           validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
//           initialValue={formState.inputs.email.value}
//           initialIsValid={formState.inputs.email.value}
//         />
//         <Input
//           label="Password"
//           id="password"
//           element="input"
//           type="password"
//           errorText="Password cannot be blank"
//           onInput={inputHandler}
//           validators={[VALIDATOR_REQUIRE()]}
//           initialValue={formState.inputs.password.value}
//           initialIsValid={formState.inputs.password.value}
//         />
//         <Input
//           label="Role"
//           id="role"
//           element="select"
//           errorText="Please select a role"
//           onInput={inputHandler}
//           validators={[VALIDATOR_REQUIRE()]}
//           initialValue={formState.inputs.role.value}
//           initialIsValid={formState.inputs.role.isValid}
//         >
//         </Input>
//         <Button type="submit" disabled={!formState.isValid}>
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;


import { useState } from "react";
import Input from "../../../shared/components/form-elements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../../shared/utils/validators";
import Button from "../../../shared/components/form-elements/Button";
import { useForm } from "../../../shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Backdrop from "../../../shared/components/ui-elements/Backdrop";

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const [formState, inputHandler, setFormData] = useForm({
        name: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        },
        role: {
            value: '',
            isValid: false,
        }
    }, false);

    const registerSubmitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    role: formState.inputs.role.value,
                }),
            });

            console.log(response);

            if (response.status === 201) {
                // Registration successful
                const responseData = await response.json();
                console.log(responseData);
                setIsLoading(false);
                navigate('/login'); // Redirect to login page after successful registration
            } else {
                setError(error.message || 'Some error occurred');
                setIsLoading(false);
            }
        } catch (error) {
            setError(error.message || 'Some error occurred');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center w-full h-screen place-items-center">
            {isLoading && <LoadingSpinner />}
            <form className="p-4" onSubmit={registerSubmitHandler}>
                <Input
                    label="Name"
                    id="name"
                    element="input"
                    errorText="Please enter a valid name"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValue={formState.inputs.name.value}
                    initialIsValid={formState.inputs.name.isValid}
                />
                <Input
                    label="Email"
                    id="email"
                    element="input"
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                    initialValue={formState.inputs.email.value}
                    initialIsValid={formState.inputs.email.isValid}
                />
                <Input
                    label="Password"
                    id="password"
                    element="input"
                    type="password"
                    errorText="Password should be at least 6 characters long"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                    initialValue={formState.inputs.password.value}
                    initialIsValid={formState.inputs.password.isValid}
                />
                <Input
                    label="Role"
                    id="role"
                    element="input"
                    type="text"
                    errorText="Enter role name"
                    onInput={inputHandler}
                    validators={[VALIDATOR_REQUIRE()]}
                    initialValue={formState.inputs.role.value}
                    initialIsValid={formState.inputs.role.isValid}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Register;