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

Route::apiResource('user', 'UserController');
//Route::post('login', 'UserController@login');
Route::apiResource('productos', 'ProductoController');
Route::apiResource('pedidos', 'PedidoController');
Route::apiResource('mesas', 'MesaController');
/*Route::middleware('auth:api')->group(function () {
    Route::apiResource('productos', 'ProductoController');
    Route::apiResource('pedidos', 'PedidoController');
    Route::apiResource('mesas', 'MesaController');
});*/