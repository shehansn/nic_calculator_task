import { Box, Button, Card, CardContent, Checkbox, Container, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Formik } from 'formik';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
//import { trackPromise } from 'react-promise-tracker';
import * as Yup from 'yup';
import { registerUser } from '../api';


const RegisterForm = () => {
    const navigate = useNavigate()

    const [registerDetails, setregisterDetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const SignupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Name is Too Short!').max(100, 'Name is Too Long!').required('Name is Required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().min(8, 'Password is Too Short!').max(20, 'Password is Too Long!').required('Password is Required'),
        confirmPassword: Yup.string().min(8, 'Password is Too Short!').max(20, 'Password is Too Long!').required('Password is Required').oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    async function register(values) {
        try {
            const res = await registerUser(values);
            if (res.code === 'ERR_BAD_REQUEST') {
                alert(res.response.data);
                return;
            } else {
                alert(`User Registered Successfully`);
                setregisterDetails({
                    name: "",
                    email: "",
                    password: ""
                });

                //after successfull register Redirect to login
                navigate('/login');
            }


        } catch (error) {
            console.error("Error during register:", error);
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
                                    name: registerDetails.name,
                                    email: registerDetails.email,
                                    password: registerDetails.password,
                                    confirmPassword: registerDetails.confirmPassword
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

                                            <Grid item xs={12} md={12}                                 >

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

                                            <Grid item xs={12} md={12}                                 >

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
