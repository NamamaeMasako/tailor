<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFurnishingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('furnishings', function (Blueprint $table) {
            $table->id();
            $table->string('furnishing_no')->uniqid()->comment('家具編號');
            $table->string('title')->comment('名稱');
            $table->string('type')->nullable()->comment('適用類型');
            $table->integer('space')->comment('空間數量');
            $table->integer('enable')->comment('開放狀態');
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
        Schema::dropIfExists('furnishings');
    }
}
