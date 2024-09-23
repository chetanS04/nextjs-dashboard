import SideNav from '@/app/ui/dashboard/sidenav';
export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
// note:- Must Read

//So far, you've learned about static and dynamic rendering, and how to stream dynamic content that depends on data. In this chapter, let's learn how to combine static rendering, dynamic rendering, and streaming in the same route with Partial Prerendering (PPR).

//partial prerendring is used for :-notice a performance improvement in production. Next.js will prerender the static parts of your route and defer the dynamic parts until the user requests them.