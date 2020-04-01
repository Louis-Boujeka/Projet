<?php

namespace App\Http\Controllers;
use App\Vente;
use App\Produit;
use App\User;
use Illuminate\Http\Request;

class VenteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function voir($data)
    {
        $b= User::where('email',$data);
        return $b;
    }

    public function index()
    {
        //
        $date1 = date('Y-m-d ')."00:00:00";
        $date2 = date('Y-m-d H:i:s');
        $ventes= Produit::pluck('id');
        $c=Vente::whereIn('produit_id',$ventes)->whereBetween('created_at',[$date1,$date2])->orderBy('updated_at','DESC')->with('produit')->paginate(4);
        return $c;
    }
    public function total()
    {
        //
        $date1 = date('Y-m-d ')."00:00:00";
        $date2 = date('Y-m-d H:i:s');
        $ventes= Produit::pluck('id');
        $c=Vente::whereIn('produit_id',$ventes)->whereBetween('created_at',[$date1,$date2])->with('produit')->get();
        return $c;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $ajoute_produit = new Vente();
        $ajoute_produit->operation=$request->operation;
        $ajoute_produit->quantite=$request->quantite;
        $ajoute_produit->produit_id=$request->produit_id;
        $ajoute_produit->save();
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
