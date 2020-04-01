import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import SuccesMessage from './SuccesMessage';
import ErrorsMessage from './ErrorsMessage';

export default class NouvelleCategorie extends Component {
    constructor(props)
    {
        super(props);
        this.controleForm=this.controleForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            categorie_nom:'',
            description:'',
            alert_message:'',
            alert_message_del:''
        }
        this.state={
            categories:[]
        }
    }
    componentDidMount()
    {
        axios.get('http://127.0.0.1:8000/api/categorie')
        .then(response=>{
            this.setState({categories:response.data})
        });
            this.setState({alert_message:''})
            this.setState({alert_message_del:''})
          
    }


    onDelet(categorie_id,e)
    {
        e.preventDefault();
        axios.delete('http://127.0.0.1:8000/api/categorie/delete/'+categorie_id)
        .then(response=>{
            var categories = this.state.categories;
            for(var i=0;i<categories.length;i++)
            {
                if(categories[i].id==categorie_id)
                {
                    categories.splice(i,1);
                    this.setState({categories:categories});
                }
            }
            this.setState({
                alert_message_del:"success"
            })
            setTimeout(() => this.setState({alert_message_del:''}), 3000)
            .catch(error=>{
                this.setState({alert_message_del:"error"})
                setTimeout(() => this.setState({alert_message_del:''}), 3000);
            });
            
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
        if(!categorie.categorie_nom || !categorie.description)
        {
            alert('Veuillez remplir Correctement tous les champs')
        }else{
            this.setState({
                categorie_nom:'',
                description:'' 
            })
            axios.post('http://127.0.0.1:8000/api/categorie/store',categorie)
            .then(response=>{
                this.setState({alert_message:'success'})
                setTimeout(() => this.setState({alert_message:''}), 3000);
    
                this.setState({alert_message:'success'})
            }).catch(error=>{
                this.setState({alert_message:"error"})
            });
            
        }
    }

    render(){
        return (
            <div className="row">
                <div className='col-md-4 mt-4'>
                    <br/>
                {this.state.alert_message == "success" ? <SuccesMessage message='Categorie Ajouter avec success' /> : null }
                {this.state.alert_message == "error" ? <ErrorsMessage message='Echec ! veillez réesayer'/> : null }
                {this.state.alert_message_del == "success" ? <SuccesMessage message='Categorie Supprimer avec success' /> : null }
                {this.state.alert_message_del == "error" ? <ErrorsMessage message='Echec Suppression de la Categorie! veillez réesayer'/> : null }
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
                <div className='col-md-8 mt-4'>
                    <h3>Categories Disponible</h3>

                    <div >
                    <table className="table mt-4">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">Nom Categorie</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.categories.map(categorie=>{
                                return (
                                    <tr key={categorie.id}>
                                    <td>{categorie.designationcategorie}</td>
                                    <td>{categorie.description}</td>
                                    <td>
                                        <Link to={`/NouvelleCategorie/edit/${categorie.id}`} className='btn btn-primary'>Editer </Link> | 
                                        <a href='#' onClick={this.onDelet.bind(this,categorie.id)} className='btn btn-danger'> Suprimer</a> </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>           
            </div>
                    
                </div>
            </div>
        );
    }
}
