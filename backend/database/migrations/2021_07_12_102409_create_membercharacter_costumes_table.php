<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembercharacterCostumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('membercharacter_costumes', function (Blueprint $table) {
            $table->id();
            $table->string('membercharacter_id')->comment('會員持有角色id');
            $table->string('costumer_id')->comment('服裝id');
            $table->string('combination_no')->comment('組合編號');
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
        Schema::dropIfExists('membercharacter_costumes');
    }
}
