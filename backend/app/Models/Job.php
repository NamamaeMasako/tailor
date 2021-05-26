<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Job extends Model
{
    protected $table = 'jobs';
    protected $primaryKey = 'job_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->job_no = 'J_'.Carbon::now()->timestamp;
            $model->enable = 1;
        });
        static::updating(function($model)
        {

        });
    }
    public function CharacterJob()
    {
        return $this->hasMany('App\models\CharacterJob','job_no');
    }
}
