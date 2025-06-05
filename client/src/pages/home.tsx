import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Code, Server, ArrowRight } from "lucide-react";

interface StatusData {
  frontend: {
    status: string;
    port: number;
    environment: string;
  };
  backend: {
    status: string;
    port: number;
    environment: string;
  };
}

export default function Home() {
  const { data: status, isLoading } = useQuery<StatusData>({
    queryKey: ["/api/status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getStatusBadge = (status: string) => {
    if (status === "connected") {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-mono text-sm font-medium">{ }</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">Empty Project</h1>
                <p className="text-sm text-slate-500 font-mono">Ready for development</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                ● Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Project Successfully Initialized</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Your empty project structure is ready. Both frontend and backend are configured with minimal boilerplate and basic routing.
          </p>
        </div>

        {/* Status Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Frontend Status */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">React Frontend</h3>
                  <p className="text-sm text-slate-500 font-mono">
                    Port {isLoading ? "..." : status?.frontend?.port || "5000"}
                  </p>
                </div>
              </div>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                getStatusBadge(status?.frontend?.status || "unknown")
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Routing</span>
                <span className="text-sm font-mono text-green-600">Wouter</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">State</span>
                <span className="text-sm font-mono text-slate-400">Empty</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-slate-600">Components</span>
                <span className="text-sm font-mono text-slate-400">Ready to build</span>
              </div>
            </div>
          </Card>

          {/* Backend Status */}
          <Card className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Express Backend</h3>
                  <p className="text-sm text-slate-500 font-mono">
                    Port {isLoading ? "..." : status?.backend?.port || "5000"}
                  </p>
                </div>
              </div>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                getStatusBadge(status?.backend?.status || "unknown")
              )}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Routes</span>
                <span className="text-sm font-mono text-green-600">Basic setup</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Middleware</span>
                <span className="text-sm font-mono text-slate-400">Minimal</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Project Structure */}
        <Card className="p-8 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Project Structure</h3>
          <div className="bg-slate-50 rounded-lg p-6 font-mono text-sm">
            <div className="text-slate-400 mb-2">├── client/</div>
            <div className="text-slate-400 mb-2 ml-4">├── src/</div>
            <div className="text-slate-400 mb-2 ml-8">├── components/</div>
            <div className="text-slate-400 mb-2 ml-8">├── pages/</div>
            <div className="text-slate-400 mb-2 ml-8">├── App.tsx</div>
            <div className="text-slate-400 mb-2 ml-8">└── main.tsx</div>
            <div className="text-slate-400 mb-2 ml-4">└── package.json</div>
            <div className="text-slate-400 mb-2">├── server/</div>
            <div className="text-slate-400 mb-2 ml-4">├── routes.ts</div>
            <div className="text-slate-400 mb-2 ml-4">├── index.ts</div>
            <div className="text-slate-400">└── README.md</div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="bg-slate-900 text-white p-8">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <h4 className="font-medium mb-1">Add Components</h4>
                <p className="text-sm text-slate-300">Start building your React components and pages</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <h4 className="font-medium mb-1">Define API Routes</h4>
                <p className="text-sm text-slate-300">Create your backend endpoints and business logic</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <h4 className="font-medium mb-1">Connect & Deploy</h4>
                <p className="text-sm text-slate-300">Link frontend to backend and deploy your application</p>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Empty project ready for development
            </p>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span className="font-mono">v1.0.0</span>
              <span>•</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
