export interface University {
  id: string;
  name: string;
  city: string;
  tier: "top" | "standard";
  /** Tailwind gradient classes for the logo avatar */
  color: string;
  /** Short abbreviation shown in the logo */
  abbr: string;
  /** Path to university logo image */
  logo?: string;
}

export const UNIVERSITIES: University[] = [
  { id: "aau",         name: "Addis Ababa University",                      city: "Addis Ababa",  tier: "top",      color: "from-blue-600 to-blue-800",      abbr: "AAU",   logo: "/Addis_Ababa_University_logo.png" },
  { id: "haramaya",    name: "Haramaya University",                          city: "Haramaya",     tier: "top",      color: "from-green-600 to-emerald-700",   abbr: "HU",    logo: "/haramaya.jpg" },
  { id: "jimma",       name: "Jimma University",                             city: "Jimma",        tier: "top",      color: "from-red-600 to-rose-700",        abbr: "JU",    logo: "/jima.png" },
  { id: "bahirdar",    name: "Bahir Dar University",                         city: "Bahir Dar",    tier: "top",      color: "from-sky-500 to-cyan-700",        abbr: "BDU",   logo: "/bahir_dar_university.png" },
  { id: "hawassa",     name: "Hawassa University",                           city: "Hawassa",      tier: "top",      color: "from-teal-500 to-teal-700",       abbr: "HWU",   logo: "/wechamo.jpg" },
  { id: "gondar",      name: "University of Gondar",                         city: "Gondar",       tier: "top",      color: "from-purple-600 to-violet-700",   abbr: "UoG",   logo: "/gonder.png" },
  { id: "mekelle",     name: "Mekelle University",                           city: "Mekelle",      tier: "top",      color: "from-orange-500 to-amber-600",    abbr: "MU",    logo: "/mekelle.jpg" },
  { id: "astu",        name: "Adama Science and Technology University",      city: "Adama",        tier: "standard", color: "from-indigo-500 to-indigo-700",   abbr: "ASTU",  logo: "/ASTU.jpg" },
  { id: "aastu",       name: "Addis Ababa Science and Technology University",city: "Addis Ababa",  tier: "standard", color: "from-blue-500 to-blue-700",       abbr: "AASTU", logo: "/AASTU.JPG" },
  { id: "arbaminch",   name: "Arba Minch University",                        city: "Arba Minch",   tier: "standard", color: "from-lime-600 to-green-700",      abbr: "AMU",   logo: "/arba minch.jpg" },
  { id: "wolaitasodo", name: "Wolaita Sodo University",                      city: "Wolaita Sodo", tier: "standard", color: "from-yellow-500 to-orange-600",   abbr: "WSU",   logo: "/wolayita.jpg" },
  { id: "diredawa",    name: "Dire Dawa University",                         city: "Dire Dawa",    tier: "standard", color: "from-pink-500 to-rose-600",       abbr: "DDU",   logo: "/dire dawa.jpg" },
  { id: "dilla",       name: "Dilla University",                             city: "Dilla",        tier: "standard", color: "from-cyan-500 to-sky-600",        abbr: "DU",    logo: "/dilla.jpg" },
  { id: "debremarkos", name: "Debre Markos University",                      city: "Debre Markos", tier: "standard", color: "from-violet-500 to-purple-700",   abbr: "DMU",   logo: "/Debra markos.jpg" },
  { id: "debreberhan", name: "Debre Berhan University",                      city: "Debre Berhan", tier: "standard", color: "from-fuchsia-500 to-pink-700",    abbr: "DBU",   logo: "/Debre-Berhan.png" },
  { id: "wollo",       name: "Wollo University",                             city: "Dessie",       tier: "standard", color: "from-emerald-500 to-teal-600",    abbr: "WU",    logo: "/wollo.jpg" },
  { id: "wollega",     name: "Wollega University",                           city: "Nekemte",      tier: "standard", color: "from-amber-500 to-yellow-600",    abbr: "WLU",   logo: "/wolega.jpg" },
  { id: "ambo",        name: "Ambo University",                              city: "Ambo",         tier: "standard", color: "from-red-500 to-red-700",         abbr: "AU",    logo: "/Ambo.png" },
  { id: "jijiga",      name: "Jijiga University",                            city: "Jijiga",       tier: "standard", color: "from-sky-600 to-blue-700",        abbr: "JJU",   logo: "/jigjiga.jpg" },
  { id: "samara",      name: "Samara University",                            city: "Samara",       tier: "standard", color: "from-orange-600 to-red-600",      abbr: "SU",    logo: "/arsi.jpg" },
  { id: "wolkite",     name: "Wolkite University",                           city: "Wolkite",      tier: "standard", color: "from-teal-600 to-cyan-700",       abbr: "WKU",   logo: "/Wolkite.jpg" },
  { id: "woldia",      name: "Woldia University",                            city: "Woldia",       tier: "standard", color: "from-blue-600 to-indigo-700",     abbr: "WDU",   logo: "/meda welabu.jpg" },
  { id: "bulehora",    name: "Bule Hora University",                         city: "Bule Hora",    tier: "standard", color: "from-green-500 to-lime-600",      abbr: "BHU",   logo: "/Bule Hora.jpg" },
  { id: "mettu",       name: "Mettu University",                             city: "Mettu",        tier: "standard", color: "from-purple-500 to-fuchsia-600",  abbr: "MTU",   logo: "/metu.jpg" },
  { id: "mizantepi",   name: "Mizan-Tepi University",                        city: "Mizan",        tier: "standard", color: "from-rose-500 to-pink-600",       abbr: "MTU",   logo: "/mizan-tepi.png" },
  { id: "debretabor",  name: "Debre Tabor University",                       city: "Debre Tabor",  tier: "standard", color: "from-indigo-600 to-violet-700",   abbr: "DTU",   logo: "/injibara.jpg" },
  { id: "assosa",      name: "Assosa University",                            city: "Assosa",       tier: "standard", color: "from-yellow-600 to-amber-700",    abbr: "ASU",   logo: "/asosa.jpg" },
  { id: "aksum",       name: "Aksum University",                             city: "Aksum",        tier: "standard", color: "from-cyan-600 to-teal-700",       abbr: "AKU",   logo: "/aksum_.jpg" },
  { id: "adigrat",     name: "Adigrat University",                           city: "Adigrat",      tier: "standard", color: "from-emerald-600 to-green-700",   abbr: "ADU",   logo: "/borena.jpg" },
  { id: "bonga",       name: "Bonga University",                             city: "Bonga",        tier: "standard", color: "from-orange-500 to-yellow-600",   abbr: "BU",    logo: "/bonga.jpg" },
];

export const DEPARTMENTS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Information Systems",
  "Electrical Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Chemical Engineering",
  "Architecture",
  "Medicine",
  "Pharmacy",
  "Nursing",
  "Public Health",
  "Veterinary Medicine",
  "Law",
  "Accounting and Finance",
  "Management",
  "Marketing",
  "Economics",
  "Business Administration",
  "Agriculture",
  "Biology",
  "Chemistry",
  "Physics",
  "Mathematics",
  "Statistics",
  "Sociology",
  "Psychology",
  "English Language and Literature",
  "Journalism and Communication",
  "Political Science",
  "History",
  "Geography",
];

export const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "6th Year"];
