<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use App\Models\Constant;
use App\Models\Costume;
use App\Models\MemberCostume;

class Member extends Model
{
    use HasFactory;

    protected $table = 'members';
    protected $primaryKey = 'member_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->member_no = 'M_'.Carbon::now()->timestamp;
            $model->level = 1;
            $model->experience = 0;
            $model->stamina = 1;
            $model->stamina_updated_at = Carbon::now();
            $model->enable = 0;
            $model->work_count = 0;
            $model->bug = 10;
            $model->feather = 10;
            $model->cannabis = 10;
            $model->gem = 10;
            $model->coins = 500;
        });
        static::updating(function($model)
        {

        });
    }

    public function scopeupdateStamina($query)
    {
        $getQuery = $query->first();
        $stamina_updated_past_sec = Carbon::now()->diffInSeconds(Carbon::create($getQuery->stamina_updated_at));
        $stamina = $getQuery->stamina + floor($stamina_updated_past_sec/144);
        $stamina_constant = Constant::where('page','member')->where('function','staminalimit')->first();
        $stamina_limit = $stamina_constant->text + $getQuery->level*$stamina_constant->usage;
        if($stamina > $stamina_limit){
            $stamina = $stamina_limit;
        }
        $query->update([
            'stamina' => $stamina,
            'stamina_updated_at' => Carbon::now(),
        ]);

        return $getQuery;
    }

    public function scopeupdateCoinsAndAmount($query)
    {
        $getQuery = $query->first();
        $now = Carbon::now();
        if(count($getQuery->MemberShopspace) > 0){
            foreach($getQuery->MemberShopspace as $MemberShopspace){
                $amount_updated_at = Carbon::create($MemberShopspace->amount_updated_at);
                if($now->gt($amount_updated_at)){
                    $diffDay = $amount_updated_at->diffInDays($now);
                    $diffHour = $amount_updated_at->diffInHours($now);
                    $diffMinutes = $amount_updated_at->diffInMinutes($now);
                    $total_diffMin = $diffDay*24*60+$diffHour*60+$diffMinutes;
                    $minus_count = floor($total_diffMin/5);
                    if($minus_count > 0){
                        if($MemberShopspace->costume_no != null && $MemberShopspace->costume_no != ''){
                            $costume_no_arr = explode('|',$MemberShopspace->costume_no);
                            foreach($costume_no_arr as $i => $c_no){
                                $tb_membercostume = MemberCostume::where('member_no',$MemberShopspace->member_no)->where('costume_no',$c_no)->first();
                                $tb_costume = Costume::where('costume_no',$c_no)->first();
                                if(!is_null($tb_membercostume)){
                                    if($tb_membercostume->amount > 0){
                                        if($tb_membercostume->amount > $minus_count){
                                            $amount = $tb_membercostume->amount - $minus_count;
                                            $get_coins = $tb_costume->price*$minus_count;
                                        }else{
                                            $amount = 0;
                                            $get_coins = $tb_costume->price*$tb_membercostume->amount;
                                        }
                                        $tb_membercostume->update([
                                            'amount' => $amount
                                        ]);
                                        $coins = $getQuery->coins+$get_coins;
                                        $getQuery->update([
                                            'coins' => $coins
                                        ]);
                                    }
                                }
                            }
                            $MemberShopspace->update([
                                'amount_updated_at' => Carbon::now()
                            ]);
                        }
                    }
                }
            }
        }

        return $getQuery;
    }

    public function MemberCharacter()
    {
        return $this->hasMany('App\models\MemberCharacter','member_no');
    }
    public function MemberCostume()
    {
        return $this->hasMany('App\models\MemberCostume','member_no');
    }
    public function MemberFurnishing()
    {
        return $this->hasMany('App\models\MemberFurnishing','member_no');
    }
    public function MemberShopspace()
    {
        return $this->hasMany('App\models\MemberShopspace','member_no');
    }
}
