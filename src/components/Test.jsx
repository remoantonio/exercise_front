import React, { Component } from 'react'
import ReactPlayer from "react-player";

export default class Test extends Component {
    state = {
        workout: ''
    }
    get_workout = this.get_workout.bind(this)

    get_workout() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://www.localhost:3003/workout", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                result = JSON.parse(result).exercises[0]
                this.setState({ workout: result })
            })
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.get_workout()
    }

    render() {
        return (
            <div>
                {this.state.workout.Exercise_Name}
                <ReactPlayer
                    url={this.state.workout.video_src} playing={true} loop={true}
                />
                {this.state.workout.Instructions_Execution}
            </div>
        )
    }
}
