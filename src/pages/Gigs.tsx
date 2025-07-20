import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navigation } from "@/components/Navigation";
import { GigsList } from "@/components/gigs/GigsList";
import { GigFilters } from "@/components/gigs/GigFilters";
import { useToast } from "@/hooks/use-toast";

const Gigs = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    remote: false,
    skills: [] as string[],
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchGigs = async () => {
      let query = supabase
        .from("gigs")
        .select(`
          *,
          profiles!gigs_startup_id_fkey (full_name, location),
          gig_skills (
            skills (id, name, category)
          )
        `)
        .eq("status", "active");

      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
        );
      }

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.remote) {
        query = query.eq("is_remote", true);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load gigs",
          variant: "destructive",
        });
      } else {
        setGigs(data || []);
      }
    };

    if (!loading) {
      fetchGigs();
    }
  }, [filters, loading, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lavender-bg pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-8 bg-lavender-bg">
        <h1 className="text-3xl font-bold mb-8">Available Gigs</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <GigFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <GigsList 
              gigs={gigs} 
              user={user} 
              profile={profile}
              onGigUpdate={() => {
                // Refresh gigs when an application is submitted
                const fetchGigs = async () => {
                  const { data } = await supabase
                    .from("gigs")
                    .select(`
                      *,
                      profiles!gigs_startup_id_fkey (full_name, location),
                      gig_skills (
                        skills (id, name, category)
                      )
                    `)
                    .eq("status", "active");
                  setGigs(data || []);
                };
                fetchGigs();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gigs;