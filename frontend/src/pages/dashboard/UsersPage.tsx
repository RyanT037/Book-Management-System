import { type FormEvent, useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Edit2, Plus, Trash2, X } from 'lucide-react';
import { userService, type User } from '../../services/users.service';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Fetch the list of users from the backend on component mount
  useEffect(() => {
    let active = true;

    setIsLoading(true);
    userService
      .list()
      .then((data) => {
        if (!active) return;
        setUsers(data);
        setError(null);
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to load users. Please refresh the page and try again.');
      })
      .finally(() => {
        if (!active) return;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Reset all modal states and clear form errors
  const closeModals = () => {
    setIsAddOpen(false);
    setEditingUser(null);
    setDeleteUser(null);
    setFormError(null);
  };

  // Handle the creation of a new user account
  const handleAddUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() ?? '';
    const username = formData.get('username')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const role = (formData.get('role')?.toString() ?? 'USER') as User['role'];
    const password = formData.get('password')?.toString() ?? '';

    if (!name || !username || !email || !password) {
      setFormError('Name, username, email, and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const newUser = await userService.create({ name, username, email, role, password });
      setUsers((current) => [...current, newUser]);
      closeModals();
      setError(null);
    } catch {
      setFormError('Unable to create user. Please verify the details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle updating an existing user's information
  const handleEditUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingUser) return;

    setFormError(null);
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name')?.toString().trim() ?? '';
    const username = formData.get('username')?.toString().trim() ?? '';
    const email = formData.get('email')?.toString().trim() ?? '';
    const role = (formData.get('role')?.toString() ?? editingUser.role) as User['role'];
    const password = formData.get('password')?.toString();

    if (!name || !username || !email) {
      setFormError('Name, username, and email are required.');
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await userService.update(editingUser.id, {
        name,
        username,
        email,
        role,
        password: password?.trim() ? password : undefined,
      });
      setUsers((current) => current.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      closeModals();
      setError(null);
    } catch {
      setFormError('Unable to update user. Please verify the details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle the deletion of a user account
  const handleDeleteUser = async () => {
    if (!deleteUser) return;

    setIsLoading(true);
    try {
      await userService.remove(deleteUser.id);
      setUsers((current) => current.filter((user) => user.id !== deleteUser.id));
      closeModals();
      setError(null);
    } catch {
      setError('Unable to delete user. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            User management; add, edit, and delete users.
          </p>
        </div>

        <Button variant="primary" size="lg" onClick={() => setIsAddOpen(true)}>
          <Plus className="h-4 w-4" />
          Add user
        </Button>
      </div>

      {/* Users Table */}
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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-rose-600">
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-4 text-sm text-slate-700">{user.name}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{user.username}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{user.email}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role === 'ADMIN'
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
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
                    ? 'Update the selected user profile details.'
                    : 'Add a new user to the system.'}
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
                placeholder="Richard Muti"
              />
              <Input
                label="Username"
                name="username"
                defaultValue={editingUser?.username}
                placeholder="Ritchie37"
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={editingUser?.email}
                placeholder="ritchiemuti@example.com"
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
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter a password'}
              />
              {formError && (
                <div className="md:col-span-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {formError}
                </div>
              )}
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter a password'}
              />
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

      {/* Delete Confirmation Modal */}
      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">Delete user</h2>
            <p className="mt-2 text-sm text-slate-500">
              Permanently remove <span className="font-semibold">{deleteUser.name}</span>
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
