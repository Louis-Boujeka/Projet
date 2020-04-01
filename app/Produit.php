<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    //
    protected $fillable =['designation','prixunitaire','categories_id'];


    public function stock(){
        return $this->hasMany('App\stock')->orderBy('created_at','DESC');
    } 

}
