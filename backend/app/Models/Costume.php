<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Costume extends Model
{
    use HasFactory;

    protected $table = 'costumes';
    protected $primaryKey = 'costume_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->costume_no = 'CO_'.Carbon::now()->timestamp;
            $model->enable = 0;
        });
        static::updating(function($model)
        {

        });
    }
    public function MemberCostume()
    {
        return $this->hasMany('App\models\MemberCostume','costume_no');
    }
}
