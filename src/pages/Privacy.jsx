import LegalPage from '../components/ui/LegalPage';

const BODY = [
  'At CreativzEdge, we respect your privacy and are committed to protecting your personal information. Any information submitted through our website, contact forms, emails, or project inquiries is used solely to provide our services, communicate with you, and improve your experience.',
  'We do not sell, rent, or share your personal information with third parties except when required by law. We take reasonable measures to safeguard your data and maintain confidentiality of all client projects and information.',
  'By using our website, you consent to the collection and use of information as outlined in this policy.',
];

const Privacy = () => (
  <LegalPage eyebrow="Legal" title="Privacy Policy" updated="Last updated: June 2026" body={BODY} />
);

export default Privacy;
