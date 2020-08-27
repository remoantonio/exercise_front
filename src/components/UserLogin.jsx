import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'

export default class UserLogin extends Component {
    state = {
        username: '',
        password: ''
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
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_BASE_URL + "user/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    this.setState({
                        message: data.message
                    })
                }
                else {
                    this.props.setUser(data);
                //     this.setState({ 
                //         username: '',
                //         password: ''
                //     })
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
                        Login Existing User
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
                    <Button variant="warning" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                </Form.Group>
            </div>
        )
    }
}
