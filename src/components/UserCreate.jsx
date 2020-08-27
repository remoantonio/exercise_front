import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'

export default class UserCreate extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        email: '',
        fname: '',
        lname: ''
    }
    handleChange = this.handleChange.bind(this)
    handleSubmit = this.handleSubmit.bind(this)

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ 
            "username": this.state.username, 
            "password": this.state.password, 
            "password2": this.state.password2, 
            "email": this.state.email, 
            "fname": this.state.fname, 
            "lname": this.state.lname });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3003/user/new", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    this.setState({
                        message: data.message
                    })
                } else {
                    this.props.setUser(data);
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                <Form.Group className="mx-auto" style={{ width: '40em' }}
                    onSubmit={(evt) => this.handleSubmit(evt)}>
                        <br/>
                        Create a new User
                        <br/>
                    <Form.Label className="h4" htmlFor="username">Username: </Form.Label>
                    <Form.Control type="text" id="username"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.username} />
                    <br />
                    <Form.Label className="h4" htmlFor="password">Password: </Form.Label>
                    <Form.Control type="text" id="password"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.password} />
                    <br />
                    <Form.Label className="h4" htmlFor="password2">Verify Password: </Form.Label>
                    <Form.Control type="text" id="password2"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.password2} />
                    <br />
                    <Form.Label className="h4" htmlFor="email">Email: </Form.Label>
                    <Form.Control type="text" id="email"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.email} />
                    <br />
                    <Form.Label className="h4" htmlFor="fname">First Name: </Form.Label>
                    <Form.Control type="text" id="fname"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.fname} />
                    <br />
                    <Form.Label className="h4" htmlFor="lname">Last Name: </Form.Label>
                    <Form.Control type="text" id="lname"
                        onChange={(evt) => this.handleChange(evt)}
                        value={this.state.lname} />
                    <br />
                    <Button variant="warning" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form.Group>
            </div>
        )
    }
}
