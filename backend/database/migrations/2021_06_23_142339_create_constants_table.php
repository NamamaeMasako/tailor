<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConstantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('constants', function (Blueprint $table) {
            $table->id();
            $table->string('page')->comment('頁面參數');
            $table->string('function')->comment('功能參數');
            $table->string('value')->comment('參考值');
            $table->string('text')->comment('對應文字');
            $table->string('description')->comment('說明');
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
        Schema::dropIfExists('constants');
    }
}
