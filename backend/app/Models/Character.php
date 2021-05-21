<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Character extends Model
{
    protected $table = 'characters';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->character_no = 'CH_'.Carbon::now()->timestamp;
            $model->enable = 0;
            $model->shelf = 0;
        });
        static::updating(function($model)
        {

        });
    }
}
