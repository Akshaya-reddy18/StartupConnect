import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Clock, DollarSign, Building, Calendar, ExternalLink } from "lucide-react";

interface GigsListProps {
  gigs: any[];
  user: any;
  profile: any;
  onGigUpdate: () => void;
}

export const GigsList = ({ gigs, user, profile, onGigUpdate }: GigsListProps) => {
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const { toast } = useToast();

  const handleApply = async () => {
    if (!selectedGig || !user) return;

    setApplying(true);
    try {
      // Check if already applied
      const { data: existingApp } = await supabase
        .from("applications")
        .select("id")
        .eq("student_id", user.id)
        .eq("gig_id", selectedGig.id)
        .single();

      if (existingApp) {
        toast({
          title: "Already Applied",
          description: "You have already applied to this gig",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("applications")
        .insert({
          student_id: user.id,
          gig_id: selectedGig.id,
          cover_letter: coverLetter,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Application submitted successfully!",
      });

      setCoverLetter("");
      setSelectedGig(null);
      onGigUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setApplying(false);
    }
  };

  if (gigs.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No gigs found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {gigs.map((gig) => (
        <Card key={gig.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{gig.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4" />
                  {gig.profiles.full_name}
                </CardDescription>
              </div>
              <div className="text-right">
                {gig.stipend_amount && (
                  <div className="flex items-center gap-1 text-lg font-semibold">
                    <DollarSign className="h-4 w-4" />
                    {gig.stipend_amount} {gig.stipend_currency}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground line-clamp-2">
              {gig.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {gig.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {gig.location}
                </span>
              )}
              {gig.is_remote && (
                <Badge variant="outline">Remote</Badge>
              )}
              {gig.duration_weeks && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {gig.duration_weeks} weeks
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Posted {new Date(gig.created_at).toLocaleDateString()}
              </span>
            </div>

            {gig.gig_skills && gig.gig_skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {gig.gig_skills.map((skillObj: any, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skillObj.skills.name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{gig.title}</DialogTitle>
                    <DialogDescription>
                      {gig.profiles.full_name} • Posted {new Date(gig.created_at).toLocaleDateString()}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {gig.description}
                      </p>
                    </div>

                    {gig.requirements && (
                      <div>
                        <h4 className="font-medium mb-2">Requirements</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {gig.requirements}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Details</h4>
                        <div className="space-y-2 text-sm">
                          {gig.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{gig.location}</span>
                            </div>
                          )}
                          {gig.is_remote && (
                            <Badge variant="outline">Remote Work Available</Badge>
                          )}
                          {gig.duration_weeks && (
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{gig.duration_weeks} weeks duration</span>
                            </div>
                          )}
                          {gig.stipend_amount && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-3 w-3" />
                              <span>{gig.stipend_amount} {gig.stipend_currency}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {gig.gig_skills && gig.gig_skills.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {gig.gig_skills.map((skillObj: any, index: number) => (
                              <Badge key={index} variant="secondary">
                                {skillObj.skills.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {profile?.user_type === "student" && (
                <Dialog open={selectedGig?.id === gig.id} onOpenChange={(open) => {
                  if (!open) {
                    setSelectedGig(null);
                    setCoverLetter("");
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setSelectedGig(gig)}
                      className="flex-1"
                    >
                      Apply Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply to {gig.title}</DialogTitle>
                      <DialogDescription>
                        Submit your application for this opportunity
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cover-letter">Cover Letter</Label>
                        <Textarea
                          id="cover-letter"
                          placeholder="Tell them why you're interested in this opportunity and what you can bring to their team..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={5}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          onClick={handleApply}
                          disabled={applying}
                          className="flex-1"
                        >
                          {applying ? "Submitting..." : "Submit Application"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedGig(null);
                            setCoverLetter("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};