import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your account details and profile settings. API integration will be connected on Day 5.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <span className="text-lg font-bold">AJ</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Ava Johnson</p>
              <p className="text-sm text-slate-500">Administrator</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Email</p>
              <p className="mt-2 text-sm text-slate-700">ava.johnson@example.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Username</p>
              <p className="mt-2 text-sm text-slate-700">ava_j</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Joined</p>
              <p className="mt-2 text-sm text-slate-700">March 2025</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Edit account details</h2>
              <p className="mt-1 text-sm text-slate-500">
                Change your profile information and save it once backend wiring is available.
              </p>
            </div>
          </div>

          <form className="mt-6 grid gap-4">
            <Input label="Full name" name="name" defaultValue="Ava Johnson" />
            <Input label="Username" name="username" defaultValue="ava_j" />
            <Input label="Email" type="email" name="email" defaultValue="ava.johnson@example.com" />
            <div>
              <label className="block text-sm font-medium text-slate-700">New password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              />
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-3">
              <Button variant="outline" size="lg" type="button">
                Cancel
              </Button>
              <Button variant="primary" size="lg" type="button">
                Save changes
              </Button>
            </div>
          </form>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">Backend note</p>
            <p className="mt-2 text-sm text-slate-500">
              TODO: Connect this page to /users/:id or a profile endpoint on Day 5 so changes persist.
            </p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
