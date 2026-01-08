interface SubjectCardProps {
  icon: string;
  name: string;
  onClick?: () => void;
}

const SubjectCard = ({ icon, name, onClick }: SubjectCardProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-card transition-all duration-200 hover:-translate-y-1"
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </button>
  );
};

export default SubjectCard;
