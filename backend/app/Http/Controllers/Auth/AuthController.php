<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Shared\BaseController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function login(Request $request){
        if(Auth::attempt([
            'login_user' => $request->login_user,
            'password' => $request->password
        ])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('auth_token')->plainTextToken;
            $success['name'] = $user->name . " " . $user->lastname;

            return $this->sendResponse("Usuario loggeado correctamente", $success);              
        } else  {
            return $this->sendError("No autorizado", ['error' => 'No autorizado']);             
        }
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        // auth()->user()->tokens()->delete();
        return $this->sendResponse("El usuario ha cerrado sesión correctamente.", 200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'lastname' => 'required|min:8|max:10',
            'login_user' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password'
        ]);

        if($validator->fails()){
            return $this->sendError('Error de validación', $validator->errors());
        }

        $validatedData = $request->all();
        $validatedData['password'] = bcrypt($validatedData['password']);
        $user = User::create($validatedData);

        $success['token'] = $user->createToken('auth_token')->plainTextToken;
        $success['user'] = $user->name . " " . $user->lastname;

        return $this->sendResponse($success, "Usuario registrado correctamente.");
    }

    public function update(){
        
    }

    public function delete(){
        
    }

}
