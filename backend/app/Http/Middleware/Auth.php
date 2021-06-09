<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\Member;
use Illuminate\Http\Request;
use Closure;
use Exception;

class Auth 
{
    public function handle($request, Closure $next)
    {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        try{
            if($request->access_token == null || $request->access_token == 'undefined'){
                throw new Exception('無效的token');
            }
            $tb_user = User::where('access_token','=',$request->access_token)->first();
            $tb_member = Member::where('access_token','=',$request->access_token)->first();
            if(is_null($tb_user) && is_null($tb_member)){
                throw new Exception('token無對應資料');
            }
            $request->isMember = false;
            if(!is_null($tb_member)){
                $request->isMember = true;
            }
            // $result['status'] = true;
            // $result['result'] = [
            //     'name' => $tb->name,
            //     'access_token' => $tb->access_token,
            //     'email' => $tb->email
            // ];
            // $request['tokenAuth'] = $result;
            $request->request->remove('access_token');
            return $next($request);
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            return response($result);
        }
    }
}
