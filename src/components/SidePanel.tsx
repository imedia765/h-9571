import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  History,
  Settings,
  Wallet,
  FileText,
  LogOut
} from "lucide-react";
import { UserRole } from "@/hooks/useRoleAccess";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface SidePanelProps {
  onTabChange: (tab: string) => void;
  userRole: UserRole;
}

const SidePanel = ({ onTabChange, userRole }: SidePanelProps) => {
  const isAdmin = userRole === 'admin';
  const isCollector = userRole === 'collector';
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-dashboard-card border-r border-white/10">
      <div className="p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-white mb-1">
          Dashboard
        </h2>
        <p className="text-sm text-dashboard-muted">
          Manage your account
        </p>
      </div>
      
      <ScrollArea className="flex-1 px-4 lg:px-6">
        <div className="space-y-1.5">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sm"
            onClick={() => onTabChange('dashboard')}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Button>

          {(isAdmin || isCollector) && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-sm"
              onClick={() => onTabChange('users')}
            >
              <Users className="h-4 w-4" />
              Members
            </Button>
          )}

          {isAdmin && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => onTabChange('financials')}
              >
                <Wallet className="h-4 w-4" />
                Collectors & Financials
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => onTabChange('reports')}
              >
                <FileText className="h-4 w-4" />
                Reports
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => onTabChange('audit')}
              >
                <History className="h-4 w-4" />
                Audit Logs
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-sm"
                onClick={() => onTabChange('system')}
              >
                <Settings className="h-4 w-4" />
                System
              </Button>
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 lg:p-6 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sm text-dashboard-muted hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SidePanel;