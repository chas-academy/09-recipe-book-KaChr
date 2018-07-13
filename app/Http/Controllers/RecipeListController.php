<?php

namespace App\Http\Controllers;

use App\RecipeList;
use App\User;

use Illuminate\Http\Request;

class RecipeListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipeLists = RecipeList::all();

        return response([
            'status' => 'success',
            'data' => $recipeLists
        ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $list = new RecipeList;
        $list->title = $request->title;
        $list->user_id = auth()->user()->id;
        $list->save();

        return response ([ 
            'status' => 'success',
            'list' => $list
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  Integer $listId
     * @return \Illuminate\Http\Response
     */
    public function show($listId)
    {
        $recipeList = RecipeList::findOrFail($listId);

        return response([
            'status' => 'success',
            'data' => $recipeList
        ]);
    }

    public function getListsByUser($userId)
    {
        $userRecipeLists = User::findOrFail($userId)->lists()->get();
        
        return response([
            'status' => 'success',
            'data' => $userRecipeLists
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $recipeListId)
    {
        $data = $request->all();
        $list = RecipeList::findOrFail($recipeListId);

        if ($request->filled('recipe_id')) {
            $listRecipes = $list->recipes;
            $isAlreadyInArray = in_array($data['recipe_id'], $list->recipes);
            
            if ($isAlreadyInArray === true) {
                foreach (array_keys($listRecipes, $data['recipe_id']) as $key) {
                    unset($listRecipes[$key]);
                }
            } else {
                $listRecipes[] = $data['recipe_id'];
            }


            $data['recipe_id'] === "null" ?
                $list->recipes = []
              : $list->recipes = array_values($listRecipes);

            $list->fill($data);
            $list->save();
        } else if ($request->filled('title')) {
            $list->fill($data);
            $list->save();
        } else {
            return response([
                'status' => 'error',
                'message' => 'Nothing to update'
            ]);
        }
        return response([
            'status' => 'success',
            'message' => 'The list was successfully updated.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $recipeListId) 
    {
        $list = RecipeList::findOrFail($recipeListId);
        $list->delete();
    
        return response([
            'status' => 'success',
            'message' => 'The list was successfully removed.'
        ]);
    }
}
