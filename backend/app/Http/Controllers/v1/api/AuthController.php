<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Member;
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
                if($request->access_token != null){
                    $quest = $request->access_token;
                    $answer = $tb->first()->access_token;
                    $chk = $quest == $answer;
                    $msg = '登入失效';
                }else{
                    $quest = $request->password;
                    $answer = $tb->first()->password;
                    $chk = Hash::check($quest, $answer);
                    $msg = '密碼錯誤';
                }
                if (!$chk){
                    $result['message'] = [$msg];
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

    public function memberLogin(Request $request) {
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
            $tb = Member::where('email',$request->email);
            if(count($tb->get()) != 1){
                $result['message'] = ['尚未註冊'];
                throw new Exception('登入失敗');
            }else{
                if($request->access_token != null){
                    $quest = $request->access_token;
                    $answer = $tb->first()->access_token;
                    $chk = $quest == $answer;
                    $msg = '登入失效';
                }else{
                    $quest = $request->password;
                    $answer = $tb->first()->password;
                    $chk = Hash::check($quest, $answer);
                    $msg = '密碼錯誤';
                }
                if (!$chk){
                    $result['message'] = [$msg];
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
}