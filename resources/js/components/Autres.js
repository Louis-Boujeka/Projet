import React, { Component } from 'react';
import ErrorsMessag from './ErrorsMessage';

export default class Autres extends Component {
    constructor()
    {
        super();
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            date1:''+'00:00',
            date2:''+'23:59',
            ventes:[],
            alert_message:'',
            categories:[],
            g:[],
            h:'',

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
    onSubmit(e)
    {
        e.preventDefault();
        const lesdate={
            date1:this.state.date1+' 00:00',
            date2:this.state.date2+' 23:59'
        }
        if(lesdate.date2<lesdate.date1 || lesdate.date1=='00:00 00:00' || lesdate.date2=='23:59 23:59' )
        {
            alert('Verifier que les intervalles de dates sont correctes ')
        }else{
            axios.post('http://127.0.0.1:8000/api/vente1',lesdate)
            .then(response=>{
                this.setState({
                    ventes:response.data,
                });
            })
        }
        
    }

    affiche()
    {
        return (
            this.state.categories.map(categorie=>{
                return(
                    <div key={categorie.id}>
                        <div className='col-md-2 bg-success mt-2'>{categorie.designationcategorie}</div>
                        {
                            this.state.ventes.map(vente=>{
                                const total = [];
                                const f=new Array();
                                if(this.state.ventes){
                                    this.state.g= this.state.ventes;
                                }
                                for(var i=0; i<this.state.g.length; i++)
                                {
                                    f[i]=[this.state.g[i].quantite*this.state.g[i].produit.prixunitaire];
                                }
                                this.state.h=eval(f.join("+"))
                                
                                
                                if(categorie.id==vente.produit.categories_id)
                                {
                                return(
                                    <div className='row md-8' key={vente.id}>
                                        <div className='col-md-2'>
                                            {vente.produit.designation}
                                        </div>
                                        <div className='col-md-2'>
                                            {vente.quantite}
                                        </div>
                                        <div className='col-md-2'>
                                            {vente.produit.prixunitaire}
                                        </div>
                                        <div className='col-md-2'>
                                            {vente.produit.prixunitaire*vente.quantite}
                                        </div>
                                    </div>
                                )}
                            })
                        }
                           
                    </div>
                )
                
            })
        )
    }
    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/categorie')
        .then(response=>{
            this.setState({categories:response.data})
        });
    }
    render(){
        return (
                <div className='row mt-4 container'>
                    <div className='col-md-12'>
                    <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-row md-12">
                        <div className="col-md-6 mb-3">
                            <label >Date du</label>
                            <input type="date" name='date1' 
                             value={this.state.date1}
                             onChange={this.controleForm}
                            className="form-control" required/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label >Date Au</label>
                            <input type="date" name='date2'  placeholder='date'
                             
                             value={this.state.date2}
                             onChange={this.controleForm}
                            className="form-control" required/>
                        </div>
                    </div>
                <button className="btn btn-primary" type="submit">Afficher</button>
                    
                </form>
                <hr/>
                    <div className='row md-8 container-fluid font-weight-bold ' >
                        <div className='col-md-2 bg-info'>
                            designation
                        </div>
                        <div className='col-md-2 bg-info' >
                            Quantité
                        </div>
                        <div className='col-md-2 bg-info'>
                            Prix Unitaire
                        </div>
                        <div className='col-md-2 bg-info'>
                            Prix total
                        </div>
                    </div>
                    {
                        this.affiche()
                    }
                                    <div className="container-fluid font-weight-bold mt-4">
                                        <div className='row p-0 mb-2  text-white text-uppercase'>
                                            <div className='col-md-5 bg-info'>Montant Total de la Vente</div>
                                            <div className='col-md-3 bg-info'>
                                                {this.state.h != '' ? this.state.h : 'pas de vente'}
                                            </div>
                                        </div>  
                                    </div> 
                </div>
                </div>
        );
    }
}


