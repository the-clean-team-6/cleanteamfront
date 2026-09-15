import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <main>
            <h1>Välkommen till Clean Team</h1>
            <p>Här kan du skapa ett konto eller logga in.</p>
            <nav aria-label="Account actions">
                <Link to="/login">Log in</Link>
                <Link to="/register">Register</Link>
            </nav>
        </main>
    );
}
