import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { FormEvent, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiGithub, FiLock, FiMail } from "react-icons/fi";
import { CortexMark } from "./MarketingLanding";
import { authRedirect, getSession, hasSupabaseAuth, signInWithProvider, supabase } from "./auth";

type AuthMode = "sign-in" | "sign-up" | "forgot-password";

export function AuthPage({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { next?: string };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void getSession().then((session) => {
      if (session && mode !== "forgot-password") void navigate({ to: "/app", replace: true });
    });
  }, [mode, navigate]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setBusy(true);
    if (!supabase) {
      setError(
        "Authentication is not configured for this deployment yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live accounts.",
      );
      setBusy(false);
      return;
    }
    const result =
      mode === "sign-up"
        ? await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: authRedirect() },
          })
        : mode === "forgot-password"
          ? await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/reset-password`,
            })
          : await supabase.auth.signInWithPassword({ email, password });
    if (result.error) setError(result.error.message);
    else if (mode === "forgot-password")
      setMessage("If an account exists for this email, a reset link is on its way.");
    else if (mode === "sign-up")
      setMessage("Check your inbox to confirm your account, then come back to CORTEX.");
    else void navigate({ to: search.next || "/app", replace: true });
    setBusy(false);
  };
  const oauth = async (provider: "google" | "github") => {
    setError("");
    setBusy(true);
    const { error: oauthError } = await signInWithProvider(provider);
    if (oauthError) setError(oauthError.message);
    setBusy(false);
  };
  const title =
    mode === "sign-up"
      ? "Create your workspace"
      : mode === "forgot-password"
        ? "Reset your password"
        : "Welcome back";
  const subtitle =
    mode === "sign-up"
      ? "Start building with an AI-native development workspace."
      : mode === "forgot-password"
        ? "Enter your email and we’ll send you a secure reset link."
        : "Sign in to continue where you left off.";
  return (
    <main className="auth-shell">
      <div className="auth-visual">
        <Link to="/" className="auth-brand">
          <CortexMark />
        </Link>
        <div className="auth-visual__content">
          <div className="auth-quote">
            “The best coding environment is the one that keeps your thinking in motion.”
          </div>
          <div className="auth-visual__meta">
            <span className="auth-signal" /> CORTEX / AI DEVELOPMENT WORKSPACE
          </div>
        </div>
        <div className="auth-grid-lines" />
      </div>
      <div className="auth-panel">
        <Link to="/" className="auth-mobile-brand">
          <CortexMark />
        </Link>
        <div className="auth-form-wrap">
          <Link to="/" className="auth-back">
            <FiArrowLeft /> Back to CORTEX
          </Link>
          <div className="auth-heading">
            <div className="eyebrow">
              {mode === "forgot-password"
                ? "ACCOUNT RECOVERY"
                : mode === "sign-up"
                  ? "GET STARTED"
                  : "SIGN IN"}
            </div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {message && <div className="auth-message">{message}</div>}
          {error && <div className="auth-error">{error}</div>}
          {mode !== "forgot-password" && (
            <div className="oauth-grid">
              <button type="button" onClick={() => void oauth("google")} disabled={busy}>
                <span className="oauth-google">G</span> Google
              </button>
              <button type="button" onClick={() => void oauth("github")} disabled={busy}>
                <FiGithub /> GitHub
              </button>
            </div>
          )}
          {mode !== "forgot-password" && (
            <div className="auth-divider">
              <span>or continue with email</span>
            </div>
          )}
          <form onSubmit={submit}>
            <label>
              Email address
              <div className="auth-input">
                <FiMail />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
            </label>
            {mode !== "forgot-password" && (
              <label>
                Password
                <div className="auth-input">
                  <FiLock />
                  <input
                    type="password"
                    required
                    minLength={8}
                    autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                  />
                </div>
              </label>
            )}
            {mode === "sign-in" && (
              <div className="auth-form-meta">
                <Link to="/forgot-password">Forgot password?</Link>
                <span>Protected by Supabase Auth</span>
              </div>
            )}
            <button className="button button--full auth-submit" disabled={busy}>
              {busy
                ? "Working…"
                : mode === "sign-up"
                  ? "Create account"
                  : mode === "forgot-password"
                    ? "Send reset link"
                    : "Sign in"}
              <FiArrowRight />
            </button>
          </form>
          <div className="auth-footer">
            {mode === "sign-in" ? (
              <>
                Don’t have an account? <Link to="/sign-up">Sign up</Link>
              </>
            ) : mode === "sign-up" ? (
              <>
                Already have an account? <Link to="/sign-in">Sign in</Link>
              </>
            ) : (
              <>
                Remembered your password? <Link to="/sign-in">Sign in</Link>
              </>
            )}
          </div>
        </div>
        <div className="auth-panel-foot">
          <span>© 2026 CORTEX</span>
          <span>Web-first / Git-native</span>
        </div>
      </div>
    </main>
  );
}

export function AuthCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    void getSession().then(() => void navigate({ to: "/app", replace: true }));
  }, [navigate]);
  return (
    <div className="auth-loading">
      <CortexMark />
      <p>Connecting your workspace…</p>
    </div>
  );
}

export function LogoutRoute() {
  const navigate = useNavigate();
  useEffect(() => {
    void supabase?.auth.signOut().finally(() => void navigate({ to: "/", replace: true }));
  }, [navigate]);
  return (
    <div className="auth-loading">
      <CortexMark />
      <p>Signing out…</p>
    </div>
  );
}
