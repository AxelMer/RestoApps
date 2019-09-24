<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pedidos extends Model
{
   public $timestamps = false;
   protected $fillable = [
      'descripcion', 'creado'
   ];
}
