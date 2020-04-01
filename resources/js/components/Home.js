import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Listervente from './Listervente';
import SuccesMessage from './SuccesMessage';
import ErrorsMessag from './ErrorsMessage';

export default class Home extends Component {
    constructor()
    {
        super();
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            categories:[],
            produits:[],
            showquantite:[],
            operation:'vente',
            produit_id:'',
            quantite:'',
            categories_id:'',
            alert_message:'', 
            message:'', 
            alert_message_appro:'' 
        }
    }
 
    controleForm(event){
        const target = event.target;
        const value = target.value ;
        const name = target.name;
        this.setState({
            [name]: value
          });
          if(name=='categorie_id')
          {
            axios.get('http://127.0.0.1:8000/api/produit/show/'+value)
            .then(response=>{
                this.setState({produits:response.data})
            })
            .catch(function (error) {
                console.log(error);
              });
          }
          if(name=='produit_id' && value!='')
          {
            axios.get('http://127.0.0.1:8000/api/produit/quantite/'+value)
            .then(response=>{
                this.setState({showquantite:response.data})
            })
            .catch(function (error) {
                console.log(error);
              });
          }

    }

    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/categorie')
        .then(response=>{
            this.setState({categories:response.data})
        });
    }
    onSubmit(e)
    {
        e.preventDefault();
        const ajouter={
            operation:'vente',
            produit_id:this.state.produit_id,
            quantite:this.state.quantite,
        }
        //tester le stock avant la vente
       if(ajouter.produit_id =='' || ajouter.quantite=='')
       {
            alert('Veuillez remplir tous les champs');
       }else{
        if(ajouter.quantite > parseFloat(e.target.stock_final.value) && ajouter.operation=='vente'){
            this.setState({alert_message:"error",message:'stock limité le stock disponible est de: '+e.target.stock_final.value})
            setTimeout(() => this.setState({alert_message:''}), 5000);
        }else{
            this.setState({
                produit_id:'',
                operation:'',
                quantite:'',
                categorie_id:'',
                quantite:'',
                operation:'',
                message:''
    
            });
            // choix de l'opération a menée 
                //ajout d'une vente
             axios.post('http://127.0.0.1:8000/api/vente/create',ajouter)
             .then(response=>{
                this.setState({alert_message:"success",message:'Vente réaliser avec success'})
                setTimeout(() => this.setState({alert_message:''}), 3000);
            }).catch(error=>{
                this.setState({alert_message:"error",message:'Oups ! Erreur réessayes SVP '})
            });
               const approvisionnement={
                 stock_initial : e.target.stock_final.value,
                 stock_final :parseFloat(e.target.stock_final.value)-parseFloat(ajouter.quantite),
                operation:'vente',
                produit_id :ajouter.produit_id
             }
             this.setState({
                 stock_initial:'',
                 stock_final:''
     
             });
     
             axios.post('http://127.0.0.1:8000/api/stock/create',approvisionnement)
              .then(response=>{})
              .catch(function (error) {
              console.log(error);
            });
        }
       }
    }

    render(){
        return (
            <div className='row mt-4'>
                <div className='col-md-4'>
                <br/>
                {this.state.alert_message == "success" ? <SuccesMessage message={this.state.message} /> : null }
                {this.state.alert_message == "error" ? <ErrorsMessag message={this.state.message} /> : null }
               <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label >Choix de la category</label>
                            <select className="custom-select" name='categorie_id' 
                            value={this.state.categorie_id}
                            onChange={this.controleForm}
                            required>
                                <option>choix de la categorie</option>
                                {
                                    this.state.categories.map(categorie=>{
                                        
                                        return (
                                            <option value={categorie.id} key={categorie.id}>{categorie.designationcategorie}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label >Article à vendre</label>
                            <select className="custom-select" id="" name='produit_id'
                            value={this.state.produit_id}
                            onChange={this.controleForm}
                            >
                                <option value=''>choisir</option>
                            {
                                this.state.produits.map(produit=>{
                                    return (
                                        <option key={produit.id} value={produit.id}>{produit.designation}</option>
                                    )
                                })
                            }
                            </select>
                    </div>
                   
                    </div>
                        {
                            this.state.showquantite.map(showquantites=>{
                                return (
                                    <div key={showquantites.id}>
                                        
                                    <input   name='stock_initial' className="form-control" type='hidden' 
                                    value={showquantites.stock_initial}
                                    onChange={this.controleForm}/>
                                    
                                    <input  name='stock_final'  className="form-control" type='hidden' 
                                    value={showquantites.stock_final}
                                    onChange={this.controleForm}/>
                                    </div>
                                )
                            })
                        }
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label >Quantité</label>
                            <input type="number" name='quantite' min="1"
                            value={this.state.quantite}
                            onChange={this.controleForm}
                            className="form-control"/>
                        </div>
                    </div>
                <button className="btn btn-primary" type="submit">Submit form</button>
                    
                </form>
                </div>
                <div className='col-md-8'>
                    <h3>liste des ventes</h3>
                    <Listervente/>
                </div>
            </div>
        );
    }
}
