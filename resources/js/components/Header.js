import React, { Component } from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Produits from './Produits';
import Edit from './Edit';
import EditProduit from './EditProduit'
import Error404 from './erreur4040';
import Autres from './Autres'
export default class Header extends Component {
    render(){
        return ( 
                <div >
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Ventes</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/Produits">Produits</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/Autres">Autres..</Link>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        </div>
                </nav>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Produits" component={Produits}/>
                    <Route exact path="/Autres" component={Autres}/>
                    <Route exact path="/NouvelleCategorie" component={Produits}/>
                    <Route exact path="/Appro" component={Produits}/>
                    <Route exact path="/AjouterProduit" component={Produits}/>
                    <Route exact path="/NouvelleCategorie/Edit/:id" component={Edit}/>
                    <Route exact path="/AjouterProduit/EditProduit/:id" component={EditProduit}/>
                    <Route exact path="/*" component={Error404}/>
                </Switch>
                </div>
        );
    }
}
