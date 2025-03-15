export const Homepage = ({ error }: { error?: string }) => {
    return (
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Đăng nhập</title>
            </head>
            <body>
                <div>
                    <form action="/diem" method="post">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <button type="submit">Đăng nhập</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </body>
        </html>
    );
};
