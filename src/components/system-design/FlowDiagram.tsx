import type { DiagramData } from '@/data/system-design/types';

const nodeTypeColors: Record<string, string> = {
  default: 'bg-muted text-foreground border-border',
  primary: 'bg-primary/10 text-primary border-primary/30',
  secondary: 'bg-secondary text-secondary-foreground border-secondary',
  accent: 'bg-accent text-accent-foreground border-accent',
  warning: 'bg-destructive/10 text-destructive border-destructive/30',
};

interface FlowDiagramProps {
  diagram: DiagramData;
}

export const FlowDiagram = ({ diagram }: FlowDiagramProps) => {
  return (
    <div className="space-y-3">
      {diagram.title && (
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {diagram.title}
        </h4>
      )}
      <div className="flex flex-wrap gap-3">
        {diagram.nodes.map((node) => (
          <div
            key={node.id}
            className={`px-4 py-3 rounded-lg border text-sm font-medium ${
              nodeTypeColors[node.type || 'default']
            }`}
          >
            <div>{node.label}</div>
            {node.description && (
              <div className="text-xs opacity-70 mt-1 font-normal">{node.description}</div>
            )}
          </div>
        ))}
      </div>

      {diagram.edges && diagram.edges.length > 0 && (
        <div className="space-y-1.5 pt-2">
          <h5 className="text-xs font-semibold text-muted-foreground uppercase">Connections</h5>
          <div className="flex flex-wrap gap-2">
            {diagram.edges
              .filter((e) => e.label)
              .map((edge, i) => {
                const fromNode = diagram.nodes.find((n) => n.id === edge.from);
                const toNode = diagram.nodes.find((n) => n.id === edge.to);
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1.5 rounded-md"
                  >
                    <span className="font-medium text-foreground">{fromNode?.label}</span>
                    <span>→</span>
                    <span className="font-medium text-foreground">{toNode?.label}</span>
                    {edge.label && (
                      <span className="text-muted-foreground">({edge.label})</span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
