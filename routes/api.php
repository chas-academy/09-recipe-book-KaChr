<?php

use Illuminate\Http\Request;

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
Route::group(['middleware' => 'api', 'prefix' => 'auth'], function() {
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');
    Route::post('register', 'AuthController@register');
    Route::get('user', 'AuthController@user');
    Route::get('refresh', 'AuthController@refresh');
    Route::post('recover', 'AuthController@recover');
});

Route::get('list', 'RecipeListController@index');
Route::get('list/{recipeList}', 'RecipeListController@show');
Route::post('list', 'RecipeListController@store');
Route::put('list/{recipeList}', 'RecipeListController@update');

Route::get('user/{user}/lists', 'RecipeListController@getListsByUser');
Route::delete('user/{userId}/lists/{recipeListId}', 'RecipeListController@destroy');