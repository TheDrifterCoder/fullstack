<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{

    // esta funcion retorna los errores de validacion junto con un codigo de response
    public function sendError($customErrorMessage, $errorMessages = [], $code = 404){
        $response = [
            'success' => false,
            'message' => $customErrorMessage
        ];

        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }


    // esta funcion retorna una respuesta exitosa, junto con el codigo 200
    public function sendResponse($message, $result_data){
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $result_data
        ];

        return response()->json($response, 200);
    }

    
}
