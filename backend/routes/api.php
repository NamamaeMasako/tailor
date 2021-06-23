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
        Route::post('/login', 'AuthController@login');
        Route::post('/member/login', 'AuthController@memberLogin');
        Route::post('/logout', 'AuthController@logout');
        Route::post('/member/logout', 'AuthController@memberLogout');
        Route::post('/register', 'AuthController@register');
        Route::prefix('game')->middleware('auth')->group(function () {
            Route::prefix('character')->group(function () {
                Route::get('/', 'CharacterController@index');
                Route::post('/', 'CharacterController@store');
                Route::post('/edit/{character_no}', 'CharacterController@edit');
            });
            Route::prefix('job')->group(function () {
                Route::get('/', 'JobController@index');
                Route::post('/', 'JobController@store');
                Route::post('/edit/{job_no}', 'JobController@edit');
            });
            Route::prefix('area')->group(function () {
                Route::get('/', 'AreaController@index');
                Route::post('/', 'AreaController@store');
                Route::post('/edit/{area_no}', 'AreaController@edit');
            });
            Route::prefix('stage')->group(function () {
                Route::get('/', 'StageController@index');
                Route::post('/', 'StageController@store');
                Route::post('/edit/{stage_no}', 'StageController@edit');
            });
        });
        Route::prefix('data')->middleware('auth')->group(function () {
            Route::prefix('member')->group(function () {
                Route::get('/', 'MemberController@index');
                Route::post('/', 'MemberController@store');
                Route::post('/edit/{member_no}', 'MemberController@edit');
                Route::post('/updatestage/{member_no}', 'MemberController@updatestage');
            });
            Route::prefix('constant')->group(function () {
                Route::get('/', 'ConstantController@index');
                Route::post('/edit/{page}', 'ConstantController@edit');
            });
        });
        Route::prefix('system')->middleware('auth')->group(function () {
            Route::prefix('manager')->group(function () {
                Route::get('/', 'ManagerController@index');
                Route::post('/edit/{id}', 'ManagerController@edit');
                Route::post('/resetpassword/{id}', 'ManagerController@resetpassword');
            });
            Route::prefix('url')->group(function () {
                Route::get('/', 'UrlController@index');
                Route::post('/edit/{id}', 'UrlController@edit');
            });
        }); 
    });
});
