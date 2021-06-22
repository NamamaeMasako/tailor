<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->unique()->comment('會員編號');
            $table->string('email')->unique()->comment('電子信箱');
            $table->string('password')->comment('密碼');
            $table->string('name')->comment('名稱');
            $table->string('enable')->comment('驗證狀態');
            $table->integer('level')->comment('等級');
            $table->integer('experience')->comment('獲得經驗值');
            $table->integer('stamina')->comment('目前體力');
            $table->integer('bug')->comment('材料數量-蟲');
            $table->integer('feather')->comment('材料數量-羽毛');
            $table->integer('cannabis')->comment('材料數量-葉');
            $table->integer('gem')->comment('材料數量-寶石');
            $table->string('access_token')->nullable();
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
        Schema::dropIfExists('members');
    }
}
