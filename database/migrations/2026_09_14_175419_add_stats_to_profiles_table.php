<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('gpa')->nullable()->after('foto_about');
            $table->string('project_count')->nullable()->after('gpa');
            $table->string('certificate_count')->nullable()->after('project_count');
            $table->string('award_count')->nullable()->after('certificate_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'gpa',
                'project_count',
                'certificate_count',
                'award_count',
            ]);
        });
    }
};