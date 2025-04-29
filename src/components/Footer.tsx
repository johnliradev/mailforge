// components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full  bottom-0 py-6 text-center text-sm text-muted-foreground">
      <p>
        Feito por{" "}
        <a
          href="https://github.com/seu-usuario"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-primary"
        >
           John Lira
        </a>
      </p>
    </footer>
  );
}
