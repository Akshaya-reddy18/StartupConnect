import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Search, MapPin, Monitor } from "lucide-react";

interface GigFiltersProps {
  filters: {
    search: string;
    location: string;
    remote: boolean;
    skills: string[];
  };
  onFiltersChange: (filters: any) => void;
}

export const GigFilters = ({ filters, onFiltersChange }: GigFiltersProps) => {
  const [skills, setSkills] = useState<any[]>([]);

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

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleSkill = (skillId: string) => {
    const newSkills = filters.skills.includes(skillId)
      ? filters.skills.filter(id => id !== skillId)
      : [...filters.skills, skillId];
    
    updateFilter("skills", newSkills);
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      location: "",
      remote: false,
      skills: [],
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.location || 
    filters.remote || 
    filters.skills.length > 0;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Filters
            </CardTitle>
            <CardDescription>
              Find the perfect opportunity
            </CardDescription>
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Job title, description..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={filters.location}
            onChange={(e) => updateFilter("location", e.target.value)}
          />
        </div>

        {/* Remote Work */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            checked={filters.remote}
            onCheckedChange={(checked) => updateFilter("remote", checked)}
          />
          <Label htmlFor="remote" className="flex items-center gap-2 cursor-pointer">
            <Monitor className="h-4 w-4" />
            Remote Work
          </Label>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <Label>Skills</Label>
          
          {filters.skills.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Selected:</p>
              <div className="flex flex-wrap gap-2">
                {filters.skills.map((skillId) => {
                  const skill = skills.find(s => s.id === skillId);
                  return skill ? (
                    <Badge
                      key={skillId}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill.name}
                      <button
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

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {skills
              .filter(skill => !filters.skills.includes(skill.id))
              .map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.id}`}
                    checked={filters.skills.includes(skill.id)}
                    onCheckedChange={() => toggleSkill(skill.id)}
                  />
                  <Label 
                    htmlFor={`skill-${skill.id}`} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {skill.name}
                    {skill.category && (
                      <span className="text-muted-foreground ml-1">
                        ({skill.category})
                      </span>
                    )}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};