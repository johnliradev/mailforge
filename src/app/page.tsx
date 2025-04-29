"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ConfigEmailForm from "@/components/ConfigEmailForm";
import EmailOutput from "@/components/EmailOutput";
import { useState } from "react";

export default function Home() {
  const [emailResult, setEmailResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async (formData: {
    sender: string;
    recipient: string;
    subject: string;
    intention: string;
    tone: string;
    context: string;
    language: string;
    responseLength: string;
    hasAttachment: boolean;
  }) => {
    setLoading(true);
    setError(null);

    setEmailResult("");
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.email || "Erro ao gerar o e-mail.");

      setEmailResult(data.email);
    } catch (err: any) {
      setError(err.message || "Erro ao gerar o e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid-background pb-5">
      <Navbar />
      <Hero />
      <div className="flex w-[80%] max-w-4xl mx-auto flex-col sm:flex-row gap-10 justify-center">
        <ConfigEmailForm onSubmit={generateEmail} loading={loading} />
        <EmailOutput email={emailResult} error={error} loading={loading} />
      </div>
    </div>
  );
}
