<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Job;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

class JobController extends Controller
{
    public function index(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            $tb = Job::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }
            if(count($tb) > 0){
                foreach($tb as $row){
                    $row->enable_text = Lang::get('status.job.enable')[$row->enable];
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
            $validator = Validator::make($request->all(),config('validation.job.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('新增失敗');
            }
            Job::create($request->all());
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
            $tb = Character::where('character_no',$character_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['無對應資料'];
                throw new Exception('更新失敗');
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