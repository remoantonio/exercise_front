import React, { Component } from 'react'
import ReactPlayer from "react-player";
import {Form, Button} from 'react-bootstrap'
require('dotenv').config()


export default class Test extends Component {
    state = {
        workout: '',
        exercise: '',
        currentExercise: ''
    }
    handleChange = this.handleChange.bind(this)
    get_workout = this.get_workout.bind(this)
    get_specific = this.get_specific.bind(this)
    get_random = this.get_random.bind(this)

    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value,
        });
    }

    get_workout(x) {

        this.setState({
            currentExercise: this.state.exercise
        })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "exercise": x });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_BASE_URL + "workout", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result))
                result = JSON.parse(result)[0]
                this.setState({ workout: result })
            })
            .catch(error => console.log('error', error));
    }

    get_specific() {

        this.setState({
            currentExercise: this.state.exercise
        })

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "exercise": this.state.currentExercise });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(process.env.REACT_APP_BASE_URL + "workout", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(JSON.parse(result))
                result = JSON.parse(result)[0]
                this.setState({ workout: result })
            })
            .catch(error => console.log('error', error));
    }

    async get_random() {
        let number = await Math.ceil(Math.random() *1900)
        console.log(number)
        this.setState({
            exercise: number,
            currentExercise: number
        })
        this.get_workout(number)
    }

    // componentDidMount() {
    //     this.get_workout()
    // }

    render() {
        return (
            <div>
                {this.state.currentExercise === '' ?
                    (<>
                        <Form.Group className="mx-auto" style={{ width: '40em' }}>
                            <br />
                        Choose an exercise 1 - 1900:
                        <br />
                            <Form.Label className="h4" htmlFor="exercise">Exercise: </Form.Label>
                            <Form.Control type="text" id="exercise"
                                onChange={(evt) => this.handleChange(evt)}
                                value={this.state.exercise} />
                            <br />
                            <Button variant="warning" type="submit" onClick={this.get_specific}>Submit</Button>
                        </Form.Group>
                        <Button onClick={this.get_random}>Random Exercise</Button>
                    </>) : (<>
                        <Form.Group className="mx-auto" style={{ width: '40em' }}>
                            <br />
                        Choose an exercise 1 - 1900:
                        <br />
                            <Form.Label className="h4" htmlFor="exercise">Exercise: </Form.Label>
                            <Form.Control type="text" id="exercise"
                                onChange={(evt) => this.handleChange(evt)}
                                value={this.state.exercise} />
                            <br />
                            <Button variant="warning" type="submit" onClick={this.get_specific}>
                                Submit
                    </Button>
                        </Form.Group>
                        <Button onClick={this.get_random}>Random Exercise</Button>
                        <br/>
                        {this.state.workout.Exercise_Name}
                        <ReactPlayer
                            url={this.state.workout.video_src} playing={true} loop={true} volume={0} muted={true} alt={this.state.workout.Exercise_Name_Complete} title={this.state.workout.Exercise_Name_Complete}
                        />
                        {this.state.workout.Instructions_Execution}
                    </>)}
            </div>
        )
    }
}
