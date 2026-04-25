export function BoardListLayout({
  headerSlot,
  children,
}: {
  headerSlot: React.ReactNode;
  children: React.ReactNode;
}) {
  return <div className="container mx-auto p-4">{headerSlot}</div>;
}

export function BoardListLayoutHeader({
  title,
  actionsSlot,
  description,
}: {
  title: string;
  description?: string;
  actionsSlot?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      {actionsSlot && <div className="flex gap-2">{actionsSlot}</div>}
    </div>
  );
}
