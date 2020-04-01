import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from 'react-js-pagination';

export default class Listervente extends Component {
    constructor()
    {
        super();
        this.state={
            ventes:[],
            totals:[],
            g:[],
            h:'',
            activePage:1,
            itemsCountPerPage:1,
            totalItemsCount:1,
            pageRangeDisplayed : 3 

        }
    }
    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/vente')
        .then(response=>{
            this.setState({
                ventes:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page 
            });
        });
        axios.get('http://127.0.0.1:8000/api/total')
        .then(response=>{
            this.setState({
                totals:response.data
            });
        });
    }
    
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
       // this.setState({activePage: pageNumber});
       axios.get('http://127.0.0.1:8000/api/vente?page='+pageNumber)
        .then(response=>{
            this.setState({
                ventes:response.data.data,
                itemsCountPerPage:response.data.per_page,
                totalItemsCount:response.data.total,
                activePage:response.data.current_page 
            });
        })
      }

    render(){
        return (
            <div >
                    <table className="table mt-4">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Nom Produit</th>
                            <th scope="col">Quantité</th>
                            <th scope="col">Prix unitaire</th>
                            <th scope="col">Prix total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.ventes.map(vente=>{
                                const total = [];
                                const f=new Array();
                                if(this.state.ventes){
                                    this.state.g= this.state.totals;
                                }
                                for(var i=0; i<this.state.g.length; i++)
                                {
                                    f[i]=[this.state.g[i].quantite*this.state.g[i].produit.prixunitaire];
                                }
                                this.state.h=eval(f.join("+"))
                                return (
                                    <tr key={vente.id}>
                                        <td>{vente.produit.designation}</td>
                                        <td>{vente.quantite}</td>
                                        <td>{vente.produit.prixunitaire}</td>
                                        <td>{(vente.produit.prixunitaire)*(vente.quantite)}</td>
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
                    <div className="container-fluid font-weight-bold">
                        <div className='row p-3 mb-2 bg-info text-white text-uppercase'>
                            <div className='col-md-8'>Total Des Ventes Journalières</div>
                            <div className='col-md-4'>
                                {this.state.h != '' ? this.state.h : 'pas de vente' }
                            </div>
                        </div>  
                    </div>     
            </div>
        );
    }
}
