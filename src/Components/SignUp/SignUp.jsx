
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecurePublic from "../Hooks/useAxiosSecurePublic";
import SocialLogIn from "../SocialLogIn/SocialLogIn";

const SignUp = () => {

    const axiosPublic = useAxiosSecurePublic()
    const {register, handleSubmit, formState: { errors }} = useForm()
    const {createUser, updateUserProfile}= useContext(AuthContext)
    const navigate = useNavigate()
    
  const onSubmit = (data) => {
  console.log(data);

  createUser(data.email, data.password)
    .then(result => {
      const loggedUser = result.user;
      console.log("User created:", loggedUser);

      // Update profile
      return updateUserProfile(data.name, data.photoUrl);
    })
    .then(() => {
      const userInfo ={
        name:data.name,
        email: data.email


      }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        if(res.data.insertedId){
           console.log("User profile updated successfully");

        navigate('/')

        }
      })
     
    })

    .catch(error => {
      console.error("Error during sign up:", error.message);
    });
};

    return (
  <>
   <Helmet>
                 <title>SignUp</title>
            </Helmet>

     <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
        <label className="label">Name</label>
          <input type="text" {...register("name", { required: true })} name='name' className="input" placeholder="Name" />
           {errors.name && <span>This field is required</span>}

           <label className="label">Photo URL</label>
          <input type="text" {...register("photoUrl", { required: true })}  className="input" placeholder="photo URL" />
           {errors.photoUrl && <span>This field is required</span>}



          <label className="label">Email</label>
          <input type="email" {...register("email",  { required: true })}  name='email' 
          className="input" placeholder="Email" />
           {errors.email && <span>This field is required</span>}
          <label className="label">Password</label>
          <input type="password" {...register("password", { required: true, 
            minLength: 6, 
            maxLength:20, 
            pattern:/(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,})/
            })} name="password" className="input" placeholder="Password" />
          {errors.password?.type === "required" && <p>Password is required</p>}
          {errors.password?.type === "minLength" && <p>Password must be at least 6 characters</p>}
          {errors.password?.type === "maxLength" && <p>Password must be less than 20 characters</p>}

              {errors.password?.type === "pattern" && <p>Password must have one uppercase, one lower case, one number and one special character</p>}
          
          <div><a className="link link-hover">Forgot password?</a></div>
          <input
                type="submit"
                className="btn btn-neutral mt-4 w-full"
                value="SignUp"
              />
        </fieldset>
      </div>
        <div className="divider divider-start"></div>
     <div className="m-3 p-4">
       <SocialLogIn></SocialLogIn>
     </div>
    </form>
    
  </div>
</div>
</>
    );
};

export default SignUp;
