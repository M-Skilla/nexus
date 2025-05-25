export default function VerifyEmailPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="bg-card text-card-foreground w-full max-w-md space-y-8 rounded-lg p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground mt-2">
            We've sent a verification link to your email address. Please check
            your inbox (and spam folder) and click the link to complete your
            registration.
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Didn&apos;t receive the email? You might be able to request a new
            one after some time or contact support if the issue persists.
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          {/* Optional: Add a logo here if you have one */}
          {/* <img src="/nexus.svg" alt="Nexus Logo" className="w-24 h-24" /> */}
        </div>
      </div>
    </div>
  );
}
