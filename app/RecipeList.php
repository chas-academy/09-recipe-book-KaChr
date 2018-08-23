<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeList extends Model
{
    protected $table = 'recipe_lists';

    // Default för recipes
    protected $attributes = [
        'recipes' => '[]'
    ];

    // Konverterar ('castar') vår JSON sträng till en array
    protected $casts = [
        'recipes' => 'array'
    ];

    // Styr vilka fält som behöver fyllas i
    protected $fillable = [
        'title', 'recipes', 'user_id',
    ];

    // Relation till user
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
