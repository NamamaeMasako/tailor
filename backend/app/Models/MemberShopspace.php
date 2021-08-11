<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MemberShopspace extends Model
{
    use HasFactory;

    protected $table = 'member_shopspaces';
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
    public function Shopspace()
    {
        return $this->belongsTo('App\models\Shopspace','shopspace_no');
    }
    public function MemberFurnishing()
    {
        return $this->belongsTo('App\models\MemberFurnishing','memberfurnishing_id');
    }
    public function MemberCostume()
    {
        return $this->belongsTo('App\models\MemberCostume','membercostume_id');
    }
}
