import LegalPage from '../components/ui/LegalPage';
import Seo from '../components/Seo';

const BODY = [
  "By accessing this website or engaging CreativzEdge's services, you agree to these terms and conditions.",
  'All designs, content, graphics, and materials created by CreativzEdge remain the intellectual property of CreativzEdge until full payment is received, unless otherwise agreed in writing. Clients are responsible for reviewing and approving all final deliverables before publication or printing.',
  'CreativzEdge reserves the right to showcase completed projects in its portfolio and marketing materials unless a confidentiality agreement is in place.',
  'We are not liable for any indirect, incidental, or consequential damages arising from the use of our services or website.',
  'These terms may be updated periodically without prior notice.',
];

const Terms = () => (
  <>
    <Seo
      title="Terms & Conditions | CreativzEdge"
      description="The terms that apply when you use the CreativzEdge website or engage our design and digital growth services."
      path="/terms"
      breadcrumb="Terms & Conditions"
    />
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="Last updated: June 2026" body={BODY} />
  </>
);

export default Terms;
