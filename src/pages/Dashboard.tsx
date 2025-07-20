import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { StartupDashboard } from "@/components/dashboard/StartupDashboard";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          navigate("/auth");
          return;
        }

        if (!session) {
          navigate("/auth");
          return;
        }

        if (mounted) {
          setSession(session);
          setUser(session.user);
          
          // Fetch user profile
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (profileError) {
            console.error("Profile error:", profileError);
            toast({
              title: "Error",
              description: "Failed to load profile",
              variant: "destructive",
            });
          } else {
            setProfile(profileData);
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        navigate("/auth");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (!session) {
            navigate("/auth");
          } else {
            // Fetch profile when auth state changes
            setTimeout(async () => {
              const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("user_id", session.user.id)
                .single();
              
              if (mounted) {
                setProfile(profileData);
              }
            }, 0);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-lavender-bg pt-20">
      <Navigation />
      {profile.user_type === "student" ? (
        <StudentDashboard user={user} profile={profile} />
      ) : (
        <StartupDashboard user={user} profile={profile} />
      )}
    </div>
  );
};

export default Dashboard;