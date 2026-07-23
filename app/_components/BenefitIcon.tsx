import {
  Zap, Heart, Leaf, Sparkles, Droplets, Shield,
  Activity, Sun, Moon, Wind, Lightbulb,
  Bone, Sprout, Flower2, Microscope, FlaskConical, CloudLightning,
  BedDouble, Plane,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<string, ComponentType<LucideProps>> = {
  Zap, Heart, Leaf, Sparkles, Droplets, Shield,
  Activity, Sun, Moon, Wind, Lightbulb,
  Bone, Sprout, Flower2, Microscope, FlaskConical, CloudLightning,
  BedDouble, Plane,
};

interface Props extends LucideProps {
  name: string;
}

export default function BenefitIcon({ name, ...props }: Props) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon {...props} />;
}
