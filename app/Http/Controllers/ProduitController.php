<?php

namespace App\Http\Controllers;

use App\Produit;
use App\Stock;
use App\Categorie;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    
        $ventes= Categorie::pluck('id');
        $pro= Produit::with('stock')->paginate(5);
        return $pro;
 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $produit = new Produit();
        $produit->designation=$request->designation;
        $produit->prixunitaire=$request->prixunitaire;
        $produit->categories_id=$request->categories_id;
        $produit->save();
        $r= Produit::max('id');
        $stock = new Stock;
        $stock->stock_final='0';
        $stock->stock_initial='0';
        $stock->produit_id= $r;
        $stock->save();

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $p=Stock::pluck('produit_id');
        $resultat  = Produit::where('categories_id',$id)->whereIn('id',$p)->get();
        return $resultat;
       // return $c;
    }
    public function quantite($id)
    {
        //
        $resultat  = Stock::where('produit_id',$id)->orderBy('created_at','DESC')->limit('1')->get();
        return $resultat;
       // return $c;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function edit(Produit $produit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Produit $produit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Produit  $produit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
