import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
  //const [showPassword, setShowPassword] = useState(false);



  const { signIn } = useContext(AuthContext);


  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);


    signIn(email, password)
      .then(result => {
        const user = result.user
        console.log(user)

        // setUser(user);

        Swal.fire({
            title: 'Sign In',
            text: 'Sign In Successfully',
            icon: 'success',
            confirmButtonText: 'Thank You'
        })


        //navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {

        alert(error.code)
      });

  }





  // Captcha  functionality here--------->

  // Captcha এর কোড না মিলালে লগিন বাটন disabled থাকবে।
  const [disabled, setDisable] = useState(true);

  const captchaRef = useRef()
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    console.log(user_captcha_value);

    // validateCaptcha --> it's import from --->react-simple-captcha'; -->step-04
    if (validateCaptcha(user_captcha_value) == true) {

      //validateCaptcha--> এ সঠিক কোড দিলে লগিন বাটন হতে Disable উঠে যাবে।
      setDisable(false)
      // alert('Captcha Matched');
    }

    else {
      setDisable(true)
      alert('Captcha Does Not Match');
    }

  }






  return (
    <div className='container mx-auto items-center  justify-center  w-full flex flex-col md:flex-row lg:flex-row '>

      <div className=' w-[520px] space-y-4 p-12  my-12 bg-orange-200 shadow-lg '>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login Page</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <div>
          <h2 className='text-5xl font-bold text-center pb-6'>
            <span className="text-orange-600"> Login </span>
            Now
          </h2>
        </div>


        <form onSubmit={handleLogin}
          className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>
            <input type="text" ref={captchaRef} name="captcha" placeholder="Captcha Type Here..." className="input input-bordered" required />
            <button
              type="button"
              onClick={handleValidateCaptcha}
              className="btn  mt-4 bg-blue-800 hover:bg-blue-950 text-white text-lg">Validate</button>
          </div>


          <div className="form-control mt-6">
            <input disabled={disabled} type="submit" className="btn btn-primary" value='Login' />
          </div>
        </form>

        <p>New Here <small className="text-orange-600 font-medium">
          <Link to='/signUp' >Create A New Account</Link>
        </small></p>

      </div>


    </div>
  );
};


export default Login;