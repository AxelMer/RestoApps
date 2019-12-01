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

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    
    }

    public function logout (Request $request) {

        $token = $request->user()->token();
        $token->revoke();
    
        $response = 'You have been succesfully logged out!';
        return response($response, 200);
    
    }
    protected function respondWithToken($token)
    {
        return response()->json([
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

