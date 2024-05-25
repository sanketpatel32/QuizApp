import { useState, useContext } from 'react';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { AuthorizationContext } from '../../context/AuthorizationContext.jsx';

import styles from './Login.module.css';

const Login = () => {

  const navigate = useNavigate();


  //------------------------------------------CONTEXTS-------------------------------------------------
  const { userDetails, setUserDetails, isLoggedIn, setIsLoggedIn } = useContext(AuthorizationContext);


  //------------------------------------------STATE----------------------------------------------------
  const [LoginDiv, setLoginDiv] = useState(false);


  // -----------------------------------------SINGUP FORM UTILS----------------------------------------
  const [singupFormData, setSingupFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleSingupChange = (e) => {
    const { name, value } = e.target;
    setSingupFormData({
      ...singupFormData,
      [name]: value
    });
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (singupFormData.password !== singupFormData.confirmPassword) {
      toast.error('Password not matched', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    }
    axios.post('/api/auth/register', singupFormData, { withCredentials: true })
      .then((res) => {
        const cookieValue = document.cookie
          .split('; ')
          .find(cookie => cookie.startsWith('__clerk_db_jwt='));

        let jwtToken = null;
        if (cookieValue) {
          jwtToken = cookieValue.split('=')[1];
        }
        if (jwtToken) {
          localStorage.setItem('jwt', jwtToken);
          console.log('JWT token saved successfully:');
        } else {
          console.error('Failed to extract JWT token from the cookie.');
        }
        // --------
        setUserDetails(res.data);
        toast.success('SingUp successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/home');
      })
      .catch((err) => {
        toast.error('Something Went Wrong', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      })
  };
  

  // -----------------------------------------LOGIN FORM UTILS-----------------------------------------
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value
    });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    axios.post('/api/auth/login', loginFormData, { withCredentials: true })
      .then((res) => {
        const cookieValue = document.cookie
          .split('; ')
          .find(cookie => cookie.startsWith('__clerk_db_jwt='));

        let jwtToken = null;
        if (cookieValue) {
          jwtToken = cookieValue.split('=')[1];
        }
        if (jwtToken) {
          localStorage.setItem('jwt', jwtToken);
          console.log('JWT token saved successfully:');
        } else {
          console.error('Failed to extract JWT token from the cookie.');
        }
        // --------
        setUserDetails(res.data);
        toast.success('Login successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/home');
      })
      .catch((err) => {
        toast.error('Invalid Email or Password', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
      })
  };



  return (
    <div className={styles.container}>
      <div className={styles.mainDiv}>
        <div className={styles.heading}>QUIZZIE</div>
        <div className={styles.optionsBar}>
          <div className={`${styles.optionsBox} ${!LoginDiv ? styles.optionsBoxShadow : ""}`} onClick={() => setLoginDiv(false)}>Sign Up</div>
          <div className={`${styles.optionsBox} ${LoginDiv ? styles.optionsBoxShadow : ""}`} onClick={() => setLoginDiv(true)}>Log In</div>
        </div>
        <div className={styles.form}>

          {!LoginDiv ?
            <form onSubmit={handleSignupSubmit} >
              {/* ----------------Name-------------------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Name</span>
                <input
                  className={styles.input}
                  type="text"
                  id="name"
                  name="name"
                  value={singupFormData.name}
                  onChange={handleSingupChange}
                  required
                />
              </div>
              {/* -----------Emails----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={singupFormData.email}
                  onChange={handleSingupChange}
                  required
                />
              </div>
              {/* -----------Password----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Password</span>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={singupFormData.password}
                  onChange={handleSingupChange}
                  required
                />
              </div>
              {/* -----------Confirm Password----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Confirm Password</span>
                <input
                  className={styles.input}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={singupFormData.confirmPassword}
                  onChange={handleSingupChange}
                  required
                />
              </div>
              {/* ------------Submit Button ---------------- */}
              <button className={styles.submitButton} type="submit">Sign Up</button>
            </form> :
            <form onSubmit={handleLoginSubmit}>
              {/* -----------Emails----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  id="email"
                  name="email"
                  value={loginFormData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              {/* -----------Password----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Password</span>
                <input
                  className={styles.input}
                  type="password"
                  id="password"
                  name="password"
                  value={loginFormData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              {/* ------------Submit Button ---------------- */}
              <button className={styles.submitButton} type="submit">Log In</button>
            </form>
          }

        </div>
      </div>
    </div>
  )
}

export default Login;