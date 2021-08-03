<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberShopspacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_shopspaces', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->comment('會員編號');
            $table->string('shopspace_no')->comment('店內空間編號');
            $table->string('furnishing_no')->nullable()->comment('已擺設家具編號');
            $table->string('costume_no')->nullable()->comment('架上服飾編號');
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
        Schema::dropIfExists('member_shopspaces');
    }
}
