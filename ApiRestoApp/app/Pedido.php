<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = [
        'idMesa',
    ];
    protected $casts = [
        'productos' => 'array'
    ];
}
