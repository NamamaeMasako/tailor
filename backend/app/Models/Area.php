<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';
    protected $primaryKey = 'area_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->area_no = 'A_'.Carbon::now()->timestamp;
            $model->enable = 0;
        });
        static::updating(function($model)
        {

        });
    }
    public function Stage()
    {
        return $this->hasMany('App\models\Stage','area_no');
    }
    public function enableStage()
    {
        return $this->hasMany('App\models\Stage','area_no')->where('enable',1);
    }
}
