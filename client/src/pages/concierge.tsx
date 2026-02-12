import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, User, Bot, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function ConciergePage() {
  const [phone, setPhone] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/concierge/webhook", {
        phone,
        message,
      });
      return res.json();
    },
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    },
  });

  const handleSend = () => {
    if (!phone || !input) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    mutation.mutate(userMsg);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl h-screen flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            DeliWer Concierge MVP
          </CardTitle>
          <CardDescription>
            Simulate WhatsApp/Instagram interactions
          </CardDescription>
          <div className="mt-2">
            <Input
              placeholder="Enter Phone Number to start..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="max-w-xs"
              data-testid="input-phone"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 flex gap-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="w-5 h-5 shrink-0" />
                    ) : (
                      <User className="w-5 h-5 shrink-0" />
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground mt-8">
                  Type "Just got Ejari" to begin the concierge flow.
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!phone || mutation.isPending}
              data-testid="input-message"
            />
            <Button
              onClick={handleSend}
              disabled={!phone || mutation.isPending}
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}