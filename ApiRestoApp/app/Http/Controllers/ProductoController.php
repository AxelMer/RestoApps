<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Producto::all();
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Producto::create([
            'articulo' => $request->input('articulo'),
            'categoria' => $request->input('categoria'),
            'precio' => $request->input('precio'),
            'cantidad' => $request->input('cantidad')
          ]);
    
          $response['message'] = "Guardo exitosamente";
          $response['success'] = true;
    
          return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $input = $request->all();
        $product = Producto::findorfail($id);
        $updateNow = $product->update($input);
        $response['message'] = "Se han actualizado los datos";
        $response['success'] = true;
  
        return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $id)
    {
               // Eliminar
       Producto::destroy($id);
       // respesta de JSON
       $response['message'] = "Elimino exitosamente";
       $response['success'] = true;
 
       return $response;
    }
}
