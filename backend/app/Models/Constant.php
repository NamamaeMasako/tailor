<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Constant extends Model
{
    protected $table = 'constants';
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
}
