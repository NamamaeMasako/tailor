<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\User;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Lang;

class AuthController extends Controller
{
    public function login(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            $validator = Validator::make($request->all(),config('validation.user.rules.login'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('登入失敗');
            }
            $tb = User::where('email',$request->email);
            if(count($tb->get()) != 1){
                $result['message'] = ['尚未註冊'];
                throw new Exception('登入失敗');
            }else{
                if (!Hash::check($request->password, $tb->first()->password)){
                    $result['message'] = ['密碼錯誤'];
                    throw new Exception('登入失敗');
                }
            }
            $token = Str::random(20);
            $tb->update([
                'access_token' => Hash::make($token)
            ]);

            $result['status'] = true;
            $result['result'] = $tb->first();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
        }
        return $result;
    }

    public function register(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.user.rules.register'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('註冊失敗');
            }
            $check_tb = User::where('email', $request->email)->get();
            if(count($check_tb) > 0){
                $result['message'] = ['email' => '與現有資料重複'];
                throw new Exception('註冊失敗');
            }
            $resquest_register = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ];
            User::create($resquest_register);
            $result['status'] = true;
            $result['result'] = '註冊成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$area_no) {
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
                throw new Exception('更新失敗');
            }
            $resquest_job_update = [
                'title' => $request->title,
                'order' => $request->order,
                'enable' => $request->enable
            ];
            $tb = Area::where('area_no',$area_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_job_update);

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