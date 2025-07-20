import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navigation } from "@/components/Navigation";
import { CreateGigForm } from "@/components/gigs/CreateGigForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CreateGig = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
        navigate("/dashboard");
      } else if (profileData.user_type !== "startup") {
        toast({
          title: "Access Denied",
          description: "Only startups can create gigs",
          variant: "destructive",
        });
        navigate("/dashboard");
      } else {
        setProfile(profileData);
      }
      
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
    <div className="min-h-screen bg-lavender-bg pt-24">
      <Navigation />
      <div className="container mx-auto px-4 py-8 bg-lavender-bg">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Create New Gig</CardTitle>
            <CardDescription>
              Post an internship or project opportunity for students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateGigForm 
              user={user} 
              onGigCreated={() => {
                toast({
                  title: "Success",
                  description: "Gig created successfully!",
                });
                navigate("/dashboard");
              }} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateGig;