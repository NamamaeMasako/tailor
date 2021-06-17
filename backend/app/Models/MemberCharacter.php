<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class MemberCharacter extends Model
{
    protected $table = 'member_characters';
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
    public function Character()
    {
        return $this->belongsTo('App\models\Character','character_no');
    }
}
