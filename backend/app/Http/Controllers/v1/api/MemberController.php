<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\Constant;
use App\Models\Member;
use App\Models\MemberCharacter;
use App\Models\Stage;
use Carbon\Carbon;
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
                            $MemberCharacter->name = $tb_character->first()->name;
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
            $resquestArr_member_character_update = [];
            if(is_array($request->member_character) && count($request->member_character) > 0){
                foreach($request->member_character as $member_character){
                    $res = [
                        'member_no' => $member_no,
                        'character_no' => $member_character['character_no']
                    ];
                    array_push($resquestArr_member_character_update,$res);
                }
            }

            if($request->update_character){
                MemberCharacter::where('member_no',$member_no)->delete();
                if(count($resquestArr_member_character_update) > 0){
                    foreach($resquestArr_member_character_update as $res){
                        MemberCharacter::create($res);
                    }
                }
            }else{
                $tb = Member::where('member_no',$member_no);
                if(count($tb->get()) > 1 || count($tb->get()) <= 0){
                    $result['message'] = ['資料異常'];
                    throw new Exception('更新失敗');
                }
                $tb->update($resquest_member_update);
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

    public function updatestage(Request $request,$member_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.member.rules.updatestage'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }

            if($request->stage_no == null){
                $request->stage_start_time = null;
            }else{
                $request->stage_start_time = Carbon::now();
            }
            $request_member_character = [
                'stage_no' => $request->stage_no,
                'stage_start_time' => $request->stage_start_time
            ];
            $tb_MemberCharacter = MemberCharacter::where('member_no',$member_no)->where('character_no',$request->character_no);
            $tb_Member = Member::where('member_no',$member_no);
            $tb_Constant = Constant::where('page','stage')->where('function','resource')->get();

            if(count($tb_MemberCharacter->get()) <= 0 || count($tb_Member->get()) <= 0){
                $result['message'] = ['資料異常'];
                throw new Exception('更新失敗');
            }else{
                $stage_no = $tb_MemberCharacter->first()->stage_no;
                $tb_Stage = Stage::where('stage_no',$stage_no);
                if($request->stage_no == null){
                    $tb_Member = $tb_Member->first();
                    $tb_Stage = $tb_Stage->first();
                    foreach($tb_Constant as $constant){
                        $constant->usage = explode('|',$constant->usage);
                        if($tb_Stage->bug_value == $constant->value){
                            $bug = rand($constant->usage[0],$constant->usage[1]);
                        }
                        if($tb_Stage->feather_value == $constant->value){
                            $feather = rand($constant->usage[0],$constant->usage[1]);
                        }
                        if($tb_Stage->cannabis_value == $constant->value){
                            $cannabis = rand($constant->usage[0],$constant->usage[1]);
                        }
                        if($tb_Stage->gem_value == $constant->value){
                            $gem = rand($constant->usage[0],$constant->usage[1]);
                        }
                    }
                    $request_member = [
                        'bug' => $tb_Member->bug+$bug,
                        'feather' => $tb_Member->feather+$feather,
                        'cannabis' => $tb_Member->cannabis+$cannabis,
                        'gem' => $tb_Member->gem+$gem,
                        'coins' => $tb_Member->coins+$tb_Stage->coins
                    ];
                    $tb_Member->update($request_member);
                }
                $tb_MemberCharacter->update($request_member_character);
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