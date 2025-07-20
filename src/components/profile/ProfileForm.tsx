import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, X } from "lucide-react";

interface ProfileFormProps {
  user: any;
  profile: any;
  onProfileUpdate: (profile: any) => void;
}

export const ProfileForm = ({ user, profile, onProfileUpdate }: ProfileFormProps) => {
  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    bio: profile.bio || "",
    location: profile.location || "",
    website: profile.website || "",
  });
  const [skills, setSkills] = useState<any[]>([]);
  const [userSkills, setUserSkills] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState("3");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
    fetchUserSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("name");
    setSkills(data || []);
  };

  const fetchUserSkills = async () => {
    const { data } = await supabase
      .from("user_skills")
      .select(`
        proficiency_level,
        skills (id, name, category)
      `)
      .eq("user_id", user.id);
    setUserSkills(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      onProfileUpdate(data);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!selectedSkill) return;

    try {
      const { error } = await supabase
        .from("user_skills")
        .insert({
          user_id: user.id,
          skill_id: selectedSkill,
          proficiency_level: parseInt(proficiencyLevel),
        });

      if (error) throw error;

      await fetchUserSkills();
      setSelectedSkill("");
      setProficiencyLevel("3");
      
      toast({
        title: "Success",
        description: "Skill added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillId: string) => {
    try {
      const { error } = await supabase
        .from("user_skills")
        .delete()
        .eq("user_id", user.id)
        .eq("skill_id", skillId);

      if (error) throw error;

      await fetchUserSkills();
      
      toast({
        title: "Success",
        description: "Skill removed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    }
  };

  const availableSkills = skills.filter(
    skill => !userSkills.some(us => us.skills.id === skill.id)
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information to help others find you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://your-website.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder={
                  profile.user_type === "student"
                    ? "Tell us about your background, interests, and goals..."
                    : "Describe your startup, mission, and what you're looking for in interns..."
                }
                rows={4}
              />
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {profile.user_type === "student" && (
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>
              Add your skills to get better matched with relevant opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Skills */}
            <div>
              <h4 className="font-medium mb-3">Your Skills</h4>
              {userSkills.length === 0 ? (
                <p className="text-muted-foreground">No skills added yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((userSkill) => (
                    <Badge
                      key={userSkill.skills.id}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      {userSkill.skills.name}
                      <span className="text-xs">
                        ({userSkill.proficiency_level}/5)
                      </span>
                      <button
                        onClick={() => removeSkill(userSkill.skills.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Skill */}
            <div className="space-y-4">
              <h4 className="font-medium">Add New Skill</h4>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSkills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name} ({skill.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Select value={proficiencyLevel} onValueChange={setProficiencyLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Beginner (1)</SelectItem>
                      <SelectItem value="2">Basic (2)</SelectItem>
                      <SelectItem value="3">Intermediate (3)</SelectItem>
                      <SelectItem value="4">Advanced (4)</SelectItem>
                      <SelectItem value="5">Expert (5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addSkill} disabled={!selectedSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};