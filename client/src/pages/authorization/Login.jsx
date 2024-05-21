import { useState } from 'react';
import styles from './Login.module.css';
const Login = () => {
  const [LoginDiv, setLoginDiv] = useState(false);



  // -----------------------------------------SINGUP FORM UTILS-----------------------------------------
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
    console.log('Signup data:', singupFormData);
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
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginFormData);
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
              {/* ------Name-------------------- */}
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