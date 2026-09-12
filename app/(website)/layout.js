import {Analytics} from '@vercel/analytics/next';
import SiteHeader from '@/app/components/SiteHeader';
import SiteFooter from '@/app/components/SiteFooter';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import {getSettings} from '@/app/lib/cms';
import '../globals.css';

export default async function WebsiteLayout({children}) {
  const {contact} = await getSettings();
  return <><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader contact={contact}/>{children}<SiteFooter contact={contact}/><WhatsAppButton contact={contact}/><Analytics/></>;
}
