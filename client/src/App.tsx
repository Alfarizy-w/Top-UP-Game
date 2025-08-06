import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import GameDetail from "./pages/game-detail";
import Order from "./pages/order";
import Checkout from "./pages/checkout";
import OrderStatus from "./pages/order-status";
import FAQ from "./pages/faq";
import About from "./pages/about";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import FloatingWhatsApp from "./components/floating-whatsapp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/game/:slug" component={GameDetail} />
      <Route path="/order" component={Order} />
      <Route path="/checkout/:orderId" component={Checkout} />
      <Route path="/order-status" component={OrderStatus} />
      <Route path="/faq" component={FAQ} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
