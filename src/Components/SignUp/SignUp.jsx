
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

const SignUp = () => {

    const {register, handleSubmit, formState: { errors }} = useForm()
    

    const onSubmit = data => {
        console.log(data)
    }

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
    </form>
  </div>
</div>
</>
    );
};

export default SignUp;
