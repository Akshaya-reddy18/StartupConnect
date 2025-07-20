import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

interface CreateGigFormProps {
  user: any;
  onGigCreated: () => void;
}

export const CreateGigForm = ({ user, onGigCreated }: CreateGigFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    stipend_amount: "",
    stipend_currency: "USD",
    location: "",
    is_remote: false,
    duration_weeks: "",
    expires_at: "",
  });
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("name");
    setSkills(data || []);
  };

  const addNewSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const { data, error } = await supabase
        .from("skills")
        .insert({ name: newSkill.trim(), category: "Other" })
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => [...prev, data]);
      setSelectedSkills(prev => [...prev, data.id]);
      setNewSkill("");
      
      toast({
        title: "Success",
        description: "New skill added!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const toggleSkill = (skillId: string) => {
    setSelectedSkills(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the gig
      const gigData = {
        ...formData,
        startup_id: user.id,
        stipend_amount: formData.stipend_amount ? parseInt(formData.stipend_amount) : null,
        duration_weeks: formData.duration_weeks ? parseInt(formData.duration_weeks) : null,
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
      };

      const { data: gig, error: gigError } = await supabase
        .from("gigs")
        .insert(gigData)
        .select()
        .single();

      if (gigError) throw gigError;

      // Add skills to the gig
      if (selectedSkills.length > 0) {
        const gigSkills = selectedSkills.map(skillId => ({
          gig_id: gig.id,
          skill_id: skillId,
          importance_level: 3, // Default importance
        }));

        const { error: skillsError } = await supabase
          .from("gig_skills")
          .insert(gigSkills);

        if (skillsError) throw skillsError;
      }

      toast({
        title: "Success",
        description: "Gig created successfully!",
      });

      onGigCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create gig",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Frontend Developer Intern"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration_weeks">Duration (weeks)</Label>
          <Input
            id="duration_weeks"
            type="number"
            value={formData.duration_weeks}
            onChange={(e) => setFormData(prev => ({ ...prev, duration_weeks: e.target.value }))}
            placeholder="12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe the role, responsibilities, and what the intern will learn..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
          placeholder="List the skills, experience, or qualifications needed..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="stipend_amount">Stipend Amount</Label>
          <Input
            id="stipend_amount"
            type="number"
            value={formData.stipend_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, stipend_amount: e.target.value }))}
            placeholder="1000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="stipend_currency">Currency</Label>
          <Select
            value={formData.stipend_currency}
            onValueChange={(value) => setFormData(prev => ({ ...prev, stipend_currency: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expires_at">Application Deadline</Label>
          <Input
            id="expires_at"
            type="date"
            value={formData.expires_at}
            onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="San Francisco, CA"
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-6">
          <Checkbox
            id="is_remote"
            checked={formData.is_remote}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_remote: !!checked }))}
          />
          <Label htmlFor="is_remote">Remote work available</Label>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4">
        <Label>Required Skills</Label>
        
        {/* Selected Skills */}
        {selectedSkills.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Selected skills:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skillId) => {
                const skill = skills.find(s => s.id === skillId);
                return skill ? (
                  <Badge
                    key={skillId}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skillId)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Add Skills */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Add a custom skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNewSkill())}
            />
            <Button type="button" onClick={addNewSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {skills
              .filter(skill => !selectedSkills.includes(skill.id))
              .map((skill) => (
                <Button
                  key={skill.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => toggleSkill(skill.id)}
                  className="justify-start text-left"
                >
                  {skill.name}
                </Button>
              ))}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating Gig..." : "Create Gig"}
      </Button>
    </form>
  );
};