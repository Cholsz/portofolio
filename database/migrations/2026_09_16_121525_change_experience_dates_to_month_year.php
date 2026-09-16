<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tambahkan kolom sementara
        Schema::table('experiences', function (Blueprint $table) {
            $table->string('tanggal_mulai_temp', 7)->nullable();
            $table->string('tanggal_selesai_temp', 7)->nullable();
        });

        // Salin YYYY-MM dari data tanggal lama
        DB::statement("
            UPDATE experiences
            SET tanggal_mulai_temp = TO_CHAR(tanggal_mulai, 'YYYY-MM'),
                tanggal_selesai_temp = TO_CHAR(tanggal_selesai, 'YYYY-MM')
        ");

        // Hapus kolom tanggal lama
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['tanggal_mulai', 'tanggal_selesai']);
        });

        // Buat kembali dengan format YYYY-MM
        Schema::table('experiences', function (Blueprint $table) {
            $table->string('tanggal_mulai', 7)->nullable();
            $table->string('tanggal_selesai', 7)->nullable();
        });

        // Kembalikan data
        DB::statement("
            UPDATE experiences
            SET tanggal_mulai = tanggal_mulai_temp,
                tanggal_selesai = tanggal_selesai_temp
        ");

        // Hapus kolom sementara
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['tanggal_mulai_temp', 'tanggal_selesai_temp']);
        });
    }

    public function down(): void
    {
        Schema::table('experiences', function (Blueprint $table) {
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_selesai')->nullable();
        });
    }
};