<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Url extends Model
{
    protected $table = 'urls';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = false;

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
}
