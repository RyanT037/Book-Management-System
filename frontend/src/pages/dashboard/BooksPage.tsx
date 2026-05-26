import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Edit2, Plus, Search, Trash2, X } from 'lucide-react';
import { bookService, type Book, type CreateBookPayload } from '../../services/book.service';
import { z } from 'zod';

const bookFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  isbn: z.string().min(1, 'ISBN is required'),
  publishedYear: z.coerce
    .number({ invalid_type_error: 'Published year is required' })
    .int('Published year must be a whole number')
    .min(1000, 'Enter a valid year'),
  description: z.string().min(1, 'Description is required'),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      isbn: '',
      publishedYear: 2024,
      description: '',
    },
  });

  useEffect(() => {
    async function loadBooks() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await bookService.list();
        setBooks(data);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return books.filter((book) =>
      [book.title, book.author, book.isbn, book.description]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm),
    );
  }, [books, search]);

  const openAddBook = () => {
    setIsAddModalOpen(true);
    setEditingBook(null);
    reset({
      title: '',
      author: '',
      isbn: '',
      publishedYear: new Date().getFullYear(),
      description: '',
    });
  };

  const openEditBook = (book: Book) => {
    setIsAddModalOpen(true);
    setEditingBook(book);
    reset({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
      description: book.description,
    });
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setEditingBook(null);
    setDeleteBook(null);
  };

  const handleAddBook = async (data: BookFormValues) => {
    setIsSaving(true);
    setError(null);

    try {
      const payload: CreateBookPayload = {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        publishedYear: data.publishedYear,
        description: data.description,
      };
      const newBook = await bookService.create(payload);
      setBooks((current) => [newBook, ...current]);
      toast.success('Book created successfully');
      closeModals();
    } catch (err) {
      setError('Unable to add book. Please check your input and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditBook = async (data: BookFormValues) => {
    if (!editingBook) return;

    setIsSaving(true);
    setError(null);

    try {
      const updatedBook = await bookService.update(editingBook.id, {
        title: data.title,
        author: data.author,
        isbn: data.isbn,
        publishedYear: data.publishedYear,
        description: data.description,
      });
      setBooks((current) =>
        current.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
      );
      toast.success('Book updated successfully');
      closeModals();
    } catch (err) {
      setError('Unable to update book. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!deleteBook) return;
    setIsSaving(true);
    setError(null);

    try {
      await bookService.remove(deleteBook.id);
      setBooks((current) => current.filter((book) => book.id !== deleteBook.id));
      toast.success('Book deleted successfully');
      closeModals();
    } catch (err) {
      setError('Unable to delete book. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Books</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage books. Add, edit, and delete books.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              label=""
              placeholder="Search books"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-56 border-none bg-transparent p-0 text-sm placeholder:text-slate-400 focus:ring-0"
            />
          </div>
          <Button variant="primary" size="lg" onClick={openAddBook}>
            <Plus className="h-4 w-4" />
            Add Book
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

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
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  Loading books...
                </td>
              </tr>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
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
                      <Button variant="secondary" size="sm" onClick={() => openEditBook(book)}>
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setDeleteBook(book)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-slate-500">
                  {books.length === 0 ? 'No books found. Add your first book to get started.' : 'No books match the current search.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingBook ? 'Edit book details' : 'Add new book'}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingBook
                    ? 'Update the selected book record using the backend.'
                    : 'Fill in book details and save it to the backend.'}
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
              onSubmit={handleSubmit(editingBook ? handleEditBook : handleAddBook)}
              className="grid gap-4 md:grid-cols-2"
            >
              <Input
                label="Title"
                type="text"
                placeholder="Enter book title"
                error={errors.title?.message}
                {...register('title')}
              />
              <Input
                label="Author"
                type="text"
                placeholder="Enter author name"
                error={errors.author?.message}
                {...register('author')}
              />
              <Input
                label="ISBN"
                type="text"
                placeholder="123-4567890123"
                error={errors.isbn?.message}
                {...register('isbn')}
              />
              <Input
                label="Published year"
                type="number"
                placeholder="2024"
                error={errors.publishedYear?.message}
                {...register('publishedYear', { valueAsNumber: true })}
              />
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  placeholder="Write a short description of the book"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-3 pt-2">
                <Button variant="outline" size="lg" onClick={closeModals} type="button">
                  Cancel
                </Button>
                <Button variant="primary" size="lg" type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save book'}
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
              Confirm deletion of <span className="font-semibold">{deleteBook.title}</span>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <Button variant="outline" size="lg" onClick={closeModals}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" onClick={handleDeleteBook} disabled={isSaving}>
                {isSaving ? 'Deleting…' : 'Delete book'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
