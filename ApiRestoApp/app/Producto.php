<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = [
        'articulo', 'precio', 'categoria','cantidad',
    ];

}
