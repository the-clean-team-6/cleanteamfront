import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main>
            <h1>Welcome to Clean Team</h1>
            <p>Get started by logging in or creating an account.</p>
            <nav aria-label="Account actions">
                <Link to="/login">Log in</Link>
                <Link to="/register">Register</Link>
            </nav>
        </main>
    );
}
