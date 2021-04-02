import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import './Login.css';
import axios from 'axios';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:"", password:""};
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render()  {
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">
                    <Paper className="paper">
                        <Avatar className="avatar">
                            <LockOutlinedIcon  />
                        </Avatar>
                        <Typography variant="h2">Task Planner</Typography>
                        <form className="form" onSubmit={this.handleSubmit}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input 
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.handleUsernameChange} />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                            </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className="submit"
                                        onClick={this.handleSubmit}
                                    >
                                        Sign in
                                    </Button>
                            <Grid container>
                                <Grid item>
                                <Link href="signup" variant="body2">
                                    {"Create Account"}
                                </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {

        e.preventDefault();
        axios.post('http://localhost:8080/user/login',
            {
                "email":this.state.username,
                "password":this.state.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("actualPerson", this.state.username);
                localStorage.setItem("username",this.state.username);
                localStorage.setItem("password", this.state.password);
                localStorage.setItem("token", response.data.accessToken);
            }).catch(e => {
                alert("incorrect Username or password!!!");
            });
    }
}