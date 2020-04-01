import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
export default class Edit extends Component {
    constructor(props)
    {
        super(props);
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            categorie_nom:'',
            description:'',
            statut:false
        }
    }

    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/categorie/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                categorie_nom:response.data.designationcategorie,
                description:response.data.description
            })
        });
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
        const categorie={
            categorie_nom : this.state.categorie_nom,
            description : this.state.description
        }
        
        axios.put('http://127.0.0.1:8000/api/categorie/update/'+this.props.match.params.id, categorie)
        .then(response=>console.log(response.statusText));
        this.setState({
            categorie_nom:'',
            description:'',
            statut:true 
        }) 
    }

    render(){
        if(this.state.statut)
        {
            return <Redirect to='/NouvelleCategorie'/>
        }
        return (
            <div className="row">
                <div className='col mt-4'>
                <form onSubmit={this.onSubmit}>
                    <div className='form-row'>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="h4">Nom De La Catégorie</label>
                            <input type="text" className='form-control'
                            name='categorie_nom' 
                            value={this.state.categorie_nom ? this.state.categorie_nom : ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="h4">Description de la Catégorie</label>
                            <textarea className='form-control' 
                            name='description'
                            value={this.state.description ? this.state.description : ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                <button className="btn btn-primary" type="submit">Enregistrer</button>
                </form>
                </div>
                <div className='col'></div>
            </div>
        );
    }
}
