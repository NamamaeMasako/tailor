<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Furnishing;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

class FurnishingController extends Controller
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
            
            $tb = Furnishing::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }
            if(count($tb) > 0){
                foreach($tb as $row){
                    $type_text = [];
                    if($row->type == null){
                        array_push($type_text,'無');
                    }else{
                        $typeArr = explode("|",$row->type);
                        foreach($typeArr as $t){
                            $t_text = Lang::get('status.costume.part')[$t];
                            array_push($type_text,$t_text);
                        }
                    }
                    $row->type_text = $type_text;
                }
            }else{
                $result['message'] = ['無對應資料'];
            }

            $result['status'] = true;
            $result['result'] = $tb->toArray();
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
            $validator = Validator::make($request->all(),config('validation.area.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('新增失敗');
            }
            Stage::create($request->all());
            $result['status'] = true;
            $result['result'] = '新增成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$stage_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.stage.rules.edit'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }
            $resquest_stage_update = [
                'area_no' => $request->area_no,
                'title' => $request->title,
                'order' => $request->order,
                'enable' => $request->enable,
                'time' => $request->time,
                'bug_value' => $request->bug_value,
                'feather_value' => $request->feather_value,
                'cannabis_value' => $request->cannabis_value,
                'gem_value' => $request->gem_value,
                'coins' => $request->coins
            ];
            $tb = Stage::where('stage_no',$stage_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_stage_update);

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