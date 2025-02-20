import Hero from './components/Hero';
import { StakeholderSection } from './components/StakeholderSection';
import { Feature } from './components/Feature';
import { HowItWorks } from './components/HowItWorks';
import { Security } from './components/Security';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import MedicalDataChart from './components/MedicalDataChart';
import PricingSection from './components/PricingSection';

export default function Home() {
	return (
		<>
			<Hero />
			<StakeholderSection />
			<MedicalDataChart />
			<Feature />
			<HowItWorks />
			<Security />
			<Testimonials />
			<PricingSection />
			<FAQ />
		</>
	);
}
