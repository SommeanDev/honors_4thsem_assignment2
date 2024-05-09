import { useState } from "react";
import Input from "../../shared/components/form-elements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import Button from "../../shared/components/form-elements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import Backdrop from "../../shared/components/ui-elements/Backdrop";

const CreatePost = () => {
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState();
 const navigate = useNavigate();
 const [formState, inputHandler, setFormData] = useForm(
   {
     title: {
       value: "",
       isValid: false,
     },
     content: {
       value: "",
       isValid: false,
     },
     image: {
       value: null,
       isValid: true,
     },
   },
   false
 );

 const createPostHandler = async (event) => {
   event.preventDefault();
   setIsLoading(true);

   try {
     const response = await fetch("http://localhost:3000/api/posts", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         title: formState.inputs.title.value,
         content: formState.inputs.content.value,
         image: formState.inputs.image.value,
       }),
     });

     console.log(response);

     if (response.status === 201) {
       // Post creation successful
       const responseData = await response.json();
       console.log(responseData);
       setIsLoading(false);
       navigate("/posts"); // Redirect to posts page after successful creation
     } else {
       setError(error.message || "Some error occurred");
       setIsLoading(false);
     }
   } catch (error) {
     setError(error.message || "Some error occurred");
     setIsLoading(false);
   }
 };

 return (
   <div className="flex justify-center w-full h-screen place-items-center">
     {isLoading && <LoadingSpinner />}
     <form className="p-4" onSubmit={createPostHandler}>
       <Input
         label="Title"
         id="title"
         element="input"
         errorText="Please enter a valid title"
         onInput={inputHandler}
         validators={[VALIDATOR_REQUIRE()]}
         initialValue={formState.inputs.title.value}
         initialIsValid={formState.inputs.title.isValid}
       />
       <Input
         label="Content"
         id="content"
         element="textarea"
         errorText="Please enter the post content"
         onInput={inputHandler}
         validators={[VALIDATOR_REQUIRE()]}
         initialValue={formState.inputs.content.value}
         initialIsValid={formState.inputs.content.isValid}
       />
       <Input
         label="Image"
         id="image"
         element="input"
         type="file"
         errorText="Please select an image"
         onInput={inputHandler}
         initialValue={formState.inputs.image.value}
         initialIsValid={formState.inputs.image.isValid}
       />
       <Button type="submit" disabled={!formState.isValid}>
         Create Post
       </Button>
     </form>
   </div>
 );
};

export default CreatePost;
