import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import AjouterProduit from './AjouterProduit';
import NouvelleCategorie from './NouvelleCategorie';
import Edit from './Edit';
import Appro from './Appro';
export default class Produits extends Component {
    render(){
        return (
                <div >
                    <Link to="/AjouterProduit" className="btn btn-primary mt-4 mr-3">Ajouter Produit</Link>
                    <Link to="/NouvelleCategorie" className="btn btn-primary mt-4 ml-5">Ajouter Une Categorie</Link>
                    <Link to="/Appro" className="btn btn-primary mt-4 ml-5">Approvissionement</Link>
                    <Route exact path="/NouvelleCategorie" component={NouvelleCategorie}/>
                    <Route exact path="/AjouterProduit" component={AjouterProduit}/>
                    <Route exact path="/Appro" component={Appro}/>
                    <Route exact path="/NouvelleCategorie/Edit/:id" component={Edit}/>
                </div>
        );
    }
}
