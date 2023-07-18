import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Container, Grid, InputLabel, TextField, Toolbar, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { convertNIC } from '../api';
import axios from 'axios';


const Home = () => {

    const navigate = useNavigate()

    const fetchUser = () => {
        const userInfo = localStorage.getItem("User") !== "undefined"
            ? JSON.parse(localStorage.getItem("User"))
            : localStorage.clear();

        setUserInfo(userInfo)
    };

    useEffect(() => {
        fetchUser()
    }, []);

    const [userInfo, setUserInfo] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [nicDetails, setnicDetails] = useState({
        nic: "",

    });

    const NicDetailsSchema = Yup.object().shape({
        nic: Yup.string().min(10, 'NIC is Too Short!').max(12, 'NIC is Too Long!').required('NIC is Required'),
    });

    async function convert(values) {
        try {
            //send access token in axios header
            axios.interceptors.request.use(
                (config) => {
                    if (userInfo.token) {
                        config.headers.authorization = `Bearer ${userInfo.token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            //call convertNIC function in api file
            const res = await convertNIC(values);
            if (res.code === 'ERR_BAD_REQUEST') {
                setDateOfBirth('')
                setGender('')
                alert(res.response.data.message);
                return;
            }
            else {
                setnicDetails({ nic: "" });
                setDateOfBirth(res.Dob)
                setGender(res.gender)
                alert(`converted DOB: ${res.Dob} Gender: ${res.gender}`);
            }

        } catch (error) {
            console.error("Error during login:", error);
        }

    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    if (!userInfo) {
        navigate('/login');
    } else {
        return (
            <div>

                <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 5 }}>
                    <Button variant="none" size="small" >
                        Welcome {userInfo?.user.name}
                    </Button>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        align="center"
                        noWrap
                        sx={{ flex: 1 }}
                    >
                        NIC Converter
                    </Typography>
                    {userInfo && (
                        <Button variant="outlined" size="small" onClick={() => { logout() }}>
                            LogOut
                        </Button>
                    )}
                    {!userInfo && (
                        <Link to={"/login"} >
                            <Button variant="outlined" size="small">
                                Login
                            </Button>
                        </Link>
                    )}

                </Toolbar>

                <Box

                    alignItems="center"
                    height="100%"
                    justifyContent="center"

                >
                    <Container maxWidth="xs">
                        <Grid
                            container
                            spacing={2}
                            direction="column"
                            alignItems="center"

                            sx={{ minHeight: '100vh' }}
                        >

                            <Card sx={{ minWidth: 275, mt: 2 }}>
                                <CardContent>

                                    <Formik
                                        initialValues={{
                                            nic: nicDetails.nic,
                                        }}

                                        validationSchema={NicDetailsSchema}
                                        onSubmit={(e) => convert(e)}
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
                                                        Enter Your Nic To Calculate Birthday & Gender
                                                    </Typography>
                                                </Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}    >

                                                        <InputLabel shrink id="email" sx={{ fontSize: 25 }}>
                                                            <Typography
                                                                color="textPrimary"
                                                                variant="h5"
                                                            >
                                                                NIC :
                                                            </Typography>

                                                        </InputLabel>

                                                        <TextField
                                                            error={Boolean(touched.nic && errors.nic)}
                                                            fullWidth
                                                            helperText={touched.nic && errors.nic}
                                                            name="nic"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            type="text"
                                                            value={values.nic}
                                                            variant="outlined"
                                                        />
                                                    </Grid>


                                                </Grid>
                                                <Grid display="flex"
                                                    flexDirection="row"
                                                    justifyContent="space-between"
                                                >
                                                    <Box my={2} width="30%">
                                                        <Button
                                                            color="secondary"
                                                            disabled={isSubmitting}
                                                            fullWidth
                                                            size="large"
                                                            type="submit"
                                                            variant="contained"
                                                        >
                                                            Convert
                                                        </Button>
                                                    </Box>

                                                </Grid>

                                            </form>
                                        )}
                                    </Formik>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} >
                                            <InputLabel shrink id="email" sx={{ fontSize: 25 }}>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h5"
                                                >
                                                    Date Of Birth :
                                                </Typography>

                                            </InputLabel>

                                            <Typography
                                                component="h2"
                                                variant="h5"
                                                color="inherit"
                                                noWrap
                                                sx={{ flex: 1 }}
                                            >
                                                {dateOfBirth}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} >
                                            <InputLabel shrink id="email" sx={{ fontSize: 25 }}>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="h5"
                                                >
                                                    Gender :
                                                </Typography>

                                            </InputLabel>

                                            <Typography
                                                component="h2"
                                                variant="h5"
                                                color="inherit"
                                                noWrap
                                                sx={{ flex: 1 }}
                                            >
                                                {gender}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Container>
                </Box>


            </div>
        )

    }
}

export default Home
