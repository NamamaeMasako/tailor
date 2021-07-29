<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCostumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('costumes', function (Blueprint $table) {
            $table->id();
            $table->string('costume_no')->uniqid()->comment('服裝編號');
            $table->string('title')->comment('名稱');
            $table->string('gender')->comment('性別');
            $table->string('part')->comment('部位');
            $table->integer('bug')->comment('所需資源量-蟲');
            $table->integer('feather')->comment('所需資源量-羽毛');
            $table->integer('cannabis')->comment('所需資源量-葉');
            $table->integer('gem')->comment('所需資源量-寶石');
            $table->integer('stamina')->comment('每次製作耗費體力');
            $table->integer('amount')->comment('每次製作生產數量');
            $table->time('time')->comment('每次製作時間');
            $table->integer('experience')->comment('每次製作可獲得經驗值');
            $table->integer('price')->comment('單價');
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
        Schema::dropIfExists('costumes');
    }
}
