"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import brazilFlag from "@/app/assets/brazil.png";
import chinaFlag from "@/app/assets/china.png";
import franceFlag from "@/app/assets/france.png";
import italyFlag from "@/app/assets/italy.png";
import japanFlag from "@/app/assets/japan.png";
import spainFlag from "@/app/assets/spain.png";
import usaFlag from "@/app/assets/usa.png";
import Image from "next/image";

type Props = {
  onSubmit: (formData: any) => void;
  loading: boolean;
};

export default function ConfigEmailForm({ onSubmit, loading }: Props) {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [intention, setIntention] = useState("");
  const [tone, setTone] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState("");
  const [responseLength, setResponseLength] = useState("");
  const [hasAttachment, setHasAttachment] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !sender.trim() ||
      !recipient.trim() ||
      !subject.trim() ||
      !intention.trim() ||
      !tone ||
      !context ||
      !language ||
      !responseLength ||
      hasAttachment === null
    ) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    const emailData = {
      sender,
      recipient,
      subject,
      intention,
      tone,
      context,
      language,
      responseLength,
      hasAttachment,
    };
    onSubmit(emailData);
  };

  return (
    <Card className="md:w-1/2 shadow-2xl">
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Configurações do e-mail</CardTitle>
          <CardDescription className="text-[12px]">
            Personalize todos os aspectos da sua mensagem
          </CardDescription>
        </div>
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <HelpCircle size={20} />
          </PopoverTrigger>
          <PopoverContent>
            É necessário preencher todos os campos
          </PopoverContent>
        </Popover>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="mx-auto w-full">
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="style">Tom & estilo</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="flex flex-col gap-4 mt-6">
                <div className="space-y-2">
                  <Label>Remetente</Label>
                  <Input
                    placeholder="Seu nome ou da sua empresa"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Destinatário</Label>
                  <Input
                    placeholder="Nome de quem vai receber"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assunto</Label>
                  <Input
                    placeholder="Assunto do e-mail"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Intenção</Label>
                  <Input
                    placeholder="IA irá gerar a mensagem baseado na intenção"
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style">
              <div className="flex flex-col gap-2 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="tone">Tom da Mensagem</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="friendly">Amigável</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="assertive">Assertivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Contexto</Label>
                  <Select value={context} onValueChange={setContext}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o contexto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Empresarial</SelectItem>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="academic">Acadêmico</SelectItem>
                      <SelectItem value="get-service">
                        Solicitar serviço
                      </SelectItem>
                      <SelectItem value="get-prices">
                        Consultar valores
                      </SelectItem>
                      <SelectItem value="get-products">
                        Consultar produtos/serviços
                      </SelectItem>
                      <SelectItem value="customer-service">
                        Atendimento ao Cliente
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portuguese">
                        <div className="flex items-center gap-2">
                          <Image
                            src={brazilFlag}
                            alt="Bandeira do Brasil"
                            width={15}
                          />
                          Português
                        </div>
                      </SelectItem>
                      <SelectItem value="english">
                        <div className="flex items-center gap-2">
                          <Image
                            src={usaFlag}
                            alt="Bandeira dos EUA"
                            width={15}
                          />
                          Inglês
                        </div>
                      </SelectItem>
                      <SelectItem value="spanish">
                        <div className="flex items-center gap-2">
                          <Image
                            src={spainFlag}
                            alt="Bandeira da Espanha"
                            width={15}
                          />
                          Espanhol
                        </div>
                      </SelectItem>
                      <SelectItem value="italian">
                        <div className="flex items-center gap-2">
                          <Image
                            src={italyFlag}
                            alt="Bandeira da Itália"
                            width={15}
                          />
                          Italiano
                        </div>
                      </SelectItem>
                      <SelectItem value="french">
                        <div className="flex items-center gap-2">
                          <Image
                            src={franceFlag}
                            alt="Bandeira da França"
                            width={15}
                          />
                          Francês
                        </div>
                      </SelectItem>
                      <SelectItem value="mandarin">
                        <div className="flex items-center gap-2">
                          <Image
                            src={chinaFlag}
                            alt="Bandeira da China"
                            width={15}
                          />
                          Mandarim
                        </div>
                      </SelectItem>
                      <SelectItem value="japanese">
                        <div className="flex items-center gap-2">
                          <Image
                            src={japanFlag}
                            alt="Bandeira do Japão"
                            width={15}
                          />
                          Japonês
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <Label>Tamanho da resposta</Label>
                    <Select
                      value={responseLength}
                      onValueChange={setResponseLength}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Curta</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="long">Longa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Anexar Arquivos?</Label>
                    <Select
                      value={
                        hasAttachment === null
                          ? ""
                          : hasAttachment
                            ? "yes"
                            : "no"
                      }
                      onValueChange={(value) =>
                        setHasAttachment(value === "yes")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Sim</SelectItem>
                        <SelectItem value="no">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-end mt-4 gap-2">
          {errorMessage && (
            <p className="text-red-600 text-sm ">{errorMessage}</p>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Gerando..." : "Gerar e-mail"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
