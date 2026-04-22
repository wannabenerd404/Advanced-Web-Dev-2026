import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

export default function FormPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 flex-grow w-full py-12">
        <h1 className="text-3xl font-bold mb-2">Contact</h1>
        <p className="text-sm text-gray-500 mb-8">Send us a message and we'll get back to you.</p>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}