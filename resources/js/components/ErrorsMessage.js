import React, { Component } from 'react';
export default class Errors extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='alert alert-danger' role='alert'>
                {this.props.message}
            </div>
        );
    }
}