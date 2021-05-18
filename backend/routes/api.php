<?php

use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'store']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function (){

    // routes para los catalogos
    Route::resource('students', StudentController::class)->except(['create', 'edit', 'show', 'update']);
    Route::post('students/update', [StudentController::class, 'update']);
    Route::post('students/delete', [StudentController::class, 'delete']);
    Route::get('students/filter/{filter}', [StudentController::class, 'filter']);
    Route::get('students/withTrashed', [StudentController::class, 'getAllWithTrashedStudents']);

    Route::get('users', [UserController::class, 'index']);
    Route::get('users/filter/{filter}', [UserController::class, 'filter']);

});