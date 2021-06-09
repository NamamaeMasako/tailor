<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Member;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Lang;

class MemberController extends Controller
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
            
            $tb = Member::all();
            if(count($request->all()) > 0){
                foreach($request->all() as $key => $res){
                    $tb = $tb->where($key,$request[$key]);
                }
            }
            if(count($tb) > 0){
                foreach($tb as $row){
                    $row->enable_text = Lang::get('status.member.enable')[$row->enable];
                    if(count($row->MemberCharacter) > 0){
                        foreach($row->MemberCharacter as $MemberCharacter){
                            $tb_character = Character::where('character_no',$MemberCharacter->character_no);
                            if(count($tb_character->get()) > 1 || count($tb_character->get()) <= 0){
                                $result['message'] = ['資料異常'];
                                throw new Exception('更新失敗');
                            }
                            $MemberCharacter->character_name = $tb_character->first()->name;
                        }
                    }
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
            $validator = Validator::make($request->all(),config('validation.member.rules.store'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('新增失敗');
            }
            $resquest_member_create = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ];
            $response_member_create = Member::create($resquest_member_create);

            $result['status'] = true;
            $result['result'] = '新增成功';
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function edit(Request $request,$member_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.member.rules.edit'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }
            $resquest_member_update = [
                'name' => $request->name,
                'enable' => $request->enable
            ];
            $tb = Character::where('member_no',$member_no);
            if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }
            $tb->update($resquest_member_update);
            
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