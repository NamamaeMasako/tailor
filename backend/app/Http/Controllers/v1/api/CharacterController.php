<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Character;
use DB;
use Exception;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        // DB::beginTransaction();
        try{
            // dd($request->all());
            $validator = Validator::make($request->all(),config('validation.character.rules.store'),config('validation.character.messages.store'));
            if($validator->fails()){
                $error = json_encode($validator->errors());
                throw new Exception($error);
            }
            $result['status'] = true;
            $result['message']['character'] = 'store => JJJ';
            // DB::commit();
        }catch(Exception $e){
            $errmsg = json_decode($e->getMessage());
            $result['result'] = '新增失敗';
            $result['message'] = $errmsg;
            // DB::rollBack();
        }

        return $result;
    }
}