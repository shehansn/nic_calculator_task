import { AlertTitle, Box, Button, Card, CardContent, Container, Grid, InputLabel, Snackbar, TextField, Typography } from '@mui/material'
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const LoginForm = () => {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""

    });

    const SigninSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password is Too Short!').max(20, 'Password is Too Long!').required('Password is Required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
    });

    async function login(values) {
        try {
            console.log(values);
            const res = await loginUser(values);
            if (res.code === 'ERR_BAD_REQUEST') {
                console.log("response from login user", res.response.data);
                alert(res.response.data);
                return;
            } else {
                alert(`Welcome ${res.user.name}`);
                console.log("response from login user", res);
                localStorage.setItem("User", JSON.stringify(res));
                setUserDetails({
                    email: "",
                    password: ""
                });

                // Redirect or navigate to the desired location
                navigate('/');
            }


        } catch (error) {
            console.error("Error during login:", error);
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
                                    username: userDetails.email,
                                    password: userDetails.password
                                }}

                                validationSchema={SigninSchema}
                                onSubmit={(e) => login(e)}
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
                                                Login
                                            </Typography>
                                        </Box>
                                        <Grid container spacing={2}>
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
                                                    type="text"
                                                    value={values.email}
                                                    variant="outlined"
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={12}
                                            >
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

                                        </Grid>
                                        <Grid display="flex"
                                            flexDirection="row"
                                            justifyContent="space-between"
                                        >
                                            <Box my={2} width="20%">
                                                <Button
                                                    color="secondary"
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                >
                                                    Login
                                                </Button>
                                            </Box>
                                            <Box my={2} width="20%">
                                                <Link to={"/register"} >
                                                    <Button
                                                        color="secondary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="button"
                                                        variant="text"
                                                    >
                                                        Register
                                                    </Button>
                                                </Link>
                                            </Box>
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

export default LoginForm
