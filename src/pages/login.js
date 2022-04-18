import {
  Button,
  Card,
  CardHeader,
  TextField,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/shared/Seo";
import { useLoginPageStyles } from "../styles";
import FacebookIconBlue from "../images/facebook-icon-blue.svg";
import FacebookIconWhite from "../images/facebook-icon-white.png";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../auth";
import { useHistory } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import { useApolloClient } from "@apollo/client";
import { GET_USER_EMAIL } from "../graphql/queries";
import { AuthError } from './signup';

const LoginPage = () => {
  const { handleSubmit, watch, formState, control } = useForm({
    mode: "onChange",
  });
  const { isValid, isSubmitting } = formState;
  const classes = useLoginPageStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const hasPassword = Boolean(watch("password"))
  const { logInWithEmailAndPassword } = React.useContext(AuthContext);
  const history = useHistory();
  const client = useApolloClient()
  const [error, setError] = React.useState('')
  console.log()

  const handleClickShowPassword = (event) => {
    setShowPassword(prev => !prev)
  }
  async function getUserEmail(input) {
    const variables = { input };
    console.log(variables);
    const response = await client.query({
      query: GET_USER_EMAIL,
      variables,
    });
    const userEmail = response.data.users[0]?.email || "no@email.com";
    console.log('user email', userEmail);
    return userEmail;
  }

  const handleError = (error) => {
    if (error.code.includes("auth")) {
      setError(error.message);
    }
  }

  async function onSubmit({ input, password }) {
    try {
      setError("");
      if (!isEmail(input)) {
        input = await getUserEmail(input);
      }
      console.log({ input, password });
      await logInWithEmailAndPassword(input, password);
      setTimeout(() => history.push("/"), 0);
    } catch (error) {
      console.error("Error logging in", error);
      handleError(error);
    }
  }
  // const handleMouseDownPassword = () => setShowPassword(!showPassword)

  return (
    <>
      <SEO title="Login" />
      <section className={classes.section}>
        <article>
          <Card className={classes.card}>
            <CardHeader className={classes.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="input"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    // {...register('input', { 'required': true, minLength: 5 })}
                    fullWidth
                    variant="filled"
                    label="Username, email or phone"
                    margin="dense"
                    className={classes.textField}
                    // autoComplete="username"
                    error={!!error}
                    value={value}
                    onChange={onChange}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ 'required': true, minLength: 5 }}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    // {...register('password', { 'required': true, minLength: 6 })}
                    fullWidth
                    variant="filled"
                    label="password"
                    type={showPassword ? "text" : "password"}
                    margin="dense"
                    className={classes.textField}
                    // autoComplete="current-password"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      endAdornment: hasPassword && (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            fullWidth
                            className={classes.adornedEndButton}
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </Button>

                        </InputAdornment>
                      ),
                      classes: {
                        adornedEnd: classes.adornedEnd
                      }
                    }}
                  />
                )}
                rules={{ 'required': true, minLength: 6 }}
              />

              <Button
                disabled={!isValid || isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={classes.button}
                type="submit"
              >
                Log In
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
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <AuthError error={error} />
            <Button fullWidth color="secondary">
              <Typography variant="caption">
                Forgor Password?
              </Typography>
            </Button>
          </Card>
          <Card className={classes.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to="/accounts/emailsignup">
              <Button color="primary" className={classes.button}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  )
}

export const LoginWithFacebook = ({ color, iconColor, variant }) => {
  const classes = useLoginPageStyles();
  const { logInWithGoogle } = React.useContext(AuthContext)
  const facebookIcon = iconColor === "blue" ? FacebookIconBlue : FacebookIconWhite;
  const [error, setError] = React.useState('')
  const history = useHistory();

  const handleLogInWithGoogle = async () => {
    try {
      await logInWithGoogle();
      setTimeout(history.push('/'), 0);
    } catch (error) {
      console.error('Error logging in with Google', error)
      setError(error.message)
    }
  }
  return (
    <>
      <Button onClick={handleLogInWithGoogle} fullWidth color={color} variant={variant}>
        <img
          src={facebookIcon}
          alt="facebook icon"
          className={classes.facebookIcon}
        />
        Log In With Facebook
      </Button>
      <AuthError error={error} />
    </>
  )
}

export default LoginPage;

