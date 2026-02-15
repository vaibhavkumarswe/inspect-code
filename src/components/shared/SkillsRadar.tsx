import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

const skills: Skill[] = [
  { name: 'React', level: 95, color: 'hsl(187, 85%, 53%)' },
  { name: 'TypeScript', level: 90, color: 'hsl(211, 60%, 48%)' },
  { name: 'Node.js', level: 85, color: 'hsl(120, 50%, 40%)' },
  { name: 'CSS/Tailwind', level: 92, color: 'hsl(262, 83%, 58%)' },
  { name: 'GraphQL', level: 75, color: 'hsl(330, 80%, 55%)' },
  { name: 'Testing', level: 80, color: 'hsl(45, 93%, 47%)' },
];

interface SkillsRadarProps {
  className?: string;
}

export const SkillsRadar = ({ className = '' }: SkillsRadarProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const size = 300;
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 5;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getPointOnCircle = (angle: number, radius: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const angleStep = 360 / skills.length;

  // Generate polygon points for the skill area
  const getSkillPoints = () => {
    return skills
      .map((skill, i) => {
        const angle = i * angleStep;
        const radius = (skill.level / 100) * maxRadius;
        const point = getPointOnCircle(angle, radius);
        return `${point.x},${point.y}`;
      })
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`bento-card ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-accent/10">
          <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold">Skills Radar</h3>
          <p className="text-sm text-muted-foreground">Technical proficiency levels</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Radar Chart */}
        <svg
          ref={svgRef}
          width={size}
          height={size}
          className="flex-shrink-0"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circles */}
          {Array.from({ length: levels }).map((_, i) => {
            const radius = ((i + 1) / levels) * maxRadius;
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity={0.5}
              />
            );
          })}

          {/* Axis lines and labels */}
          {skills.map((skill, i) => {
            const angle = i * angleStep;
            const endPoint = getPointOnCircle(angle, maxRadius);
            const labelPoint = getPointOnCircle(angle, maxRadius + 25);
            const isHovered = hoveredSkill === skill.name;
            
            return (
              <g key={skill.name}>
                <line
                  x1={center}
                  y1={center}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity={0.5}
                />
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-xs font-medium transition-all ${
                    isHovered ? 'fill-primary' : 'fill-muted-foreground'
                  }`}
                  style={{ fontSize: '11px' }}
                >
                  {skill.name}
                </text>
              </g>
            );
          })}

          {/* Skill area polygon */}
          <motion.polygon
            points={isInView ? getSkillPoints() : skills.map(() => `${center},${center}`).join(' ')}
            fill="hsl(var(--primary) / 0.2)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Skill points */}
          {skills.map((skill, i) => {
            const angle = i * angleStep;
            const radius = (skill.level / 100) * maxRadius;
            const point = getPointOnCircle(angle, isInView ? radius : 0);
            const isHovered = hoveredSkill === skill.name;
            
            return (
              <motion.circle
                key={skill.name}
                cx={point.x}
                cy={point.y}
                r={isHovered ? 8 : 5}
                fill={skill.color}
                stroke="hsl(var(--background))"
                strokeWidth="2"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                initial={{ r: 0 }}
                animate={{ r: isHovered ? 8 : 5 }}
                transition={{ delay: i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Skills List */}
        <div className="flex-1 space-y-3 w-full">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                hoveredSkill === skill.name ? 'bg-secondary' : ''
              }`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: skill.color }}
              />
              <span className="text-sm font-medium flex-1">{skill.name}</span>
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">
                {skill.level}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
