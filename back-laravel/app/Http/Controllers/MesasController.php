<?php

namespace App\Http\Controllers;

use App\mesas;
use Illuminate\Http\Request;

class MesasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        \Session::flush();
        return Mesas::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        User::create([
            'capacidad' => $request->input('name'),
            'estado' => $request->input('user'),
          ]);
    
          $response['message'] = "Guardo exitosamente";
          $response['success'] = true;
    
          return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\mesas  $mesas
     * @return \Illuminate\Http\Response
     */
    public function show(mesas $mesas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\mesas  $mesas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, mesas $mesas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\mesas  $mesas
     * @return \Illuminate\Http\Response
     */
    public function destroy(mesas $mesas)
    {
        //
    }
}
?>