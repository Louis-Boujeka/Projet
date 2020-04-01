import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Footer extends Component {
    render(){
        return (
            <div>
              <br/>
              <br/>
              <div  className='alert alert-danger' role='alert'>
                404 Oups!! Impossible de trouver la page!<Link to='/' className='alert-link'>Retour à la page d'acceuil</Link>
              </div>
            </div>
        );
    }
}
