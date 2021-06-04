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

class ManagerController extends Controller
{
    public function index(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            $tb = User::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }

            $result['status'] = true;
            $result['result'] = $tb->toArray();
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

    public function logout(Request $request) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.user.rules.logout'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('登出失敗');
            }
            $resquest_logout_update = [
                'access_token' => null
            ];
            $tb = User::where('email',$request->email);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('登出失敗');
            }
            $tb->update($resquest_logout_update);

            $result['status'] = true;
            $result['result'] = '登出成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$id) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.user.rules.edit'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }
            $resquest_user_update = [
                'email' => $request->email,
                'name' => $request->name
            ];
            $tb = User::where('id',$id);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            if($request->new_password){
                if(Hash::check($request->origin_password, $tb->first()->password)){
                    $resquest_user_update['password'] = Hash::make($request->new_password);
                }else{
                    $result['message'] = ['origin_password' => '修改前密碼錯誤'];
                    throw new Exception('更新失敗');
                }
            }
            $tb->update($resquest_user_update);
            
            $result['status'] = true;
            $result['result'] = '更新成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function resetpassword(Request $request,$id) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.user.rules.resetpassword'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('重置失敗');
            }
            $password = Str::random(5);
            $resquest_user_update = [
                'password' => Hash::make($password)
            ];
            $tb = User::where('id',$id);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_user_update);
            
            $result['status'] = true;
            $result['result'] = '新密碼: '.$password;
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }
}