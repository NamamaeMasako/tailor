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
    Route::namespace('api')->group(function () {
        Route::prefix('system')->group(function () {
            Route::prefix('url')->group(function () {
                Route::get('/', 'UrlController@index');
            });
        });
        Route::prefix('character')->group(function () {
            Route::get('/', 'CharacterController@index');
            Route::post('/', 'CharacterController@store');
            Route::post('/edit/{character_no}', 'CharacterController@edit');
            Route::prefix('job')->group(function () {
                Route::get('/', 'JobController@index');
                Route::post('/', 'JobController@store');
                Route::post('/edit/{job_no}', 'JobController@edit');
            });
        });
    });
});
