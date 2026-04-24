import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Mail, Globe, ExternalLink } from "lucide-react";

const footerLinks = {
  Product:  [{ label: "Materials",  to: "/materials" }, { label: "Upload",     to: "/upload"    }, { label: "Dashboard", to: "/dashboard" }],
  Account:  [{ label: "Sign up",    to: "/register"  }, { label: "Log in",     to: "/login"     }, { label: "Profile",   to: "/profile"   }],
  Projects: [{ label: "Campus Projects", to: "/#projects" }, { label: "AI Study Assistant", to: "/#projects" }, { label: "Student Community", to: "/#projects" }],
};

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 border-b border-border pb-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                <GraduationCap className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-xl font-black">Campus Helper</p>
                <p className="text-xs font-semibold text-muted-foreground">Professional student collaboration platform</p>
              </div>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              A modern and professional place for Ethiopian students to learn, share materials, and get help from peers and AI.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-black uppercase tracking-wider">Product</p>
            <ul className="space-y-2">
              {footerLinks.Product.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-black uppercase tracking-wider">Account</p>
            <ul className="space-y-2">
              {footerLinks.Account.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <p className="mb-3 text-xs font-black uppercase tracking-wider">Projects</p>
            <ul className="space-y-2">
              {footerLinks.Projects.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="interactive-card rounded-2xl border border-border bg-card p-5">
              <h4 className="font-bold">Join now</h4>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">Get full access to materials, chat, and AI support.</p>
              <Button asChild className="btn-yellow w-full">
                <Link to="/register">Create free account</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Campus Helper. Built for Ethiopian students.</p>
          <div className="flex items-center gap-3">
            <a href="mailto:support@campushelper.et" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4" /></a>
            <a href="https://campushelper.et" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><Globe className="h-4 w-4" /></a>
            <a href="https://campushelper.et/about" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground"><ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
