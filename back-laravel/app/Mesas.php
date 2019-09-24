<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mesas extends Model
{
    public $timestamps = false;
    protected $fillable = ['numeroDeMesa', 'estado'];
}
