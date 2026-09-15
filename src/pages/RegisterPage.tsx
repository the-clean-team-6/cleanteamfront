import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (field: keyof RegisterForm, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Lösenorden matchar inte.');
            return;
        }

        if (form.password.length < 8) {
            setError('Lösenordet måste vara minst 8 tecken långt.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                throw new Error('Registreringen misslyckades. Försök igen.');
            }

            navigate('/login');
        } catch (submissionError) {
            setError(
                submissionError instanceof Error
                    ? submissionError.message
                    : 'Registreringen misslyckades. Försök igen.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="register-page">
            <section className="register-card" aria-labelledby="register-title">
                <h1 id="register-title">Skapa ett konto</h1>
                <p>Gå med i Clean Team idag.</p>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="name">Namn</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        autoComplete="name"
                        required
                    />

                    <label htmlFor="email">E-post</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={(event) => updateField('password', event.target.value)}
                        autoComplete="new-password"
                        minLength={8}
                        required
                    />

                    <label htmlFor="confirmPassword">Bekräfta lösenord</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(event) => updateField('confirmPassword', event.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    {error && <p role="alert" className="register-error">{error}</p>}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Skapar konto…' : 'Registrera'}
                    </button>
                </form>

                <p>
                    Har du redan ett konto? <Link to="/login">Logga in</Link>
                </p>
            </section>
        </main>
    );
}
