<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->id();
            $table->string('stage_no')->unique()->comment('關卡編號');
            $table->string('area_no')->comment('區域編號');
            $table->string('title')->comment('名稱');
            $table->string('order')->comment('順序');
            $table->time('time')->comment('執行時間');
            $table->string('enable')->comment('開放狀態');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stages');
    }
}
