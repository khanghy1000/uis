export const Homepage = () => {
    return (
        <div>
            <form action="/diem" method="post">
                <input type="text" name="username" placeholder="Username" />
                <input type="password" name="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
