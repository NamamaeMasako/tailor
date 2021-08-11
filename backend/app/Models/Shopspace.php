<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Shopspace extends Model
{
    use HasFactory;

    protected $table = 'shopspaces';
    protected $primaryKey = 'shopspace_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->shopspace_no = 'SS_'.Carbon::now()->timestamp;
        });
        static::updating(function($model)
        {

        });
    }
    public function MemberShopspace()
    {
        return $this->hasMany('App\models\MemberShopspace','shopspace_no');
    }
}
