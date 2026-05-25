import { type FormEvent, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Edit2, Plus, Trash2, X } from 'lucide-react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'Ava Johnson',
    username: 'ava_j',
    email: 'ava.johnson@example.com',
    role: 'ADMIN',
  },
  {
    id: 2,
    name: 'Marcus Lee',
    username: 'marcusl',
    email: 'marcus.lee@example.com',
    role: 'USER',
  },
  {
    id: 3,
    name: 'Nadia Patel',
    username: 'nadia_p',
    email: 'nadia.patel@example.com',
    role: 'USER',
  },
];

export default function UsersPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const closeModals = () => {
    setIsAddOpen(false);
    setEditingUser(null);
    setDeleteUser(null);
  };

  const handleAddUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to backend API on Day 5 and call POST /users
    closeModals();
  };

  const handleEditUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to backend API on Day 5 and call PATCH /users/:id
    closeModals();
  };

  const handleDeleteUser = () => {
    // TODO: Connect to backend API on Day 5 and call DELETE /users/:id
    closeModals();
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            Design user management UI for account and role administration. Backend wiring will be added on Day 5.
          </p>
        </div>

        <Button variant="primary" size="lg" onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4" />
          Add user
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Name</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Username</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {sampleUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4 text-sm text-slate-700">{user.name}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{user.username}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{user.email}</td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === 'ADMIN'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" onClick={() => setEditingUser(user)}>
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setDeleteUser(user)}>
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(isAddOpen || editingUser) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingUser ? 'Edit user account' : 'Create new user'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingUser
                    ? 'Update the selected user profile. Connect this form to the backend on Day 5.'
                    : 'Add a new user. This form is UI-only until API integration.'}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-500 transition hover:bg-slate-100"
                onClick={closeModals}
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={editingUser ? handleEditUser : handleAddUser} className="grid gap-4 md:grid-cols-2">
              <Input
                label="Full name"
                name="name"
                defaultValue={editingUser?.name}
                placeholder="Jane Doe"
              />
              <Input
                label="Username"
                name="username"
                defaultValue={editingUser?.username}
                placeholder="jane_doe"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={editingUser?.email}
                placeholder="jane.doe@example.com"
              />
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-slate-700">Role</label>
                <select
                  id="role"
                  name="role"
                  defaultValue={editingUser?.role ?? 'USER'}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-3 pt-2">
                <Button variant="outline" size="lg" onClick={closeModals} type="button">
                  Cancel
                </Button>
                <Button variant="primary" size="lg" type="submit">
                  Save user
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">Delete user</h2>
            <p className="mt-2 text-sm text-slate-500">
              Permanently remove <span className="font-semibold">{deleteUser.name}</span> from the system. Backend delete logic is planned for Day 5.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" size="lg" onClick={closeModals}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleDeleteUser}>
                Delete user
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
