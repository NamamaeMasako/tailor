<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class MemberFurnishing extends Model
{
    protected $table = 'member_furnishings';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {

        });
        static::updating(function($model)
        {

        });
    }
    public function Member()
    {
        return $this->belongsTo('App\models\Member','member_no');
    }
    public function Furnishing()
    {
        return $this->belongsTo('App\models\Furnishing','furnishing_no');
    }
    public function MemberShopspace()
    {
        return $this->hasMany('App\models\MemberShopspace','id');
    }
}
