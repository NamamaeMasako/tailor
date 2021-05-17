<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Character;

class CharacterController extends Controller
{
    public function index(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            $tb = Character::all();

            $result['status'] = true;
            $result['result'] = $tb;
        }catch(Exception $e){
            $result['message']['character'] = 'index => '.$e->getMessage();
        }
        return $result;
    }

    public function create(Request $request) {
        
    }
}