
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/ui/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/navigation/AppSidebar';
import { useAppStore } from '@/store/useAppStore';
import { GlobalLoader } from '@/components/ui/loading-states';

export function MainLayout() {
  const { isLoading, loadingMessage } = useAppStore();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
        {isLoading && <GlobalLoader message={loadingMessage} />}
      </div>
    </SidebarProvider>
  );
}
