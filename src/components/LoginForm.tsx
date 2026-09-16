import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    //koppla detta emot en API

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Ange din email och lösenord.');
            return;
        }

        setError('');
        navigate('/minasidor');
    };

    return (
        <form onSubmit={handleSubmit} aria-label="Login form">
            <h1>Logga in</h1>

            <label htmlFor="login-email">Email</label>
            <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
            />

            <label htmlFor="login-password">Lösenord</label>
            <input
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
            />

            {error && <p role="alert">{error}</p>}
            <div className="button-group">
                <button type="submit">Logga in</button>
                <button type="button" onClick={() => navigate('/forgot-password')}>
                    Glömt lösenord?
                </button>
            </div>
        </form>
    );
}
