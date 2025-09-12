
import React from 'react';
import { Settings, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

// Get country name from code
const getCountryName = (code: string): string => {
  const countries: Record<string, { name: string, flag: string }> = {
    'af': { name: 'Afghanistan', flag: '🇦🇫' },
    'al': { name: 'Albania', flag: '🇦🇱' },
    'dz': { name: 'Algeria', flag: '🇩🇿' },
    'ad': { name: 'Andorra', flag: '🇦🇩' },
    'ao': { name: 'Angola', flag: '🇦🇴' },
    'ag': { name: 'Antigua and Barbuda', flag: '🇦🇬' },
    'ar': { name: 'Argentina', flag: '🇦🇷' },
    'am': { name: 'Armenia', flag: '🇦🇲' },
    'au': { name: 'Australia', flag: '🇦🇺' },
    'at': { name: 'Austria', flag: '🇦🇹' },
    'az': { name: 'Azerbaijan', flag: '🇦🇿' },
    'bs': { name: 'Bahamas', flag: '🇧🇸' },
    'bh': { name: 'Bahrain', flag: '🇧🇭' },
    'bd': { name: 'Bangladesh', flag: '🇧🇩' },
    'bb': { name: 'Barbados', flag: '🇧🇧' },
    'by': { name: 'Belarus', flag: '🇧🇾' },
    'be': { name: 'Belgium', flag: '🇧🇪' },
    'bz': { name: 'Belize', flag: '🇧🇿' },
    'bj': { name: 'Benin', flag: '🇧🇯' },
    'bt': { name: 'Bhutan', flag: '🇧🇹' },
    'bo': { name: 'Bolivia', flag: '🇧🇴' },
    'ba': { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    'bw': { name: 'Botswana', flag: '🇧🇼' },
    'br': { name: 'Brazil', flag: '🇧🇷' },
    'bn': { name: 'Brunei', flag: '🇧🇳' },
    'bg': { name: 'Bulgaria', flag: '🇧🇬' },
    'bf': { name: 'Burkina Faso', flag: '🇧🇫' },
    'bi': { name: 'Burundi', flag: '🇧🇮' },
    'cv': { name: 'Cabo Verde', flag: '🇨🇻' },
    'kh': { name: 'Cambodia', flag: '🇰🇭' },
    'cm': { name: 'Cameroon', flag: '🇨🇲' },
    'ca': { name: 'Canada', flag: '🇨🇦' },
    'cf': { name: 'Central African Republic', flag: '🇨🇫' },
    'td': { name: 'Chad', flag: '🇹🇩' },
    'cl': { name: 'Chile', flag: '🇨🇱' },
    'cn': { name: 'China', flag: '🇨🇳' },
    'co': { name: 'Colombia', flag: '🇨🇴' },
    'km': { name: 'Comoros', flag: '🇰🇲' },
    'cg': { name: 'Congo', flag: '🇨🇬' },
    'cr': { name: 'Costa Rica', flag: '🇨🇷' },
    'hr': { name: 'Croatia', flag: '🇭🇷' },
    'cu': { name: 'Cuba', flag: '🇨🇺' },
    'cy': { name: 'Cyprus', flag: '🇨🇾' },
    'cz': { name: 'Czech Republic', flag: '🇨🇿' },
    'dk': { name: 'Denmark', flag: '🇩🇰' },
    'dj': { name: 'Djibouti', flag: '🇩🇯' },
    'dm': { name: 'Dominica', flag: '🇩🇲' },
    'do': { name: 'Dominican Republic', flag: '🇩🇴' },
    'ec': { name: 'Ecuador', flag: '🇪🇨' },
    'eg': { name: 'Egypt', flag: '🇪🇬' },
    'sv': { name: 'El Salvador', flag: '🇸🇻' },
    'gq': { name: 'Equatorial Guinea', flag: '🇬🇶' },
    'er': { name: 'Eritrea', flag: '🇪🇷' },
    'ee': { name: 'Estonia', flag: '🇪🇪' },
    'et': { name: 'Ethiopia', flag: '🇪🇹' },
    'fj': { name: 'Fiji', flag: '🇫🇯' },
    'fi': { name: 'Finland', flag: '🇫🇮' },
    'fr': { name: 'France', flag: '🇫🇷' },
    'ga': { name: 'Gabon', flag: '🇬🇦' },
    'gm': { name: 'Gambia', flag: '🇬🇲' },
    'ge': { name: 'Georgia', flag: '🇬🇪' },
    'de': { name: 'Germany', flag: '🇩🇪' },
    'gh': { name: 'Ghana', flag: '🇬🇭' },
    'gr': { name: 'Greece', flag: '🇬🇷' },
    'gd': { name: 'Grenada', flag: '🇬🇩' },
    'gt': { name: 'Guatemala', flag: '🇬🇹' },
    'gn': { name: 'Guinea', flag: '🇬🇳' },
    'gw': { name: 'Guinea-Bissau', flag: '🇬🇼' },
    'gy': { name: 'Guyana', flag: '🇬🇾' },
    'ht': { name: 'Haiti', flag: '🇭🇹' },
    'hn': { name: 'Honduras', flag: '🇭🇳' },
    'hu': { name: 'Hungary', flag: '🇭🇺' },
    'is': { name: 'Iceland', flag: '🇮🇸' },
    'in': { name: 'India', flag: '🇮🇳' },
    'id': { name: 'Indonesia', flag: '🇮🇩' },
    'ir': { name: 'Iran', flag: '🇮🇷' },
    'iq': { name: 'Iraq', flag: '🇮🇶' },
    'ie': { name: 'Ireland', flag: '🇮🇪' },
    'il': { name: 'Israel', flag: '🇮🇱' },
    'it': { name: 'Italy', flag: '🇮🇹' },
    'jm': { name: 'Jamaica', flag: '🇯🇲' },
    'jp': { name: 'Japan', flag: '🇯🇵' },
    'jo': { name: 'Jordan', flag: '🇯🇴' },
    'kz': { name: 'Kazakhstan', flag: '🇰🇿' },
    'ke': { name: 'Kenya', flag: '🇰🇪' },
    'ki': { name: 'Kiribati', flag: '🇰🇮' },
    'kp': { name: 'North Korea', flag: '🇰🇵' },
    'kr': { name: 'South Korea', flag: '🇰🇷' },
    'kw': { name: 'Kuwait', flag: '🇰🇼' },
    'kg': { name: 'Kyrgyzstan', flag: '🇰🇬' },
    'la': { name: 'Laos', flag: '🇱🇦' },
    'lv': { name: 'Latvia', flag: '🇱🇻' },
    'lb': { name: 'Lebanon', flag: '🇱🇧' },
    'ls': { name: 'Lesotho', flag: '🇱🇸' },
    'lr': { name: 'Liberia', flag: '🇱🇷' },
    'ly': { name: 'Libya', flag: '🇱🇾' },
    'li': { name: 'Liechtenstein', flag: '🇱🇮' },
    'lt': { name: 'Lithuania', flag: '🇱🇹' },
    'lu': { name: 'Luxembourg', flag: '🇱🇺' },
    'mg': { name: 'Madagascar', flag: '🇲🇬' },
    'mw': { name: 'Malawi', flag: '🇲🇼' },
    'my': { name: 'Malaysia', flag: '🇲🇾' },
    'mv': { name: 'Maldives', flag: '🇲🇻' },
    'ml': { name: 'Mali', flag: '🇲🇱' },
    'mt': { name: 'Malta', flag: '🇲🇹' },
    'mh': { name: 'Marshall Islands', flag: '🇲🇭' },
    'mr': { name: 'Mauritania', flag: '🇲🇷' },
    'mu': { name: 'Mauritius', flag: '🇲🇺' },
    'mx': { name: 'Mexico', flag: '🇲🇽' },
    'fm': { name: 'Micronesia', flag: '🇫🇲' },
    'md': { name: 'Moldova', flag: '🇲🇩' },
    'mc': { name: 'Monaco', flag: '🇲🇨' },
    'mn': { name: 'Mongolia', flag: '🇲🇳' },
    'me': { name: 'Montenegro', flag: '🇲🇪' },
    'ma': { name: 'Morocco', flag: '🇲🇦' },
    'mz': { name: 'Mozambique', flag: '🇲🇿' },
    'mm': { name: 'Myanmar', flag: '🇲🇲' },
    'na': { name: 'Namibia', flag: '🇳🇦' },
    'nr': { name: 'Nauru', flag: '🇳🇷' },
    'np': { name: 'Nepal', flag: '🇳🇵' },
    'nl': { name: 'Netherlands', flag: '🇳🇱' },
    'nz': { name: 'New Zealand', flag: '🇳🇿' },
    'ni': { name: 'Nicaragua', flag: '🇳🇮' },
    'ne': { name: 'Niger', flag: '🇳🇪' },
    'ng': { name: 'Nigeria', flag: '🇳🇬' },
    'mk': { name: 'North Macedonia', flag: '🇲🇰' },
    'no': { name: 'Norway', flag: '🇳🇴' },
    'om': { name: 'Oman', flag: '🇴🇲' },
    'pk': { name: 'Pakistan', flag: '🇵🇰' },
    'pw': { name: 'Palau', flag: '🇵🇼' },
    'pa': { name: 'Panama', flag: '🇵🇦' },
    'pg': { name: 'Papua New Guinea', flag: '🇵🇬' },
    'py': { name: 'Paraguay', flag: '🇵🇾' },
    'pe': { name: 'Peru', flag: '🇵🇪' },
    'ph': { name: 'Philippines', flag: '🇵🇭' },
    'pl': { name: 'Poland', flag: '🇵🇱' },
    'pt': { name: 'Portugal', flag: '🇵🇹' },
    'qa': { name: 'Qatar', flag: '🇶🇦' },
    'ro': { name: 'Romania', flag: '🇷🇴' },
    'ru': { name: 'Russia', flag: '🇷🇺' },
    'rw': { name: 'Rwanda', flag: '🇷🇼' },
    'kn': { name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
    'lc': { name: 'Saint Lucia', flag: '🇱🇨' },
    'vc': { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
    'ws': { name: 'Samoa', flag: '🇼🇸' },
    'sm': { name: 'San Marino', flag: '🇸🇲' },
    'st': { name: 'Sao Tome and Principe', flag: '🇸🇹' },
    'sa': { name: 'Saudi Arabia', flag: '🇸🇦' },
    'sn': { name: 'Senegal', flag: '🇸🇳' },
    'rs': { name: 'Serbia', flag: '🇷🇸' },
    'sc': { name: 'Seychelles', flag: '🇸🇨' },
    'sl': { name: 'Sierra Leone', flag: '🇸🇱' },
    'sg': { name: 'Singapore', flag: '🇸🇬' },
    'sk': { name: 'Slovakia', flag: '🇸🇰' },
    'si': { name: 'Slovenia', flag: '🇸🇮' },
    'sb': { name: 'Solomon Islands', flag: '🇸🇧' },
    'so': { name: 'Somalia', flag: '🇸🇴' },
    'za': { name: 'South Africa', flag: '🇿🇦' },
    'ss': { name: 'South Sudan', flag: '🇸🇸' },
    'es': { name: 'Spain', flag: '🇪🇸' },
    'lk': { name: 'Sri Lanka', flag: '🇱🇰' },
    'sd': { name: 'Sudan', flag: '🇸🇩' },
    'sr': { name: 'Suriname', flag: '🇸🇷' },
    'se': { name: 'Sweden', flag: '🇸🇪' },
    'ch': { name: 'Switzerland', flag: '🇨🇭' },
    'sy': { name: 'Syria', flag: '🇸🇾' },
    'tw': { name: 'Taiwan', flag: '🇹🇼' },
    'tj': { name: 'Tajikistan', flag: '🇹🇯' },
    'tz': { name: 'Tanzania', flag: '🇹🇿' },
    'th': { name: 'Thailand', flag: '🇹🇭' },
    'tl': { name: 'Timor-Leste', flag: '🇹🇱' },
    'tg': { name: 'Togo', flag: '🇹🇬' },
    'to': { name: 'Tonga', flag: '🇹🇴' },
    'tt': { name: 'Trinidad and Tobago', flag: '🇹🇹' },
    'tn': { name: 'Tunisia', flag: '🇹🇳' },
    'tr': { name: 'Turkey', flag: '🇹🇷' },
    'tm': { name: 'Turkmenistan', flag: '🇹🇲' },
    'tv': { name: 'Tuvalu', flag: '🇹🇻' },
    'ug': { name: 'Uganda', flag: '🇺🇬' },
    'ua': { name: 'Ukraine', flag: '🇺🇦' },
    'ae': { name: 'United Arab Emirates', flag: '🇦🇪' },
    'gb': { name: 'United Kingdom', flag: '🇬🇧' },
    'us': { name: 'United States', flag: '🇺🇸' },
    'uy': { name: 'Uruguay', flag: '🇺🇾' },
    'uz': { name: 'Uzbekistan', flag: '🇺🇿' },
    'vu': { name: 'Vanuatu', flag: '🇻🇺' },
    'va': { name: 'Vatican City', flag: '🇻🇦' },
    've': { name: 'Venezuela', flag: '🇻🇪' },
    'vn': { name: 'Vietnam', flag: '🇻🇳' },
    'ye': { name: 'Yemen', flag: '🇾🇪' },
    'zm': { name: 'Zambia', flag: '🇿🇲' },
    'zw': { name: 'Zimbabwe', flag: '🇿🇼' },
    'uk': { name: 'United Kingdom', flag: '🇬🇧' },
    'hk': { name: 'Hong Kong', flag: '🇭🇰' },
  };
  
  return countries[code] ? `${countries[code].flag} ${countries[code].name}` : 'Not specified';
};

// Get exam name from ID
const getExamName = (id: string): string => {
  const exams: Record<string, string> = {
    'ielts-academic': 'IELTS Academic 🎓',
    'ielts-general': 'IELTS General Training ✈️',
    'toefl': 'TOEFL 📝',
    'pte': 'PTE Academic 🖥️',
    'duolingo': 'Duolingo English Test 🦉',
    'cambridge': 'Cambridge English 🏛️',
    'oet': 'OET ⚕️',
    'sat': 'SAT 🧮',
    'gre': 'GRE 🎯',
    'gmat': 'GMAT 📊',
  };
  
  return exams[id] || 'Not specified';
};

const UserPreferences: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const selectedCountry = localStorage.getItem('selectedCountry') || '';
  const selectedExam = localStorage.getItem('selectedExam') || '';

  const handleEditPreferences = () => {
    navigate('/selection');
  };

  return (
    <Card className={isMobile ? "w-full" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo" />
          Your Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Country</div>
            <div className="font-medium">
              {selectedCountry ? getCountryName(selectedCountry) : 'Not specified'}
            </div>
          </div>
          
          <div>
            <div className="text-sm text-muted-foreground mb-1">Target Exam</div>
            <div className="font-medium">
              {selectedExam ? getExamName(selectedExam) : 'Not specified'}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2" 
            onClick={handleEditPreferences}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
