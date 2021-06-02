<?php

namespace App\Http\Middleware;

use App\Models\User;
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
            $tb = User::where('access_token','=',$request->access_token)->first();
            if(is_null($tb)){
                throw new Exception('token無對應資料');
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
