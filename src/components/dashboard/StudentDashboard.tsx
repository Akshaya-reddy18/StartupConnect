import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { User, MapPin, Clock, DollarSign, Star } from "lucide-react";

interface StudentDashboardProps {
  user: any;
  profile: any;
}

export const StudentDashboard = ({ user, profile }: StudentDashboardProps) => {
  const [applications, setApplications] = useState<any[]>([]);
  const [recommendedGigs, setRecommendedGigs] = useState<any[]>([]);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch applications
      const { data: appsData } = await supabase
        .from("applications")
        .select(`
          *,
          gigs (
            id,
            title,
            description,
            stipend_amount,
            stipend_currency,
            location,
            is_remote,
            profiles!gigs_startup_id_fkey (full_name)
          )
        `)
        .eq("student_id", user.id)
        .order("created_at", { ascending: false });

      setApplications(appsData || []);

      // Fetch user skills
      const { data: skillsData } = await supabase
        .from("user_skills")
        .select(`
          proficiency_level,
          skills (id, name, category)
        `)
        .eq("user_id", user.id);

      setUserSkills(skillsData || []);

      // Fetch recommended gigs (simplified - just get active gigs)
      const { data: gigsData } = await supabase
        .from("gigs")
        .select(`
          *,
          profiles!gigs_startup_id_fkey (full_name, location),
          gig_skills (
            skills (name)
          )
        `)
        .eq("status", "active")
        .limit(3);

      setRecommendedGigs(gigsData || []);
      setLoading(false);
    };

    fetchDashboardData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const profileCompletion = Math.min(
    100,
    (profile.bio ? 25 : 0) +
    (profile.location ? 25 : 0) +
    (userSkills.length > 0 ? 25 : 0) +
    (profile.full_name ? 25 : 0)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile.full_name}!</h1>
        <p className="text-muted-foreground">
          Track your applications and discover new opportunities
        </p>
      </div>

      {/* Profile Completion */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Completion
          </CardTitle>
          <CardDescription>
            Complete your profile to get better matches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>{profileCompletion}% Complete</span>
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </Link>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                Track the status of your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No applications yet
                  </p>
                  <Link to="/gigs">
                    <Button>Browse Gigs</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{app.gigs.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {app.gigs.profiles.full_name}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          {app.gigs.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {app.gigs.location}
                            </span>
                          )}
                          {app.gigs.stipend_amount && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {app.gigs.stipend_amount} {app.gigs.stipend_currency}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
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
                        {app.match_score && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {Math.round(app.match_score * 100)}% match
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Gigs */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendedGigs.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No recommendations yet
                </p>
              ) : (
                <div className="space-y-4">
                  {recommendedGigs.map((gig) => (
                    <div key={gig.id} className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{gig.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {gig.profiles.full_name}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {gig.gig_skills.slice(0, 3).map((skillObj: any, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skillObj.skills.name}
                          </Badge>
                        ))}
                      </div>
                      <Link to="/gigs">
                        <Button size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
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