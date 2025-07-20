import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Plus, Briefcase, Users, Eye, CheckCircle } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  location?: string;
  bio?: string;
  user_type: string;
}

interface Gig {
  id?: string;
  title: string;
  status?: string;
  created_at?: string;
}

type SelectQueryError = { error: true } & string;

interface Application {
  id: string;
  status: string;
  gig_id: string;
  profiles?: Profile | SelectQueryError;
  gigs?: Gig;
}

interface StartupDashboardProps {
  user: User;
  profile: Profile;
}

export const StartupDashboard = ({ user, profile }: StartupDashboardProps) => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState({
    totalGigs: 0,
    activeGigs: 0,
    totalApplications: 0,
    pendingApplications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch gigs
      const { data: gigsData } = await supabase
        .from("gigs")
        .select("*")
        .eq("startup_id", user.id)
        .order("created_at", { ascending: false });

      setGigs(gigsData || []);

      // Fetch applications for all gigs
      const { data: applicationsData } = await supabase
        .from("applications")
        .select(`
  *,
  profiles!applications_student_id_fkey (full_name, location, bio),
  gigs (title)
`)
        .in("gig_id", (gigsData || []).map(g => g.id));

      // Filter out rows where profiles is a SelectQueryError
      setApplications((applicationsData || []).filter(app => {
        const p = app.profiles;
        if (!p) return true;
        if (typeof p! === 'object' && 'error' in p!) return false;
        return true;
      }));

      // Calculate stats
      const totalGigs = gigsData?.length || 0;
      const activeGigs = gigsData?.filter(g => g.status === "active").length || 0;
      const totalApplications = applicationsData?.length || 0;
      const pendingApplications = applicationsData?.filter(a => a.status === "pending").length || 0;

      setStats({
        totalGigs,
        activeGigs,
        totalApplications,
        pendingApplications,
      });

      setLoading(false);
    };

    fetchDashboardData();
  }, [user.id]);

  const handleApplicationStatusUpdate = async (applicationId: string, status: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId);

    if (!error) {
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status } : app
        )
      );
      
      // Update stats
      setStats(prev => ({
        ...prev,
        pendingApplications: status === "pending" 
          ? prev.pendingApplications 
          : Math.max(0, prev.pendingApplications - 1),
      }));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lavender-bg pt-15">
      <div className="container mx-auto px-4 py-8 bg-lavender-bg">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.full_name}!</h1>
            <p className="text-muted-foreground">
              Manage your gigs and review applications
            </p>
          </div>
          <Link to="/create-gig">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Gig
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gigs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGigs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Gigs</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeGigs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Gigs */}
          <Card>
            <CardHeader>
              <CardTitle>Your Recent Gigs</CardTitle>
              <CardDescription>
                Manage your posted opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {gigs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No gigs posted yet
                  </p>
                  <Link to="/create-gig">
                    <Button>Create Your First Gig</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {gigs.slice(0, 3).map((gig) => (
                    <div
                      key={gig.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{gig.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Created {new Date(gig.created_at || "").toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            gig.status === "active"
                              ? "default"
                              : gig.status === "filled"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {gig.status || "Unknown"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                Review applications from students
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No applications yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{
                          app.profiles && typeof app.profiles === 'object' && 'full_name' in app.profiles
                            ? app.profiles.full_name
                            : "Unknown Student"
                        }</h4>
                        <Badge
                          variant={
                            app.status === "accepted"
                              ? "default"
                              : app.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Applied for: {app.gigs && typeof app.gigs === 'object' && 'title' in app.gigs ? app.gigs.title : "Unknown Gig"}
                      </p>
                      {app.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApplicationStatusUpdate(app.id, "accepted")}
                          >
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApplicationStatusUpdate(app.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};