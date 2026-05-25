import { type FormEvent, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Edit2, Plus, Search, Trash2, X } from 'lucide-react';

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  description: string;
};

const sampleBooks: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    publishedYear: 2008,
    description: 'A handbook of agile software craftsmanship for developers.',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    isbn: '9780201616224',
    publishedYear: 1999,
    description: 'Practical techniques for mastering modern software craft.',
  },
  {
    id: 3,
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    isbn: '9780321125217',
    publishedYear: 2003,
    description: 'Tactical patterns and practices for building complex systems.',
  },
];

export default function BooksPage() {
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);

  const filteredBooks = useMemo(() => {
    return sampleBooks.filter((book) =>
      [book.title, book.author, book.isbn]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  const closeModals = () => {
    setIsAddModalOpen(false);
    setEditingBook(null);
    setDeleteBook(null);
  };

  const handleAddBook = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to backend API on Day 5 and call POST /books
    closeModals();
  };

  const handleEditBook = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Connect to backend API on Day 5 and call PUT /books/:id
    closeModals();
  };

  const handleDeleteBook = () => {
    // TODO: Connect to backend API on Day 5 and call DELETE /books/:id
    closeModals();
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Books</h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage the books connected to your account. The UI is ready for API integration on Day 5.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              label=""
              placeholder="Search books"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 border-none bg-transparent p-0 text-sm placeholder:text-slate-400 focus:ring-0"
            />
          </div>
          <Button variant="primary" size="lg" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Title</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Author</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">ISBN</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Year</th>
              <th className="px-5 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <div className="font-medium text-slate-900">{book.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{book.description}</div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-700">{book.author}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{book.isbn}</td>
                <td className="px-5 py-4 text-sm text-slate-700">{book.publishedYear}</td>
                <td className="px-5 py-4 text-sm text-slate-700">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingBook(book)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteBook(book)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  No books match the current search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(isAddModalOpen || editingBook) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingBook ? 'Edit book details' : 'Add new book'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingBook
                    ? 'Update the selected book record. API integration comes on Day 5.'
                    : 'Fill in book details and save to add a new entry once the backend is wired.'}
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
            <form
              onSubmit={editingBook ? handleEditBook : handleAddBook}
              className="grid gap-4 md:grid-cols-2"
            >
              <Input
                label="Title"
                name="title"
                defaultValue={editingBook?.title}
                placeholder="Enter book title"
              />
              <Input
                label="Author"
                name="author"
                defaultValue={editingBook?.author}
                placeholder="Enter author name"
              />
              <Input
                label="ISBN"
                name="isbn"
                defaultValue={editingBook?.isbn}
                placeholder="123-4567890123"
              />
              <Input
                label="Published year"
                name="publishedYear"
                defaultValue={editingBook?.publishedYear.toString()}
                placeholder="2024"
              />
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={editingBook?.description}
                  placeholder="Write a short description of the book"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-3 pt-2">
                <Button variant="outline" size="lg" onClick={closeModals} type="button">
                  Cancel
                </Button>
                <Button variant="primary" size="lg" type="submit">
                  Save book
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">Delete book</h2>
            <p className="mt-2 text-sm text-slate-500">
              Confirm deletion of <span className="font-semibold">{deleteBook.title}</span>. This action will be wired to the backend on Day 5.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" size="lg" onClick={closeModals}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleDeleteBook}>
                Delete book
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
