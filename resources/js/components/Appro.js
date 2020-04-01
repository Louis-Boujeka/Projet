import React, { Component } from 'react';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import ReactDOM from 'react-dom';
import Listervente from './Listervente';
import SuccesMessage from './SuccesMessage';
import ErrorsMessag from './ErrorsMessage';
import Moment from 'moment';

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
            operation:'appro',
            produit_id:'',
            quantite:'',
            categories_id:'',
            alert_message:'', 
            afficheAppro:[],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed : 3  
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
            },()=>console.log(response))
            .catch(function (error) {
                console.log(error);
              });
          }
          if(name=='produit_id')
          {
            axios.get('http://127.0.0.1:8000/api/produit/quantite/'+value)
            .then(response=>{
                this.setState({showquantite:response.data})
            },()=>console.log(response))
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
        axios.get('http://127.0.0.1:8000/api/voir_appro')
        .then(response=>{
            this.setState({
                afficheAppro:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page 
            }); 
        })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
       // this.setState({activePage: pageNumber});
       axios.get('http://127.0.0.1:8000/api/voir_appro?page='+pageNumber)
        .then(response=>{
            this.setState({
                afficheAppro:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page 
            });
        })
      }
    onSubmit(e)
    {
        e.preventDefault();
        const ajouter={
            operation:this.state.operation,
            produit_id:this.state.produit_id,
            quantite:this.state.quantite,
        }
        //tester le stock avant la vente
             if(ajouter.operation=='' || ajouter.produit_id=='' || ajouter.quantite=='')
             {
                alert('aucun chams ne doit etre vide')
             }else{
                const approvisionnement={
                    stock_initial : e.target.stock_final.value,
                    stock_final :parseFloat(e.target.stock_final.value)+parseFloat(ajouter.quantite),
                    produit_id :ajouter.produit_id,
                    operation:'appro',
                }
                axios.post('http://127.0.0.1:8000/api/stock/create',approvisionnement)
                 .then(response=>{
                    this.setState({alert_message_appro:"success"})
                    setTimeout(() => this.setState({alert_message_appro:''}), 3000);
                }).catch(error=>{
                    this.setState({alert_message_appro:"error"})
                });
                this.setState({
                    produit_id:'',
                    operation:'',
                    quantite:'',
                    categorie_id:'',
                    quantite:'',
                    stock_initial:'',
                     stock_final:''
                });
            
             }
        }
    render(){
        return (
            <div>
                <div className='row mt-4'>
                    <div className='col-md-12 text-center'>
                    <p className='h2'> Approvisionnement Des Produits</p>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-md-4'>
                    <br/>
                    {this.state.alert_message == "success" ? <SuccesMessage message='Vente enregistrer avec success'/> : null }
                    {this.state.alert_message == "error" ? <ErrorsMessage message='Oups ! Erreur verifier et réessayes SVP '/> : null }
                    {this.state.alert_message_appro == "success" ? <SuccesMessage message='Approvisionnement enregistrer avec success'/> : null }
                    {this.state.alert_message_appro == "error" ? <ErrorsMessag message='Echec Approvisionnement Echoué'/> : null }
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
                        <table className="table mt-4">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">Nom Produit</th>
                                <th scope="col">Quantité</th>
                                <th scope="col">Prix unitaire</th>
                                <th scope="col">Date opération</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.afficheAppro.map(affiche=>{
                                    return (
                                        <tr key={affiche.id}>
                                            <td>{affiche.produit.designation}</td>
                                            <td>{parseFloat(affiche.stock_final) -parseFloat(affiche.stock_initial)}</td>
                                            <td>{affiche.produit.prixunitaire}</td>
                                            <td>{Moment(affiche.created_at).format('YYYY/MM/DD HH:mm')}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            
                        </table>
                            <div className="d-flex justify-content-center">
                                <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={this.state.pageRangeDisplayed}
                                onChange={this.handlePageChange.bind(this)}
                                itemClass='page-item'
                                linkClass='page-link'
                                />
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
