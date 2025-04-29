import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";

type Props = {
  email: string | null;
  error: string | null;
  loading: boolean;
};

export default function EmailOutput({ email, error, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!email) return;
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="md:w-1/2 shadow-2xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-lg font-semibold">E-mail Gerado</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={handleCopy}
          disabled={!email}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder={
            loading
              ? "Gerando e-mail..."
              : error
                ? error
                : "O e-mail gerado aparecerá aqui..."
          }
          value={email ?? ""}
          readOnly
          className={`h-[380px] max-h-[380px] resize-none ${
            error ? "text-red-500" : ""
          }`}
        />
        <p className="text-[12px] text-neutral-400 font-medium pt-4">
          Dica: Personalize o tom e o estilo na aba "Tom & Estilo"
        </p>
      </CardContent>
    </Card>
  );
}
