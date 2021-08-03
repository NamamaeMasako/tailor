<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Furnishing extends Model
{
    use HasFactory;

    protected $table = 'furnishings';
    protected $primaryKey = 'furnishing_no';
    protected $keyType = 'string';
    protected $fillabled = ['*'];
    protected $guarded = ['id'];
    public $timestamps = true;

    public static function boot()
    {
        parent::boot();
        static::creating(function($model)
        {
            $model->furnishing_no = 'FU_'.Carbon::now()->timestamp;
        });
        static::updating(function($model)
        {

        });
    }
    public function MemberFurnishing()
    {
        return $this->hasMany('App\models\MemberFurnishing','furnishing_no');
    }
}
