<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class CharacterJob extends Model
{
    protected $table = 'character_jobs';
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
    public function Character()
    {
        return $this->belongsTo('App\models\Character','character_no');
    }
    public function Job()
    {
        return $this->belongsTo('App\models\Job','job_no');
    }
}
