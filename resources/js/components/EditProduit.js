import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import SuccesMessage from './SuccesMessage';
import ErrorsMessage from './ErrorsMessage';
import {Redirect} from 'react-router-dom'

export default class AjouterProduit extends Component {

    constructor(props)
    {
        super(props);
      
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            designation:'',
            categories_id:'',
            prixunitaire:'',
            alert_message:'',
            categories:[],
            statut:false 
        };
    }
    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/produit/edit/'+this.props.match.params.id)
        .then(response=>{
            this.setState({
                designation:response.data.designation,
                categories_id:response.data.categories_id,
                prixunitaire:response.data.prixunitaire
            })
        });

        axios.get('http://127.0.0.1:8000/api/categorie')
        .then(response=>{
            this.setState({categories:response.data})
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
 

    onSubmit(e)
    {
        e.preventDefault();
        const produit={
            designation: this.state.designation,
            categories_id:this.state.categories_id,
            prixunitaire:this.state.prixunitaire
        }

        axios.put('http://127.0.0.1:8000/api/produit/update/'+this.props.match.params.id, produit)
        .then(response=>{});
        this.setState({
            designation:'',
            categories_id:'',
            prixunitaire:'',
            statut:true 
        }) 

    }

    render(){
        if(this.state.statut)
        {
            return <Redirect to='/AjouterProduit'/>
        }
        return (
            <div className='row'>
                <div className='col-md-4'>
                    <br/>
                {this.state.alert_message == "success" ? <SuccesMessage message='Produit Ajouter avec success'/> : null }
                {this.state.alert_message == "error" ? <ErrorsMessage message='Echec ! Veillez réessaye'/> : null }
                <form className="needs-validation mt-4" onSubmit={this.onSubmit} >
                    <div className='form-row'>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="" className="h4">Nom Complet du Produit</label>
                            <input type="text" className='form-control'
                            name='designation'  
                            value={this.state.designation ? this.state.designation:''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="">Categorie</label>
                            <select className="custom-select categorie"
                            name='categories_id' 
                            value={this.state.categories_id }
                            onChange={this.controleForm}
                            required>
                                 {
                                    this.state.categories.map(categorie=>{
                                        return (
                                            <option key={categorie.id}  value={categorie.id}>{categorie.designationcategorie}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="">Prix Unitaire</label>
                            <input type="number"  className="form-control"
                            name='prixunitaire' 
                            value={this.state.prixunitaire ? this.state.prixunitaire : ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Modifier Produit</button>
                </form>
            </div>
            </div>
        );
    }
}
