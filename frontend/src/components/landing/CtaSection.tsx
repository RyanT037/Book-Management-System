import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

export function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        {/* Main CTA card with gradient background and rounded corners */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-cta px-8 py-14 text-center text-white shadow-card-hover sm:px-12">
          {/* Decorative background blur elements */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl"
          />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to modernize your library?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/90">
            Create an account today and explore a professional dashboard built
            for real library workflows.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/register">
              <Button
                variant="secondary"
                size="lg"
                className="group border-white/80 shadow-md hover:shadow-lg"
              >
                Register Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 hover:text-white"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
