<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Stage extends Model
{
    use HasFactory;

    protected $table = 'stages';
    protected $primaryKey = 'stage_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->stage_no = 'S_'.Carbon::now()->timestamp;
            $model->enable = 0;
        });
        static::updating(function($model)
        {

        });
    }
    public function Area()
    {
        return $this->belongsTo('App\models\Area','area_no');
    }
}
