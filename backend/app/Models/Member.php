<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

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
            $model->enable = 0;
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
    public function MemberCharacter()
    {
        return $this->hasMany('App\models\MemberCharacter','member_no');
    }
    public function MemberCostume()
    {
        return $this->hasMany('App\models\MemberCostume','member_no');
    }
}
