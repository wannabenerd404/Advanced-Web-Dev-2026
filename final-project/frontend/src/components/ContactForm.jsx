import { useState } from 'react';
import FormResponse from './FormResponse';

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  function validate(values) {
    const errs = {};
    if (!values.name || values.name.length < 2) errs.name = 'Name must be at least 2 characters';
    if (!values.email || !/\S+@\S+\.\S+/.test(values.email)) errs.email = 'Please enter a valid email address';
    if (!values.date) errs.date = 'Please select a date';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {
      name: formData.get('name'),
      email: formData.get('email'),
      date: formData.get('date'),
    };

    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setResponse({ error: data.error || 'Something went wrong.' });
      } else {
        setResponse({ success: true, id: data.data.id });
      }
    } catch (err) {
      setResponse({ error: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all";

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg max-w-xl">
      <h2 className="text-xl font-semibold text-gray-900">Contact form</h2>
      <p className="mt-1 text-sm text-gray-500">Fill in the details and we'll get back to you.</p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full name</label>
          <input name="name" type="text" placeholder="e.g., Jane Smith" className={inputClass} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Email address</label>
          <input name="email" type="email" placeholder="e.g., jane@example.com" className={inputClass} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Preferred contact date</label>
          <input name="date" type="date" className={inputClass} />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-xl px-6 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50">
          {loading ? 'Sending...' : 'Send message'}
        </button>
      </form>

      {response && <FormResponse response={response} />}
    </div>
  );
}