import React, { useState } from "react";

const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("All fields are required.");
      return;
    }


    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      setStatus("succeeded");
      setName("");
      setEmail("");
      setMessage("");
      setError(null);
    } catch  {
      setStatus("failed");
      setError("Failed to send message. Try again later.");
    }
  };

  return (
    <section
      id="contact-us"
      className="bg-gray-100 py-16 px-6 md:px-24 font-outfit flex flex-col md:flex-row gap-12 md:gap-24 items-start md:items-center"
    >
    
      <aside className="w-full md:w-1/2 flex flex-col gap-8">
        <header>
          <h2 className="text-primary text-3xl md:text-4xl font-bold mb-2">
            Get In Touch With Us
          </h2>
          <p className="text-secondary text-2xl md:text-3xl">We Are Here To Help</p>
        </header>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-primary text-2xl md:text-3xl">📞</span>
            <p className="text-primary text-lg md:text-xl">
              For urgent inquiries: 07********0
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="text-white bg-primary p-3 rounded-lg hover:bg-secondary transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter" className="text-white bg-primary p-3 rounded-lg hover:bg-secondary transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-white bg-primary p-3 rounded-lg hover:bg-secondary transition">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="Instagram" className="text-white bg-primary p-3 rounded-lg hover:bg-secondary transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </aside>

      <article className="w-full md:w-1/2 flex flex-col gap-6">
        <header>
          <h3 className="text-secondary text-2xl md:text-4xl font-bold">Send Us a Message</h3>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="flex flex-col gap-1">
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={5}
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-white py-3 px-6 rounded-xl text-lg md:text-xl hover:bg-secondary transition"
          >
            Send Message
          </button>
        </form>

        {/* Feedback */}
        {status === "loading" && <p className="text-primary mt-2">Sending...</p>}
        {status === "succeeded" && (
          <div className="mt-2 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
            Your message has been sent successfully!
          </div>
        )}
        {status === "failed" && (
          <div className="mt-2 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            {error}
          </div>
        )}
      </article>
    </section>
  );
};

export default ContactSection;
