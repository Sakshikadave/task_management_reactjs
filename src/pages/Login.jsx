import React, { useState } from "react";
import { Button, TextField, Container, Paper, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigation = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Login successfully");
      navigation("/tasks")
    } catch (error) {
      console.error("There was an error submitting the form!", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={data.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={data.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2">
                Already have an account? <a href="/login">Login</a>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
