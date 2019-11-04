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
      $user = new User([
        'name' => $request->get('name'),
        'user' => $request->get('user'),
        'password' => $request->get('password'),
        'tipo' => $request->get('tipo'),
      ]);
      $user->save();


      return response()->json('Product Added Successfully.');
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
        'name' => $request->input('name'),
        'user' => $request->input('user'),
        'password' => $request->input('password'),
        'tipo' => $request->input('tipo')
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

    }
}
