import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import jamesCartoon from '@/assets/team-james-cartoon.jpg';
import mariaCartoon from '@/assets/team-maria-cartoon.jpg';
import davidCartoon from '@/assets/team-david-cartoon.jpg';
import aishaCartoon from '@/assets/team-aisha-cartoon.jpg';
import thomasCartoon from '@/assets/team-thomas-cartoon.jpg';

const teamMembers = [
  {
    name: 'Govinda Bohara',
    role: 'Founder & CEO',
    bio: 'Visionary leader in edTech, on a mission to democratize exam preparation.',
    image: '/lovable-uploads/6573ef2f-c3d2-44a5-a547-494e9565f55d.png',
  },
  { 
    name: 'James Lee', 
    role: 'Head of Content', 
    bio: 'Linguistics PhD specializing in test preparation and content strategy.', 
    image: jamesCartoon
  },
  { 
    name: 'Maria Garcia', 
    role: 'Technology Director', 
    bio: 'Building intuitive learning experiences at scale.', 
    image: mariaCartoon
  },
  { 
    name: 'David Kim', 
    role: 'Speaking & Writing Coach', 
    bio: 'Certified TEFL instructor focused on practical outcomes.', 
    image: davidCartoon
  },
  { 
    name: 'Aisha Patel', 
    role: 'User Experience Lead', 
    bio: 'Designing delightful, accessible education products.', 
    image: aishaCartoon
  },
  { 
    name: 'Thomas Wilson', 
    role: 'Student Success Manager', 
    bio: 'Helping learners achieve their goals worldwide.', 
    image: thomasCartoon
  },
];

const Team = () => {
  useEffect(() => {
    // SEO
    document.title = 'Our Team | Neplia';

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('description', 'Meet the Neplia team behind IELTS and exam success. Experienced educators and technologists dedicated to your growth.');

    // Canonical
    let canon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', window.location.origin + '/team');

    // JSON-LD Organization + Employees
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Neplia',
      url: window.location.origin + '/team',
      employee: teamMembers.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(ld);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <header className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Our Team</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The people building Neplia and empowering learners to excel in IELTS, TOEFL, GRE, GMAT, SAT and PTE.
          </p>
        </div>
      </header>

      <main>
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-purple-50/40 dark:from-gray-900 dark:to-indigo-950/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((m) => (
                <article key={m.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={m.image}
                    alt={`${m.name} - ${m.role} at Neplia`}
                    loading="lazy"
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold">{m.name}</h2>
                    <p className="text-primary font-medium mt-0.5">{m.role}</p>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold">We’re hiring</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Join us in shaping the future of exam preparation.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Team;
