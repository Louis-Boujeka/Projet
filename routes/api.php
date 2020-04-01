<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('stock/{data}','StockController@voir');


Route::get('categorie','CategorieController@index');
Route::get('categorie/edit/{id}','CategorieController@edit');
Route::get('produit','ProduitController@index');
Route::get('vente','VenteController@index');
Route::get('total','VenteController@total');
Route::post('categorie/store','CategorieController@store');
Route::put('categorie/update/{id}','CategorieController@update');
Route::get('produit/show/{id}','ProduitController@show');
Route::get('produit/quantite/{id}','ProduitController@quantite');
Route::post('produit/create','ProduitController@create');
Route::post('vente/create','VenteController@create');
Route::post('stock/create','StockController@create');
Route::delete('categorie/delete/{id}','CategorieController@destroy');