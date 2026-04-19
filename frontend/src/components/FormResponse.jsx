export default function FormResponse({ response }) {
  if (response?.error) {
    return (
      <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
        <p className="text-sm font-semibold text-red-900">❌ Something went wrong</p>
        <p className="text-xs text-red-700 mt-1">{response.error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
      <p className="text-sm font-semibold text-green-900">✅ Message sent successfully!</p>
      <p className="text-xs text-green-700 mt-1">
        Your message was saved to the database. (ID: {response?.id})
      </p>
    </div>
  );
}