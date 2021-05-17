<?php

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

Route::namespace('v1')->group(function () {
    // 經由middleware 驗證
    Route::namespace('api')->group(function () {
        Route::get('character', 'CharacterController@index');
        Route::post('character', 'CharacterController@create');
    });
});
