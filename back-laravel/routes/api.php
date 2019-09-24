<?php
/*
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});


Route::get('/', function(){
    return ('LOGIN');
});

Route::get('/Panel', function(){
    return ('Panel');
});
//Rutas de Administracion de cuentas
//Traemos los datos de las cuentas creadas
Route::get('/Adm-cuenta', function(){
    return ('Administramos las cuentas');
});
//Vemos la cuenta que coincide con el id
Route::get('/Admin-cuenta/{id}', function(){
    return ('informacion de cuenta');
});
//Actualiza la cuenta existente que coincida con el id
Route::put('/Admin-cuenta/edit/{id}', function(){
    return ('Modificamos cuenta');
});
//Creamos una cuenta nueva y lo insertamos a la base de datos
Route::post('/Adm-cuenta/new', function(){
    return ('Creamos un nuevo usuario');
});
Route::delete('/Adm-cuenta/{id}', function(){
    return ('Borramos una cuenta existente');
});

