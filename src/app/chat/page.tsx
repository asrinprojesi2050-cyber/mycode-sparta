"use client";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip } from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() && !image) return;
    const newHistory: any[] = [...history];
    if (message || image) {
        newHistory.push({ role: "user", parts: message, image: image });
    }

    setHistory(newHistory);
    setMessage("");
    setImage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message, image }),
      });
      const data = await response.json();
      setHistory([...newHistory, { role: "model", parts: data.text }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-1rem)]">
      <Card className="flex flex-col flex-1">
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {history.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  item.role === "user" ? "justify-end" : ""
                }`}
              >
                {item.role !== "user" && (
                  <Avatar>
                    <AvatarImage src="/path-to-ai-avatar.png" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    item.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {item.parts && <p>{item.parts}</p>}
                  {item.image && <img src={item.image} alt="user upload" className="max-w-xs rounded-lg mt-2" />}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src="/path-to-ai-avatar.png" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <p>...</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <Button variant="ghost" onClick={() => fileInputRef.current?.click()}>
                <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              type="text"
              placeholder="Type a message..."
              className="flex-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
            {image && (
                <div className="mt-2">
                    <img src={image} alt="preview" className="max-w-xs rounded-lg" />
                    <Button variant="ghost" size="sm" onClick={() => setImage(null)}>Remove</Button>
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}