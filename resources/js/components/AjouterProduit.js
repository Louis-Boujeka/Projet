import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import SuccesMessage from './SuccesMessage';
import ErrorsMessage from './ErrorsMessage';
export default class AjouterProduit extends Component {

    constructor()
    {
        super();
      
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handlePageChange=this.handlePageChange.bind(this);
        this.state={
            designation:'',
            categorie_id:'',
            prixunitaire:'',
            categories:[],
            produits : [],
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed : 3,
            alert_message:'' 
        };
    }
    
    controleForm(event){
        const target = event.target;
        const value = target.value ;
        const name = target.name;
        this.setState({
            [name]: value
          });
    }
 
   
    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/categorie')
        .then(response=>{
            this.setState({categories:response.data})
        });
        axios.get('http://127.0.0.1:8000/api/produit')
        .then(response=>{
            this.setState({
                produits:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
                
            });
        })
        .catch(function (error) {
            console.log(error);
          });
    }

    handlePageChange(pageNumber) {
       // this.setState({activePage: pageNumber});
       axios.get('http://127.0.0.1:8000/api/produit?page='+pageNumber)
        .then(response=>{
            this.setState({
                produits:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page
            });
        })
      }

    onSubmit(e)
    {
        e.preventDefault();
        const produit={
            designation: this.state.designation,
            categories_id:this.state.categories_id,
            prixunitaire:this.state.prixunitaire
        }
       if(produit.designation =='' || produit.categorie_id==''|| produit.prixunitaire=='')
       {
            alert('Veuillez remplir tous les Champs')
       }else{
        this.setState({
            designation:'',
            categories_id:'',
            prixunitaire:''
        });

        axios.post('http://127.0.0.1:8000/api/produit/create',produit)
        .then(response=>{
            this.setState({alert_message:"success" })
            setTimeout(() => this.setState({alert_message:''}), 3000);

        }).catch(error=>{
            this.setState({alert_message:"error"})
            setTimeout(() => this.setState({alert_message:''}), 3000);
        });
       }
    }

    affiche()
    {
        return this.state.produits.map((produit)=>{
            return (
                <tr key={produit.id}>
                <td>{produit.designation}</td>
                <td>{produit.prixunitaire}</td>
                <td>{produit.stock[0].stock_final}</td>
                <td>
                {
                this.state.categories.map(categorie=>{
                    if(produit.categories_id==categorie.id)
                    {return (
                        categorie.designationcategorie
                    )}
                })
            }
                </td>
                <td> <Link to={`/AjouterProduit/EditProduit/${produit.id}`} role='button' className='btn btn-primary'>Editer </Link></td>
                </tr>
            )
        })
    }
    

    render(){
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
                            value={this.state.designation ? this.state.designation: ''}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="">Categorie</label>
                            <select className="custom-select categorie"
                            name='categories_id' 
                            value={this.state.categories_id}
                            onChange={this.controleForm}
                            required>
                                <option>choisir une categorie</option>
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
                            value={this.state.prixunitaire}
                            onChange={this.controleForm}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Ajouter Produit</button>
                    
                </form>
            </div>
            <div className='col-md-8'>
                <div >
                    <table className="table table-stripet mt-4">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Nom Produit</th>
                            <th scope="col">Prix Unitaire</th>
                            <th scope="col">Quantité en stock</th>
                            <th scope="col">Categories</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.affiche()}
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
