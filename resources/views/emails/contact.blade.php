<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pesan Baru</title>
</head>

<body style="margin:0; padding:0; background:#0f172a; font-family:Arial,sans-serif; color:#e2e8f0;">

    <div style="max-width:600px; margin:40px auto; padding:30px; background:#111827; border:1px solid #1e293b; border-radius:16px;">

        <h2 style="margin-top:0; color:#60a5fa;">
            Pesan Baru dari Portfolio
        </h2>

        <p style="color:#94a3b8;">
            Kamu menerima pesan baru melalui form contact portfolio.
        </p>

        <div style="margin-top:25px;">

            <p>
                <strong style="color:#fff;">Nama</strong><br>
                {{ $senderName }}
            </p>

            <p>
                <strong style="color:#fff;">Email</strong><br>
                {{ $senderEmail }}
            </p>

            <p>
                <strong style="color:#fff;">Pesan</strong><br>
                {!! nl2br(e($senderMessage)) !!}
            </p>

        </div>

        <hr style="margin:30px 0; border:0; border-top:1px solid #1e293b;">

        <p style="font-size:12px; color:#64748b;">
            Pesan ini dikirim melalui contact form portfolio.
        </p>

    </div>

</body>
</html>