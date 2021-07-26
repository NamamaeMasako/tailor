<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Constant;
use App\Models\Url;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

class ConstantController extends Controller
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

            $tb = Constant::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }
            if(count($tb) <= 0){
                $result['message'] = ['無對應資料'];
            }
            $res = $tb->groupBy('page');
            foreach($res as $i => $item_i){
                $res[$i] = collect($item_i)->groupBy('function');
            }
            $res['function_title_arr'] = Lang::get('status.constant.title');

            $result['status'] = true;
            $result['result'] = $res;
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
        }
        return $result;
    }

    public function edit(Request $request,$page,$function) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            if(count($request->dataArr) < 1){
                throw new Exception('無更新資料');
            }else{
                foreach($request->dataArr as $req){
                    $validator = Validator::make($req,config('validation.constant.rules.edit'),Lang::get('validation'));
                    if($validator->fails()){
                        $result['message'] = $validator->errors();
                        throw new Exception('更新失敗');
                    }
                    $resquest_update = [
                        'usage' => $req['usage']
                    ];
                    $tb = Constant::where('page',$page)->where('function',$function)->where('value',$req['value']);
                    if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                        $result['message'] = ['資料異常'];
                        throw new Exception('更新失敗');
                    }
                    $tb->update($resquest_update);
                }
                $result['status'] = true;
                $result['result'] = '更新成功';
                DB::commit();
            }
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }
}