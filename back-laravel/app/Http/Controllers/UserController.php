<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      $rules = array(
        'name' => 'required',
        'user' => 'required',
        'password' =>'requided',
        'tipo' => 'required'
    );
    
        User::create([
            'name' => $request->input('name'),
            'user' => $request->input('user'),
            'password' => $request->input('password'),
            'permiso' => $request->input('tipo')
          ]);
    
          $response['message'] = "Guardo exitosamente";
          $response['success'] = true;
    
          return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $edit = User::find($id);
        return $edit->toArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
     
      // inserta los datos
      User::where('id',$request->input('id'))->
      update([
        'titulo' => $request->input('nombre'),
        'descripcion' => $request->input('descripcion'),
        'precio' => $request->input('precio')
      ]);

      // respesta de JSON
      $response['message'] = "Actualizo exitosamente";
      $response['success'] = true;

      return $response;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
