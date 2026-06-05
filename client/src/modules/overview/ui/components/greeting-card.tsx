interface GreetingCardProps {
  greeting: string;
}

export const GreetingCard = ({ greeting }: GreetingCardProps) => {
  return (
    <div className="relative border border-border-color bg-panel-bg rounded-2xl px-6 py-4">
      <div className="absolute -top-2.5 left-5 bg-panel-bg px-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
          AI Briefing
        </span>
      </div>
      <p className="text-text-main text-sm leading-relaxed">{greeting}</p>
    </div>
  );
};