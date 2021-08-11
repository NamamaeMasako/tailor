<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use App\Models\Constant;

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
