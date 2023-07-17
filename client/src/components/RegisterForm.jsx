import { Alert, AlertTitle, Box, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Formik } from 'formik';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
//import { trackPromise } from 'react-promise-tracker';
import * as Yup from 'yup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { registerUser } from '../api';

const theme = createTheme();

theme.typography.h5 = {
    fontSize: '0.4rem',

    '@media (min-width:600px)': {
        fontSize: '0.7rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.2rem',
    },
};


const RegisterForm = () => {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Name is Too Short!').max(100, 'Name is Too Long!').required('Name is Required'),
        password: Yup.string().min(8, 'Password is Too Short!').max(20, 'Password is Too Long!').required('Password is Required'),
        confirmPassword: Yup.string().min(8, 'Password is Too Short!').max(20, 'Password is Too Long!').required('Password is Required').oneOf([Yup.ref('password')], 'Passwords must match'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
    });

    async function register(values) {
        try {
            console.log(values);
            const res = await registerUser(values);
            if (res.code === 'ERR_BAD_REQUEST') {
                console.log("response from register user", res.response.data);
                alert(res.response.data);
                return;
            } else {
                alert(`User Registered Successfully`);
                console.log("response from register user", res);
                setUserDetails({
                    name: "",
                    email: "",
                    password: ""
                });

                // Redirect or navigate to the desired location
                navigate('/login');
            }


        } catch (error) {
            console.error("Error during register:", error);
            // Handle the error, show an error message, etc.
        }


    }
    return (
        <div>
            <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
                mt={5}
            >

                <Container maxWidth="xs">
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Formik
                                initialValues={{
                                    name: userDetails.name,
                                    email: userDetails.email,
                                    password: userDetails.password,
                                    confirmPassword: userDetails.confirmPassword
                                }}

                                validationSchema={SignupSchema}
                                onSubmit={(e) => register(e)}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                    touched,
                                    values
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box mb={3}>
                                            <Typography
                                                color="textPrimary"
                                                variant="h4"
                                                textAlign="center"
                                            >
                                                Sign Up
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12} md={12} spacing={0}                                   >

                                                <InputLabel shrink id="name" sx={{ fontSize: 25 }}>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h5"
                                                    >
                                                        Name :
                                                    </Typography>

                                                </InputLabel>

                                                <TextField
                                                    error={Boolean(touched.name && errors.name)}
                                                    fullWidth
                                                    helperText={touched.name && errors.name}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="text"
                                                    value={values.name}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12} spacing={0}                                   >

                                                <InputLabel shrink id="email" sx={{ fontSize: 25 }}>
                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h5"
                                                    >
                                                        Email :
                                                    </Typography>

                                                </InputLabel>

                                                <TextField
                                                    error={Boolean(touched.email && errors.email)}
                                                    fullWidth
                                                    helperText={touched.email && errors.email}
                                                    name="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="email"
                                                    value={values.email}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12}                                            >
                                                <InputLabel shrink id="password" sx={{ fontSize: 25 }}  >

                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h5"
                                                    >
                                                        Password :
                                                    </Typography>
                                                </InputLabel>
                                                <TextField
                                                    error={Boolean(touched.password && errors.password)}
                                                    fullWidth
                                                    helperText={touched.password && errors.password}
                                                    name="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="password"
                                                    value={values.password}
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}                                            >
                                                <InputLabel shrink id="passwordAgain" sx={{ fontSize: 25 }}  >

                                                    <Typography
                                                        color="textPrimary"
                                                        variant="h5"
                                                    >
                                                        Confirm Password:
                                                    </Typography>
                                                </InputLabel>
                                                <TextField
                                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                                    fullWidth
                                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                                    name="confirmPassword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="password"
                                                    value={values.confirmPassword}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item sx={{ display: "inline-flex", width: "100%" }} md={12} >
                                                <FormControlLabel control={<Checkbox />} label="I Agree with the" />

                                                <ThemeProvider theme={theme}>
                                                    <Typography variant="h5" color="secondary" mt={1.1} ml={-1} >term of services </Typography>
                                                </ThemeProvider>
                                            </Grid>


                                        </Grid>

                                        <Box my={2} width="100%">
                                            <Button
                                                color="secondary"
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                            >
                                                Register
                                            </Button>
                                        </Box>

                                        <Grid display="flex"
                                            flexDirection="row"
                                            justifyContent="center"
                                            alignItems="center "
                                        >
                                            <Typography
                                                color="textPrimary"
                                                variant="h6"

                                            >
                                                Already a member?

                                            </Typography>
                                            <Link to={"/login"} >
                                                <Button
                                                    color="secondary"
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="button"
                                                    variant="text"

                                                >
                                                    Login here
                                                </Button>

                                            </Link>
                                        </Grid>



                                    </form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card >
                </Container>

            </Box>


        </div >
    )
}

export default RegisterForm
