import { useState } from 'react';
import styles from './Login.module.css';
const Login = () => {
  const [LoginDiv,setLoginDiv] = useState(false);

  const [singupFormData,setSingupFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:''
  });

  const [loginFormData,setLoginFormData] = useState({
    email:'',
    password:'',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value
    });
  };
  const handleSingupChange = (e) => {
    const { name, value } = e.target;
    setSingupFormData({
      ...singupFormData,
      [name]: value
    });
  };

  return (
    <div className = {styles.container}>
      <div className={styles.mainDiv}>
        <div className={styles.heading}>QUIZZIE</div>
        <div className={styles.optionsBar}>
          <div className={styles.optionsBox} onClick={()=>setLoginDiv(false)}>Sign Up</div>
          <div className={styles.optionsBox} onClick={() => setLoginDiv(true)}>Log In</div>
        </div>
        <div className={styles.form}>

{!LoginDiv ? 
          <form >
            {/* ------Name-------------------- */}
            <div className={styles.inputBox}>
              <span className={styles.label}>Name</span>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            {/* -----------Emails----------- */}
            <div className={styles.inputBox}>
              <span className={styles.label}>Email</span>
              <input
                className={styles.input}
                type="email"
                id="username"
                name="username"
                required
              />
            </div>
            {/* -----------Password----------- */}
            <div className={styles.inputBox}>
              <span className={styles.label}>Password</span>
              <input
                className={styles.input}
                type="password"
                id="username"
                name="username"
                required
              />
            </div>
            {/* -----------Confirm Password----------- */}
            <div className={styles.inputBox}>
              <span className={styles.label}>Confirm Password</span>
              <input
                className={styles.input}
                type="password"
                id="username"
                name="username"
                required
              />


            </div>
              {/* ------------Submit Button ---------------- */}
              <button className={styles.submitButton} type="submit">Sign Up</button>
          </form> : 
          <form>
              {/* -----------Emails----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  id="username"
                  name="username"
                  required
                />
              </div>
              {/* -----------Password----------- */}
              <div className={styles.inputBox}>
                <span className={styles.label}>Password</span>
                <input
                  className={styles.input}
                  type="password"
                  id="username"
                  name="username"
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

export default Login