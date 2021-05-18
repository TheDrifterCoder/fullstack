<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Shared\BaseController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    public function index()
    {
        $pagination = 50;
        $model = new User();
        $expected_data = $model->getUsers($pagination);

        $users = $expected_data;
        return $this->sendResponse('Lista de usuarios', UserResource::collection($users));
    }

    public function filter($filter){
        $model = new User();
        $expected_data = $model->getUsersFiltered($filter);

        $users = $expected_data;
        return $this->sendResponse('Lista de usuarios', UserResource::collection($users));
    }

    
}
