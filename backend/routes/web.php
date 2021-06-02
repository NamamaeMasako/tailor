<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/dashboard', function () {
//     return view('app');
// });

Route::get('/login', function () {
    return view('app');
})->name('login');

// 將除了 api prefix 的 request 都導向 welcome.blade.php

Route::get('/{path}', function () {
    return view('app');
})->where('path', '^((?!api).)*$');
