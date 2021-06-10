<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberCharactersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_characters', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->comment('會員編號');
            $table->string('character_no')->comment('角色編號');
            $table->string('stage_no')->nullable()->comment('執行中任務編號');
            $table->timestamp('stage_start_time')->nullable()->comment('執行中任務開始時間');
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
        Schema::dropIfExists('member_characters');
    }
}
