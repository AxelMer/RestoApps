<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistorialxpedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historialxpedidos', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->integer('orden');
            $table->integer('idPedidos')->unique();
            $table->integer('idMesas')->unique();
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
        Schema::dropIfExists('historialxpedidos');
    }
}
