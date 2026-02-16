import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Partners() {
  const [agentName, setAgentName] = useState("");
  const [campaign, setCampaign] = useState("general");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    setAgentName(value);
  };

  const generatedLink = agentName 
    ? `${window.location.origin}/welcome?ref=${agentName}&utm_source=broker&utm_medium=referral&utm_campaign=${campaign}`
    : "";

  const copyToClipboard = async () => {
    if (!generatedLink) return;
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Broker Partner Portal</h1>
      
      <div className="space-y-8">
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle>Referral Link Generator</CardTitle>
            <CardDescription>Generate your personal referral link to share with clients.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                placeholder="e.g. john_doe"
                value={agentName}
                onChange={handleAgentNameChange}
                data-testid="input-agent-name"
              />
              <p className="text-xs text-muted-foreground">Use lowercase and underscores only.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign">Service Campaign</Label>
              <Select value={campaign} onValueChange={setCampaign}>
                <SelectTrigger id="campaign" data-testid="select-campaign">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="ejari">Ejari</SelectItem>
                  <SelectItem value="relocation">Relocation</SelectItem>
                  <SelectItem value="movein">Move-In</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-2">
              <Label>Your Referral Link</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={generatedLink}
                  placeholder="Generated link will appear here..."
                  className="bg-muted"
                  data-testid="input-generated-link"
                />
                <Button 
                  onClick={copyToClipboard} 
                  disabled={!generatedLink}
                  size="icon"
                  data-testid="button-copy-link"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Client Protection Guarantee</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                We do not market real estate
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                We do not collect listings
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                We operate strictly post-closing
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                Your client remains your client
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
