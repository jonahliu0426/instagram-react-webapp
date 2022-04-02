import {
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useSignUpPageStyles } from "../styles";
import { LoginWithFacebook } from "./login";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AuthContext } from "../auth";
import { useHistory } from "react-router-dom";


function SignUpPage() {
  const classes = useSignUpPageStyles();
  const { signUpWithEmailAndPassword } = React.useContext(AuthContext);
  const [values, setValues] = React.useState({
    email: '',
    name: '',
    username: '',
    password: '',
  })
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUpWithEmailAndPassword(values);
    history.push('/');
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <div className={classes.cardHeader} />
            <Typography className={classes.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook color="primary" iconColor="white" variant="contained" />
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                onChange={handleChange}
                name="email"
                variant="filled"
                label="Mobile Number or Email"
                margin="dense"
                className={classes.textField}
                autoComplete="email"
              />
              <TextField
                fullWidth
                name="name"
                onChange={handleChange}
                variant="filled"
                label="Full Name"
                margin="dense"
                className={classes.textField}
              />
              <TextField
                fullWidth
                name="username"
                onChange={handleChange}
                variant="filled"
                label="username"
                margin="dense"
                className={classes.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                name="password"
                onChange={handleChange}
                variant="filled"
                label="password"
                margin="dense"
                className={classes.textField}
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <div className={classes.orContainer}>
              <div className={classes.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={classes.orLine} />
            </div>

            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to="/accounts/login">
              <Button color="primary" className={classes.loginButton}>
                Log In
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export default SignUpPage;
