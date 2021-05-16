<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('name', 30); 
            $table->string('patern_surname', 30);
            $table->string('matern_surname', 30);
            $table->date('birth_date');
            $table->string('gender', 20);
            $table->unsignedSmallInteger('academic_level_id');     
            $table->softDeletes('deleted_at', $precision = 0);       
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
        Schema::dropIfExists('students');
    }
}