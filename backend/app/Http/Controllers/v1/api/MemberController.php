<?php

namespace App\Http\Controllers\v1\api;  //路徑
use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\Constant;
use App\Models\Costume;
use App\Models\Furnishing;
use App\Models\Member;
use App\Models\MemberCharacter;
use App\Models\MemberCostume;
use App\Models\MemberFurnishing;
use App\Models\MemberShopspace;
use App\Models\Shopspace;
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
                    $row->updateStamina();
                    $row->updateCoinsAndAmount();
                    $work = $row->costume_no;
                    $work_time = $row->work_finished_at;
                    if($row->work_finished_at != null){
                        if(Carbon::now()->gte(Carbon::create($row->work_finished_at))){
                            $work = null;
                            $work_time = null;
                        }
                    }
                    $row->update([
                        'costume_no' => $work,
                        'work_finished_at' => $work_time
                    ]);
                    
                    $row->enable_text = Lang::get('status.member.enable')[$row->enable];
                    $row->costume_totalAmount = 0;
                    if(count($row->MemberCharacter) > 0){
                        foreach($row->MemberCharacter as $MemberCharacter){
                            $tb_character = Character::where('character_no',$MemberCharacter->character_no);
                            if(count($tb_character->get()) > 1 || count($tb_character->get()) <= 0){
                                $result['message'] = ['資料異常'];
                                throw new Exception('查詢失敗');
                            }
                            $MemberCharacter->name = $tb_character->first()->name;
                        }
                    }
                    if(count($row->MemberCostume) > 0){
                        foreach($row->MemberCostume as $MemberCostume){
                            $tb_costume = Costume::where('costume_no',$MemberCostume->costume_no);
                            if(count($tb_costume->get()) > 1 || count($tb_costume->get()) <= 0){
                                $result['message'] = ['資料異常'];
                                throw new Exception('查詢失敗');
                            }
                            $MemberCostume->title = $tb_costume->first()->title;
                            $MemberCostume->gender = $tb_costume->first()->gender;
                            $MemberCostume->gender_text = Lang::get('status.costume.gender')[$tb_costume->first()->gender];
                            $MemberCostume->part = $tb_costume->first()->part;
                            $MemberCostume->part_text = Lang::get('status.costume.part')[$tb_costume->first()->part];
                            $MemberCostume->bug = $tb_costume->first()->bug;
                            $MemberCostume->feather = $tb_costume->first()->feather;
                            $MemberCostume->cannabis = $tb_costume->first()->cannabis;
                            $MemberCostume->gem = $tb_costume->first()->gem;
                            $MemberCostume->stamina = $tb_costume->first()->stamina;
                            $MemberCostume->time = $tb_costume->first()->time;
                            $MemberCostume->quantity = $tb_costume->first()->quantity;
                            $MemberCostume->experience = $tb_costume->first()->experience;
                            $MemberCostume->price = $tb_costume->first()->price;
                            $row->costume_totalAmount += $MemberCostume->amount;
                        }
                    }
                    $row->work = null;
                    if($row->costume_no != null){
                        $row->work = Costume::where('costume_no', $row->costume_no);
                    }
                    if(count($row->MemberFurnishing) > 0){
                        foreach($row->MemberFurnishing as $MemberFurnishing){
                            $tb_furnishing = Furnishing::where('furnishing_no',$MemberFurnishing->furnishing_no);
                            $MemberFurnishing->title = $tb_furnishing->first()->title;
                            $MemberFurnishing->type = $tb_furnishing->first()->type;
                            $MemberFurnishing->space = $tb_furnishing->first()->space;
                        }
                    }
                    if(count($row->MemberShopspace) > 0){
                        foreach($row->MemberShopspace as $MemberShopspace){
                            $tb_shopspace = Shopspace::where('shopspace_no',$MemberShopspace->shopspace_no);
                            $MemberShopspace->title = $tb_shopspace->first()->title;
                            $costume_no_arr = [];
                            if($MemberShopspace->costume_no != null && $MemberShopspace->costume_no != ''){
                                $costume_no_arr = explode('|',$MemberShopspace->costume_no);
                                foreach($costume_no_arr as $i => $c_no){
                                    $tb_costume = Costume::where('costume_no',$c_no)->first();
                                    if($tb_costume == null){
                                        $costume_no_arr[$i] = '';
                                    }
                                }
                            }
                            $MemberShopspace->costume_no = $costume_no_arr;
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
                'bug' => $request->bug,
                'feather' => $request->feather,
                'cannabis' => $request->cannabis,
                'gem' => $request->gem,
                'coins' => $request->coins,
                'level' => $request->level,
                'experience' => $request->experience,
                'stamina' => $request->stamina,
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
            $resquestArr_member_costume_update = [];
            if(is_array($request->member_costume) && count($request->member_costume) > 0){
                foreach($request->member_costume as $member_costume){
                    $res = [
                        'member_no' => $member_no,
                        'costume_no' => $member_costume['costume_no'],
                        'amount' => $member_costume['amount']
                    ];
                    array_push($resquestArr_member_costume_update,$res);
                }
            }
            $resquestArr_member_furnishing_update = [];
            if(is_array($request->member_furnishing) && count($request->member_furnishing) > 0){
                foreach($request->member_furnishing as $member_furnishing){
                    $res = [
                        'member_no' => $member_no,
                        'furnishing_no' => $member_furnishing['furnishing_no'],
                    ];
                    array_push($resquestArr_member_furnishing_update,$res);
                }
            }
            $resquestArr_member_shopspace_update = [];
            if(is_array($request->member_shopspace) && count($request->member_shopspace) > 0){
                foreach($request->member_shopspace as $member_shopspace){
                    $res = [
                        'member_no' => $member_no,
                        'shopspace_no' => $member_shopspace['shopspace_no'],
                        'furnishing_no' => null,
                        'costume_no' => null,
                        'amount_updated_at' => null
                    ];
                    $tb_memberfurnishing = MemberFurnishing::where('member_no',$member_no)->where('furnishing_no',$member_shopspace['furnishing_no'])->first();
                    if(!is_null($tb_memberfurnishing)){
                        $res['furnishing_no'] = $tb_memberfurnishing->furnishing_no;
                    }
                    $membercostume_no = null;
                    if(count($member_shopspace['costume_no']) > 0){
                        foreach($member_shopspace['costume_no'] as $i => $costume_no){
                            if($costume_no != ''){
                                $tb_membercostume = MemberCostume::where('member_no',$member_no)->where('costume_no',$costume_no)->first();
                                if(is_null($tb_membercostume)){
                                    $costume_no = '';
                                }
                            }
                        }
                    }
                    $res['costume_no'] = implode("|",$member_shopspace['costume_no']);
                    if($res['costume_no'] != null || $res['costume_no'] !== ''){
                        $res['amount_updated_at'] = Carbon::now();
                    }
                    
                    array_push($resquestArr_member_shopspace_update,$res);
                }
            }

            if($request->update_character){
                MemberCharacter::where('member_no',$member_no)->delete();
                if(count($resquestArr_member_character_update) > 0){
                    foreach($resquestArr_member_character_update as $res){
                        MemberCharacter::create($res);
                    }
                }
            }else if($request->update_membercostume){
                MemberCostume::where('member_no',$member_no)->delete();
                if(count($resquestArr_member_costume_update) > 0){
                    foreach($resquestArr_member_costume_update as $res){
                        MemberCostume::create($res);
                    }
                }
            }else if($request->update_memberfurnishing){
                MemberFurnishing::where('member_no',$member_no)->delete();
                if(count($resquestArr_member_furnishing_update) > 0){
                    foreach($resquestArr_member_furnishing_update as $res){
                        MemberFurnishing::create($res);
                    }
                }
            }else if($request->update_membershopspace){
                MemberShopspace::where('member_no',$member_no)->delete();
                if(count($resquestArr_member_shopspace_update) > 0){
                    foreach($resquestArr_member_shopspace_update as $res){
                        MemberShopspace::create($res);
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

    public function dowork(Request $request,$member_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.member.rules.dowork'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }
            $tb_Member = Member::where('member_no',$member_no)->updateStamina();
            if($request->costume_no != null){
                $tb_Costume = Costume::where('costume_no',$request->costume_no)->first();
                if($request->work_finished_at == null){
                    $addTimeArr = explode(":",$tb_Costume->time);
                    foreach($addTimeArr as $t){
                        $t = $t*$request->count;
                    }
                    $work_finished_at = Carbon::now()->addHours($addTimeArr[0])->addMinute($addTimeArr[1])->addSeconds($addTimeArr[2]);
                }else{
                    $work_finished_at = $request->work_finished_at;
                }
                
                $amount = null;
                $request_update_member = [
                    'costume_no' => $request->costume_no,
                    'stamina' => $tb_Member->stamina - $tb_Costume->stamina*$request->count,
                    'stamina_updated_at' => Carbon::now(),
                    'work_count' => $request->count,
                    'work_finished_at' => $work_finished_at,
                    'bug' => $tb_Member->bug - $tb_Costume->bug*$request->count,
                    'feather' => $tb_Member->feather - $tb_Costume->feather*$request->count,
                    'cannabis' => $tb_Member->cannabis - $tb_Costume->cannabis*$request->count,
                    'gem' => $tb_Member->gem - $tb_Costume->gem*$request->count
                ];
            }else{
                $tb_Costume = Costume::where('costume_no',$tb_Member->costume_no)->first();
                $request_update_member = [
                    'costume_no' => null,
                    'work_count' => 0,
                    'work_finished_at' => null,
                    'experience' => $tb_Member->experience + $tb_Costume->experience,
                ];
                $amount = $tb_Member->work_count*$tb_Costume->quantity;
            }
            if($amount != null){
                $tb_MemberCostume = MemberCostume::where('member_no',$member_no)->where('costume_no',$tb_Member->costume_no)->first();
                $request_update_member_costumer = [
                    'amount' => $tb_MemberCostume->amount + $amount
                ];
                $tb_MemberCostume->update($request_update_member_costumer);
            }
            $tb_Member->update($request_update_member);
            
            $result['status'] = true;
            $result['message'] = ['更新成功'];
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
                    $result['result'] = [
                        $stage_no => []
                    ];
                    $tb_Member = $tb_Member->first();
                    $tb_Stage = $tb_Stage->first();
                    foreach($tb_Constant as $constant){
                        $constant->usage = explode('|',$constant->usage);
                        if($tb_Stage->bug_value == $constant->value){
                            $bug = rand($constant->usage[0],$constant->usage[1]);
                            $result['result'][$stage_no]['bug'] = $bug;
                        }
                        if($tb_Stage->feather_value == $constant->value){
                            $feather = rand($constant->usage[0],$constant->usage[1]);
                            $result['result'][$stage_no]['feather'] = $feather;
                        }
                        if($tb_Stage->cannabis_value == $constant->value){
                            $cannabis = rand($constant->usage[0],$constant->usage[1]);
                            $result['result'][$stage_no]['cannabis'] = $cannabis;
                        }
                        if($tb_Stage->gem_value == $constant->value){
                            $gem = rand($constant->usage[0],$constant->usage[1]);
                            $result['result'][$stage_no]['gem'] = $gem;
                        }
                    }
                    $request_member = [
                        'bug' => $tb_Member->bug+$bug,
                        'feather' => $tb_Member->feather+$feather,
                        'cannabis' => $tb_Member->cannabis+$cannabis,
                        'gem' => $tb_Member->gem+$gem,
                        'coins' => $tb_Member->coins+$tb_Stage->coins
                    ];
                    $result['result'][$stage_no]['coins'] = $tb_Stage->coins;
                    $tb_Member->update($request_member);
                }
                $tb_MemberCharacter->update($request_member_character);
            }


            $result['status'] = true;
            $result['message'] = ['更新成功'];
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }

        return $result;
    }

    public function updatefurnishing(Request $request,$member_no) {
        $result = [
            'status' => false,
            'result' => null,
            'message' => []
        ];
        DB::beginTransaction();
        try{
            $validator = Validator::make($request->all(),config('validation.member.rules.updatefurnishing'),Lang::get('validation'));
            if($validator->fails()){
                $result['message'] = $validator->errors();
                throw new Exception('更新失敗');
            }

            $result['status'] = true;
            $result['message'] = ['更新成功'];
            DB::commit();
        }catch(Exception $e){
            $result['result'] = $e->getMessage();
            DB::rollBack();
        }
    }

}