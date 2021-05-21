<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Character;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

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
            if(count($tb) > 0){
                foreach($tb as $row){
                    $row->enable_text = Lang::get('status.character.enable')[$row->enable];
                    $row->shelf_text = Lang::get('status.character.shelf')[$row->shelf];
                }
            }
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
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.character.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('新增失敗');
            }
            $res = Character::create($request->all());
            // dd($res);
            $result['status'] = true;
            $result['message']['character'] = 'store => JJJ';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }
}