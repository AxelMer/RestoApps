<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
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
    public function login (Request $request) {
      $request->validate([
        'usuario'       => 'required|string',
        'password'    => 'required|string',
        'remember_me' => 'boolean',
    ]);
      $credentials = request(['usuario', 'password']);
      if (!Auth::attempt($credentials)) {
          return response()->json([
              'message' => 'Unauthorized'], 401);
      }
      $user = $request->user();
      $tokenResult = $user->createToken('Personal Access Token');
      $token = $tokenResult->token;
      if ($request->remember_me) {
          $token->expires_at = Carbon::now()->addWeeks(1);
      }
      $token->save();
      return response()->json([
          'access_token' => $tokenResult->accessToken,
          'token_type'   => 'Bearer',
          'expires_at'   => Carbon::parse(
              $tokenResult->token->expires_at)
                  ->toDateTimeString(),
      ]);
    }
    public function logout (Request $request) {

        $token = $request->user()->token();
        $token->revoke();

        $response = 'You have been succesfully logged out!';
        return response($response, 200);

    }
    public function store(Request $request){

          $user = User::create([
            'nombre' => $request->input('nombre'),
            'usuario' => $request->input('usuario'),
            'password' => $request->input('password'),
            'credencial' => $request->input('credencial')
          ]);
   
          $token = $user->createToken('restoapp')->accessToken;
          $response['message'] = "Guardo exitosamente";
          $response['success'] = true;
          $response['token'] = response()->json(['token' => $token], 200);
          return $response;

    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
      $input = $request->all();
      $user = User::findorfail($id);
      $updateNow = $user->update($input);
      $response['message'] = "Se han actualizado los datos";
      $response['success'] = true;

      return $response;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
       // Eliminar
       User::destroy($id);
      // respesta de JSON
      $response['message'] = "Elimino exitosamente";
      $response['success'] = true;

      return $response;
    }
      /**
     * Returns Authenticated User Details
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
  }

    
?>
