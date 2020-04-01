<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    //
    protected $fillable =['stack_initial','stock_final'];
    public function produit(){
        return $this->belongsTo('App\Produit');
    } 
}
