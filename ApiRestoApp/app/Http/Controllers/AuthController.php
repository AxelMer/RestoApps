<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use JWTFactory;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }
    public function login (Request $request) {
        $credentials = request(['usuario', 'password']);
        $verify = User::where('usuario','=', request(['usuario']))->get('credencial');
        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        return $this->respondWithToken($token, $verify);
    }

    public function logout (Request $request) {
            $token = $request->header("Authorization");
            // Invalidate the token
            try {
                JWTAuth::invalidate(JWTAuth::getToken());
                    $response['message'] = "Has cerra la sesion";
                    $response['success'] = true;
              
                    return $response;
            } catch (JWTException $e) {
                // something went wrong whilst attempting to encode the token
                return response()->json([
                "status" => "error", 
                "message" => "Failed to logout, please try again."
                ], 500);
            }
    }
    protected function respondWithToken($token , $verify)
    {
        return response()->json([
            'perfil' => $verify,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function guard()
    {
        return Auth::guard('api');
    }
}

