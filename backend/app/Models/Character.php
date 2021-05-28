<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Character extends Model
{
    use HasFactory;

    protected $table = 'characters';
    protected $primaryKey = 'character_no';
    protected $keyType = 'string';
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
    public function CharacterJob()
    {
        return $this->hasMany('App\models\CharacterJob','character_no');
    }
    public function MemberCharacter()
    {
        return $this->hasMany('App\models\MemberCharacter','character_no');
    }
}
