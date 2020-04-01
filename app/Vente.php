<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vente extends Model
{
    //
    protected $fillable =['operation','quantite','produit_id'];
    
    public function produit(){
        return $this->belongsTo('App\Produit');
    }
}
