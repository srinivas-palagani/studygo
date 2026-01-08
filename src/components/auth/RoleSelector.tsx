import { cn } from "@/lib/utils";

interface RoleSelectorProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const roles = ["Student", "Teacher", "Parent"];

const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden">
      {roles.map((role) => (
        <button
          key={role}
          onClick={() => onRoleChange(role)}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium transition-all duration-200",
            selectedRole === role
              ? "bg-dark-surface text-card-dark-foreground"
              : "bg-card text-muted-foreground hover:bg-secondary"
          )}
        >
          {role}
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;
