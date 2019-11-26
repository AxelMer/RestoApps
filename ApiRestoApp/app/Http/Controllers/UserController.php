<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class UserController extends Controller
{
  public function __construct()
  {
      $this->middleware('jwt.verify', ['except' => ['register', 'authenticate', 'store']]);
  }

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
    public function authenticate(Request $request)
    {
        $credentials = $request->only('usuario', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credencial Invalidas'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        return response()->json(compact('token'));
    }
    /*public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
            }
            } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                    return response()->json(['token_expired'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                    return response()->json(['token_invalid'], $e->getStatusCode());
            } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
                    return response()->json(['token_absent'], $e->getStatusCode());
            }
            return response()->json(compact('user'));
    }*/
    public function register(Request $request)
    {
      $input = $request->only('nombre','usuario', 'password','crdencial');
      User::create($input);

    }
    public function store(Request $request){
        User::create([
            'nombre' => $request->input('nombre'),
            'usuario' => $request->input('usuario'),
            'password' =>  \Hash::make($request->input('password')) ,
            'credencial' => $request->input('credencial')
          ]);
    
          $response['message'] = "Guardo exitosamente";
          $response['success'] = true;
    
          return $response;
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
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
