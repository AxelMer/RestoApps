<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class menus extends Model
{
    public $timestamps = false;
    protected $fillable = ['productos', 'precio', 'categoria'];
}

