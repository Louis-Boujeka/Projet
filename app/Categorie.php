<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    //
    protected $fillable =['designationcategorie','description'];    
    public function produit(){
        return  $this->belongsToMany('App\Produit');
    }
}
