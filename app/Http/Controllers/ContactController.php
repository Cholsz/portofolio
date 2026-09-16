<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:100'],
        'email' => ['required', 'email', 'max:255'],
        'message' => ['required', 'string', 'max:5000'],
    ]);

    Mail::to('ardhi18122003@gmail.com')
        ->send(new ContactMessage(
            $validated['name'],
            $validated['email'],
            $validated['message'],
        ));

    return response()->json([
        'success' => true,
        'message' => 'Pesan berhasil dikirim.',
    ]);
}
}