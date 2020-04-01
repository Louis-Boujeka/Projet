import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccesMessage from '../SuccesMessage';
import ErrorsMessage from '../ErrorsMessage';

export default class NouvelleCategorie extends Component {
    constructor(props)
    {
        super(props);
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            email:'',
            password:'',
            alert_message:'',
        }
    }

    controleForm(event){
        const target = event.target;
        const value = target.value ;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }

    onSubmit(e){
        e.preventDefault();
       
        axios.post('http://127.0.0.1:8000/api/categorie/store',categorie)
        .then(response=>{
            setTimeout(() => this.setState({alert_message:''}), 3000);

            this.setState({alert_message:'success'})
        }).catch(error=>{
            this.setState({alert_message:"error"})
        });
        
    }

    render(){
        return (
            <div className="row">
                <div className='col-md-4 mt-4'>
                    <br/>
                {this.state.alert_message == "success" ? <SuccesMessage message='Categorie Ajouter avec success' /> : null }
                {this.state.alert_message == "error" ? <ErrorsMessage message='Echec ! veillez réesayer'/> : null }
                <form onSubmit={this.onSubmit}>
                    <div className='form-row'>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="h4">Email : </label>
                            <input type="text" className='form-control' autoComplete='off'
                            name='email' 
                            value={this.state.email ? this.state.email : ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="h4">Mot de passe:</label>
                            <input type='password' className='form-control' 
                            name='password'
                            value={this.state.password ? this.state.password : ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                <button className="btn btn-primary" type="submit">Se Connecter</button>
                </form>
                </div>
               
            </div>
        );
    }
}
