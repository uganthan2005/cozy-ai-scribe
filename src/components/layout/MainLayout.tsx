
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { useAppStore } from '@/store/useAppStore';
import { GlobalLoader } from '@/components/ui/loading-states';

export function MainLayout() {
  const { isLoading, loadingMessage } = useAppStore();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        {isLoading && <GlobalLoader message={loadingMessage} />}
      </div>
    </SidebarProvider>
  );
}
