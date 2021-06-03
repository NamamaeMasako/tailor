<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\CharacterJob;
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
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }
            if(count($tb) > 0){
                foreach($tb as $row){
                    $row->gender_text = Lang::get('status.character.gender')[$row->gender];
                    $row->enable_text = Lang::get('status.character.enable')[$row->enable];
                    $row->shelf_text = Lang::get('status.character.shelf')[$row->shelf];
                    $job_no = [];
                    foreach($row->CharacterJob as $CharacterJob){
                        array_push($job_no,$CharacterJob->job_no);
                    }
                    $row->job_no = $job_no;
                }
            }else{
                $result['message'] = ['無對應資料'];
                throw new Exception('查詢失敗');
            }

            $result['status'] = true;
            $result['result'] = $tb;
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
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
            $resquest_character_create = [
                'gender' => $request->gender,
                'name' => $request->name
            ];
            $resquestArr_character_job_create = [];
            if(is_array($request->job_no) && count($request->job_no) > 0){
                foreach($request->job_no as $job_no){
                    $res = [
                        'job_no' => $job_no
                    ];
                    array_push($resquestArr_character_job_create,$res);
                }
            }
            $response_character_create = Character::create($resquest_character_create);
            if(count($resquestArr_character_job_create) > 0){
                foreach($resquestArr_character_job_create as $res){
                    $res['character_no'] = Character::orderBy('updated_at','desc')->first()->character_no;
                    CharacterJob::create($res);
                }
            }
            $result['status'] = true;
            $result['result'] = '新增成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$character_no) {
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
                throw new Exception('更新失敗');
            }
            $resquest_character_update = [
                'gender' => $request->gender,
                'name' => $request->name,
                'enable' => $request->enable,
                'shelf' => $request->shelf
            ];
            $resquestArr_character_job_update = [];
            if(is_array($request->job_no) && count($request->job_no) > 0){
                foreach($request->job_no as $job_no){
                    $res = [
                        'character_no' => $character_no,
                        'job_no' => $job_no
                    ];
                    array_push($resquestArr_character_job_update,$res);
                }
            }
            $tb = Character::where('character_no',$character_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_character_update);
            
            CharacterJob::where('character_no',$character_no)->delete();
            if(count($resquestArr_character_job_update) > 0){
                foreach($resquestArr_character_job_update as $res){
                    CharacterJob::create($res);
                }
            }
            
            $result['status'] = true;
            $result['result'] = '更新成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }
}