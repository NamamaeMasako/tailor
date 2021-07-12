<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Costume;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

class CostumeController extends Controller
{
    public function index(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            $isMember = false;
            if($request->isMember == true){
                $isMember = true;
            }
            $request->request->remove('isMember');
            
            $tb = Costume::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    if(is_array($request[$key])){
                        $tb = $tb->whereIn($key,$request[$key]);
                    }else{
                        $tb = $tb->where($key,$request[$key]);
                    }
                }
            }
            if(count($tb) > 0){
                foreach($tb as $row){
                    $row->gender_text = Lang::get('status.costume.gender')[$row->gender];
                    $row->enable_text = Lang::get('status.costume.enable')[$row->enable];
                    $row->part_text = Lang::get('status.costume.part')[$row->part];
                }
            }else{
                $result['message'] = ['無對應資料'];
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
            $validator = Validator::make($request->all(),config('validation.costume.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('新增失敗');
            }
            $resquest_costume_create = [
                'title' => $request->title,
                'gender' => $request->gender,
                'part' => $request->part,
                'bug' => $request->bug,
                'feather' => $request->feather,
                'cannabis' => $request->cannabis,
                'gem' => $request->gem,
                'stamina' => $request->stamina,
                'experience' => $request->experience,
                'price' => $request->price
            ];
            Costume::create($resquest_costume_create);

            $result['status'] = true;
            $result['result'] = '新增成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$costume_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.costume.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }
            $resquest_costume_update = [
                'title' => $request->title,
                'gender' => $request->gender,
                'part' => $request->part,
                'bug' => $request->bug,
                'feather' => $request->feather,
                'cannabis' => $request->cannabis,
                'gem' => $request->gem,
                'enable' => $request->enable,
            ];
            $tb = Costume::where('costume_no',$costume_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_costume_update);
            
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