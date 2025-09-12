
import React, { useState, useEffect } from 'react';
import { Check, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

const countries: Country[] = [
  { code: 'af', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'al', name: 'Albania', flag: '🇦🇱' },
  { code: 'dz', name: 'Algeria', flag: '🇩🇿' },
  { code: 'ad', name: 'Andorra', flag: '🇦🇩' },
  { code: 'ao', name: 'Angola', flag: '🇦🇴' },
  { code: 'ag', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'ar', name: 'Argentina', flag: '🇦🇷' },
  { code: 'am', name: 'Armenia', flag: '🇦🇲' },
  { code: 'au', name: 'Australia', flag: '🇦🇺' },
  { code: 'at', name: 'Austria', flag: '🇦🇹' },
  { code: 'az', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'bs', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'bh', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'bb', name: 'Barbados', flag: '🇧🇧' },
  { code: 'by', name: 'Belarus', flag: '🇧🇾' },
  { code: 'be', name: 'Belgium', flag: '🇧🇪' },
  { code: 'bz', name: 'Belize', flag: '🇧🇿' },
  { code: 'bj', name: 'Benin', flag: '🇧🇯' },
  { code: 'bt', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'bo', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'ba', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'bw', name: 'Botswana', flag: '🇧🇼' },
  { code: 'br', name: 'Brazil', flag: '🇧🇷' },
  { code: 'bn', name: 'Brunei', flag: '🇧🇳' },
  { code: 'bg', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'bf', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'bi', name: 'Burundi', flag: '🇧🇮' },
  { code: 'cv', name: 'Cabo Verde', flag: '🇨🇻' },
  { code: 'kh', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'cm', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'ca', name: 'Canada', flag: '🇨🇦' },
  { code: 'cf', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'td', name: 'Chad', flag: '🇹🇩' },
  { code: 'cl', name: 'Chile', flag: '🇨🇱' },
  { code: 'cn', name: 'China', flag: '🇨🇳' },
  { code: 'co', name: 'Colombia', flag: '🇨🇴' },
  { code: 'km', name: 'Comoros', flag: '🇰🇲' },
  { code: 'cg', name: 'Congo', flag: '🇨🇬' },
  { code: 'cr', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'hr', name: 'Croatia', flag: '🇭🇷' },
  { code: 'cu', name: 'Cuba', flag: '🇨🇺' },
  { code: 'cy', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'cz', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'dk', name: 'Denmark', flag: '🇩🇰' },
  { code: 'dj', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'dm', name: 'Dominica', flag: '🇩🇲' },
  { code: 'do', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'ec', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'eg', name: 'Egypt', flag: '🇪🇬' },
  { code: 'sv', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'gq', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'er', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'ee', name: 'Estonia', flag: '🇪🇪' },
  { code: 'et', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'fj', name: 'Fiji', flag: '🇫🇯' },
  { code: 'fi', name: 'Finland', flag: '🇫🇮' },
  { code: 'fr', name: 'France', flag: '🇫🇷' },
  { code: 'ga', name: 'Gabon', flag: '🇬🇦' },
  { code: 'gm', name: 'Gambia', flag: '🇬🇲' },
  { code: 'ge', name: 'Georgia', flag: '🇬🇪' },
  { code: 'de', name: 'Germany', flag: '🇩🇪' },
  { code: 'gh', name: 'Ghana', flag: '🇬🇭' },
  { code: 'gr', name: 'Greece', flag: '🇬🇷' },
  { code: 'gd', name: 'Grenada', flag: '🇬🇩' },
  { code: 'gt', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'gn', name: 'Guinea', flag: '🇬🇳' },
  { code: 'gw', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'gy', name: 'Guyana', flag: '🇬🇾' },
  { code: 'ht', name: 'Haiti', flag: '🇭🇹' },
  { code: 'hn', name: 'Honduras', flag: '🇭🇳' },
  { code: 'hu', name: 'Hungary', flag: '🇭🇺' },
  { code: 'is', name: 'Iceland', flag: '🇮🇸' },
  { code: 'in', name: 'India', flag: '🇮🇳' },
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'ir', name: 'Iran', flag: '🇮🇷' },
  { code: 'iq', name: 'Iraq', flag: '🇮🇶' },
  { code: 'ie', name: 'Ireland', flag: '🇮🇪' },
  { code: 'il', name: 'Israel', flag: '🇮🇱' },
  { code: 'it', name: 'Italy', flag: '🇮🇹' },
  { code: 'jm', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'jp', name: 'Japan', flag: '🇯🇵' },
  { code: 'jo', name: 'Jordan', flag: '🇯🇴' },
  { code: 'kz', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'ke', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ki', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'kp', name: 'North Korea', flag: '🇰🇵' },
  { code: 'kr', name: 'South Korea', flag: '🇰🇷' },
  { code: 'kw', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'kg', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'la', name: 'Laos', flag: '🇱🇦' },
  { code: 'lv', name: 'Latvia', flag: '🇱🇻' },
  { code: 'lb', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'ls', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'lr', name: 'Liberia', flag: '🇱🇷' },
  { code: 'ly', name: 'Libya', flag: '🇱🇾' },
  { code: 'li', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'lt', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'lu', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'mg', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'mw', name: 'Malawi', flag: '🇲🇼' },
  { code: 'my', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'mv', name: 'Maldives', flag: '🇲🇻' },
  { code: 'ml', name: 'Mali', flag: '🇲🇱' },
  { code: 'mt', name: 'Malta', flag: '🇲🇹' },
  { code: 'mh', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'mr', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'mu', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'mx', name: 'Mexico', flag: '🇲🇽' },
  { code: 'fm', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'md', name: 'Moldova', flag: '🇲🇩' },
  { code: 'mc', name: 'Monaco', flag: '🇲🇨' },
  { code: 'mn', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'me', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'ma', name: 'Morocco', flag: '🇲🇦' },
  { code: 'mz', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'mm', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'na', name: 'Namibia', flag: '🇳🇦' },
  { code: 'nr', name: 'Nauru', flag: '🇳🇷' },
  { code: 'np', name: 'Nepal', flag: '🇳🇵' },
  { code: 'nl', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'nz', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'ni', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'ne', name: 'Niger', flag: '🇳🇪' },
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'mk', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'no', name: 'Norway', flag: '🇳🇴' },
  { code: 'om', name: 'Oman', flag: '🇴🇲' },
  { code: 'pk', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'pw', name: 'Palau', flag: '🇵🇼' },
  { code: 'pa', name: 'Panama', flag: '🇵🇦' },
  { code: 'pg', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'py', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'pe', name: 'Peru', flag: '🇵🇪' },
  { code: 'ph', name: 'Philippines', flag: '🇵🇭' },
  { code: 'pl', name: 'Poland', flag: '🇵🇱' },
  { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
  { code: 'qa', name: 'Qatar', flag: '🇶🇦' },
  { code: 'ro', name: 'Romania', flag: '🇷🇴' },
  { code: 'ru', name: 'Russia', flag: '🇷🇺' },
  { code: 'rw', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'kn', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'lc', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'vc', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'ws', name: 'Samoa', flag: '🇼🇸' },
  { code: 'sm', name: 'San Marino', flag: '🇸🇲' },
  { code: 'st', name: 'Sao Tome and Principe', flag: '🇸🇹' },
  { code: 'sa', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'sn', name: 'Senegal', flag: '🇸🇳' },
  { code: 'rs', name: 'Serbia', flag: '🇷🇸' },
  { code: 'sc', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'sl', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
  { code: 'sk', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'si', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'sb', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'so', name: 'Somalia', flag: '🇸🇴' },
  { code: 'za', name: 'South Africa', flag: '🇿🇦' },
  { code: 'ss', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'es', name: 'Spain', flag: '🇪🇸' },
  { code: 'lk', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'sd', name: 'Sudan', flag: '🇸🇩' },
  { code: 'sr', name: 'Suriname', flag: '🇸🇷' },
  { code: 'se', name: 'Sweden', flag: '🇸🇪' },
  { code: 'ch', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'sy', name: 'Syria', flag: '🇸🇾' },
  { code: 'tw', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'tj', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'tz', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'th', name: 'Thailand', flag: '🇹🇭' },
  { code: 'tl', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'tg', name: 'Togo', flag: '🇹🇬' },
  { code: 'to', name: 'Tonga', flag: '🇹🇴' },
  { code: 'tt', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'tn', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'tr', name: 'Turkey', flag: '🇹🇷' },
  { code: 'tm', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'tv', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'ug', name: 'Uganda', flag: '🇺🇬' },
  { code: 'ua', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'ae', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'us', name: 'United States', flag: '🇺🇸' },
  { code: 'uy', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'uz', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'vu', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'va', name: 'Vatican City', flag: '🇻🇦' },
  { code: 've', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'vn', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'ye', name: 'Yemen', flag: '🇾🇪' },
  { code: 'zm', name: 'Zambia', flag: '🇿🇲' },
  { code: 'zw', name: 'Zimbabwe', flag: '🇿🇼' },
];

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, onCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Filter countries based on search term
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm]);

  // Get selected country name from code
  const getSelectedCountryName = (code: string) => {
    const country = countries.find(c => c.code === code);
    return country ? `${country.flag} ${country.name}` : 'Select your country';
  };

  return (
    <div className="space-y-2">
      <label htmlFor="country-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Your Country
      </label>
      <Select 
        value={selectedCountry} 
        onValueChange={onCountryChange}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setSearchTerm(''); // Clear search when closing dropdown
          }
        }}
      >
        <SelectTrigger id="country-select" className="w-full">
          <SelectValue placeholder="Select your country">
            {selectedCountry ? getSelectedCountryName(selectedCountry) : "Select your country"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <div className="px-2 py-2 sticky top-0 bg-white dark:bg-gray-950 z-10">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                autoFocus={isOpen}
              />
            </div>
          </div>
          <div className="max-h-[220px] overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem key={country.code} value={country.code} className="flex items-center p-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No countries found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelector;
