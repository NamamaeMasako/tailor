<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberCostumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_costumes', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->comment('會員編號');
            $table->string('costume_no')->comment('服裝編號');
            $table->string('amount')->nullable()->comment('庫存數量');
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
        Schema::dropIfExists('member_costumes');
    }
}
