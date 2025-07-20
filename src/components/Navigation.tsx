import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        
        setProfile(profileData);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", session.user.id)
          .single();
        
        setProfile(profileData);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-card-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="font-bold text-xl">StartupConnect</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link 
                  to="/features" 
                  className={`transition-colors ${location.pathname === '/features' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Features
                </Link>
                <Link 
                  to="/how-it-works" 
                  className={`transition-colors ${location.pathname === '/how-it-works' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  How it Works
                </Link>
                <Link 
                  to="/pricing" 
                  className={`transition-colors ${location.pathname === '/pricing' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Pricing
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/dashboard" 
                  className={`transition-colors ${location.pathname === '/dashboard' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/gigs" 
                  className={`transition-colors ${location.pathname === '/gigs' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Browse Gigs
                </Link>
                {profile?.user_type === "startup" && (
                  <Link 
                    to="/create-gig" 
                    className={`transition-colors ${location.pathname === '/create-gig' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Create Gig
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className={`transition-colors ${location.pathname === '/profile' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-card-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {!user ? (
                <>
                  <Link 
                    to="/features" 
                    className={`transition-colors py-2 ${location.pathname === '/features' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className={`transition-colors py-2 ${location.pathname === '/how-it-works' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Link 
                    to="/pricing" 
                    className={`transition-colors py-2 ${location.pathname === '/pricing' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <div className="pt-4 border-t border-card-border">
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" className="justify-start" asChild>
                        <Link to="/auth">Sign In</Link>
                      </Button>
                      <Button variant="hero" className="justify-start" asChild>
                        <Link to="/auth">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    className={`transition-colors py-2 ${location.pathname === '/dashboard' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/gigs" 
                    className={`transition-colors py-2 ${location.pathname === '/gigs' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Gigs
                  </Link>
                  {profile?.user_type === "startup" && (
                    <Link 
                      to="/create-gig" 
                      className={`transition-colors py-2 ${location.pathname === '/create-gig' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Gig
                    </Link>
                  )}
                  <Link 
                    to="/profile" 
                    className={`transition-colors py-2 ${location.pathname === '/profile' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="pt-4 border-t border-card-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
                      <Button variant="ghost" size="sm" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}